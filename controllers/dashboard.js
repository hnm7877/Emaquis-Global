const { MONTHS } = require("../constants");
const { employeQueries } = require("../requests/EmployeQueries");
const { produitQueries } = require("../requests/produitQueries");
const { venteQueries } = require("../requests/venteQueries");
const { formatAmount } = require("../utils/formatAmount");
const { generateYears, formatDate } = require("../utils/generateYear");
const moment = require("moment");
const { getPercent } = require("../utils/getPercent");
const { settingQueries } = require("../requests/settingQueries");
const {
  getDateByWeekendMonthYear,
  getWeeksInMonth,
} = require("../utils/generateWeekly");
const { getExpiredDate, getUserDetails } = require("../utils/getExpirateDate");
const { helperCurrentTime } = require("../utils/helperCurrentTime");
const { userQueries } = require("../requests/UserQueries");

exports.dashboard = async (req, res) => {
  if (req.session.user) {
    // let totalemploye;
    res.setHeader("Content-Type", "text/html");
    const session = req.session.user;
    const userId = session.id;
    try {
      const Employe = await employeQueries.getEmployeByEtablissement(userId);
      const Produit = await produitQueries.getProduitBySession(userId);

      const month = new Date().getMonth();
      const year = new Date().getFullYear();
      // Définir la date de référence pour le mois

      // Calculez le nombre de semaines entre le premier et le dernier jour du mois
      const weeksInMonth = getWeeksInMonth(month, year);

      const currentDate = moment();

      const currentWeekIndex =
        currentDate.isoWeek() -
        moment(currentDate).startOf("month").isoWeek() +
        1;

      // Calculer le dernier lundi à 12h00
      const getLastMondayNoon = () => {
        const now = new Date();
        const currentDay = now.getDay(); // 0 = Dimanche, 1 = Lundi
        const currentHour = now.getHours();

        let daysToSubtract = currentDay - 1; // Lundi = 1
        if (daysToSubtract < 0) daysToSubtract += 7; // Si on est dimanche

        // Si on est lundi et qu'il est avant 12h00, prendre le lundi précédent
        if (currentDay === 1 && currentHour < 12) {
          daysToSubtract = 7;
        }

        const lastMonday = new Date(now);
        lastMonday.setDate(now.getDate() - daysToSubtract);
        lastMonday.setHours(12, 0, 0, 0);

        return lastMonday;
      };

      const lastMondayNoon = getLastMondayNoon();

      const { start, end } = getDateByWeekendMonthYear(
        currentWeekIndex,
        month + 1,
        year
      );

      const userAdmin = await userQueries.getUserById(userId);

      const { startDate, endDate } = helperCurrentTime({
        timings: userAdmin?.result?.timings || [],
      });

      const VenteToDay = await venteQueries.getVentes({
        createdAt: { $gte: startDate, $lte: endDate },
        travail_pour: userId,
        status_commande: { $in: ["Validée", "Retour"] },
      });
      const Vente = await venteQueries.getVentes({
        createdAt: { $gte: lastMondayNoon, $lte: new Date() },
        travail_pour: userId,
        status_commande: { $in: ["Validée", "Retour"] },
      });

      const totalVentesValidate = await venteQueries.getTotalVentesValidate(
        userId
      );

      const settings = await settingQueries.getSettingByUserId(userId);

      let employe = Employe.result;
      let prod = Produit.result;
      let vente = Vente.result;

      let venteByDay = vente.reduce((acc, item) => {
        const date = new Date(item.createdAt);

        const key = formatDate(date);
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
        return acc;
      }, []);

      // Calculer les performances des employés
      const venteByEmploye = vente.reduce((acc, item) => {
        const employeId = item.employe?._id || item.for_employe;
        if (employeId) {
          if (!acc[employeId]) {
            acc[employeId] = {
              employe: item.employe,
              ventes: [],
              totalVentes: 0,
              totalMontant: 0,
              nombreCommandes: 0,
            };
          }
          acc[employeId].ventes.push(item);
          acc[employeId].totalMontant += item.prix;
          acc[employeId].nombreCommandes += 1;
        }
        return acc;
      }, {});

      // Calculer les performances de tous les employés
      let classementEmployes = [];
      let meilleurEmploye = null;
      let maxMontant = 0;

      // Utiliser uniquement la liste des employés de l'établissement
      employe.forEach((emp) => {
        // Chercher les ventes de cet employé
        const employeVentes = Object.values(venteByEmploye).find(
          (venteData) =>
            venteData.employe?._id?.toString() === emp._id.toString()
        );

        const employeInfo = {
          id: emp._id.toString(),
          nom: emp.nom || "Employé",
          prenom: emp.prenom || "",
          role: emp.role || "Barman", // Ajouter le vrai rôle
          totalMontant: employeVentes ? employeVentes.totalMontant : 0,
          nombreCommandes: employeVentes ? employeVentes.nombreCommandes : 0,
          moyenneParCommande: employeVentes
            ? employeVentes.totalMontant / employeVentes.nombreCommandes
            : 0,
          pourcentageObjectif: employeVentes
            ? (
                (employeVentes.totalMontant /
                  (settings?.result.objective || 1)) *
                100
              ).toFixed(1)
            : 0,
        };

        classementEmployes.push(employeInfo);

        if (employeInfo.totalMontant > maxMontant) {
          maxMontant = employeInfo.totalMontant;
          meilleurEmploye = employeInfo;
        }
      });

      // Trier par chiffre d'affaires décroissant
      classementEmployes.sort((a, b) => b.totalMontant - a.totalMontant);

      // Si aucun employé n'a de ventes, créer un employé par défaut
      if (!meilleurEmploye && employe.length > 0) {
        const premierEmploye = employe[0];
        meilleurEmploye = {
          nom: premierEmploye.nom || "Employé",
          prenom: premierEmploye.prenom || "",
          role: premierEmploye.role || "Barman",
          totalMontant: 0,
          nombreCommandes: 0,
          moyenneParCommande: 0,
          pourcentageObjectif: 0,
        };
      }

      const toDayKey = formatDate(new Date());

      const yesterdayKey = formatDate(
        moment(new Date()).subtract(1, "days").toDate()
      );

      const yesterday = venteByDay[yesterdayKey] || [];
      const today =
        (userAdmin.result.timings.length === 0
          ? venteByDay[toDayKey]
          : VenteToDay.result) || [];

      const yesterdayTotal = yesterday.reduce((acc, item) => {
        return acc + item.prix;
      }, 0);

      const todayTotal = today.reduce((acc, item) => {
        return acc + item.prix;
      }, 0);

      const toDayPercent = getPercent(yesterdayTotal, todayTotal);

      const totalVente =
        today?.reduce((acc, item) => {
          return acc + item.prix;
        }, 0) || 0;

      // const toDay = new Date().getDay();
      // const time = new Date().getTime();
      // const previousWeekDay = new Date(
      //   time - ((toDay === 0 ? 7 : toDay) - 1) * 24 * 60 * 60 * 1000
      // );

      const weekKeys = Object.keys(venteByDay).filter((acc) => {
        const date = new Date(acc);
        if (date >= new Date(formatDate(start))) {
          return true;
        } else {
          return false;
        }
      });

      let totalVenteWeek = weekKeys
        .map((key) => {
          return (
            venteByDay[key]?.reduce((acc, item) => {
              return acc + item.prix;
            }, 0) || 0
          );
        })
        .reduce((acc, item) => acc + item, 0);

      const allProductsByDay = today?.reduce((acc, item) => {
        let products = [];
        for (let [key, value] of Object.entries(item.produit)) {
          products.push({
            ...(value._doc || value),
            quantite: Number(item.quantite[key] || item.quantite[0]),
          });
        }

        return [...acc, ...products];
      }, []);

      const allProductsByDayGrouped =
        allProductsByDay?.reduce((acc, item) => {
          const productId = item.produit?._id;
          const taille = item.taille;
          const productFind = acc.find(
            (item) => item.produit?._id === productId && item.taille === taille
          );

          let promo_quantity = 0;
          let prix_vente = item.prix_vente * item.quantite;
          if (item.promo) {
            if (item.promo_quantity <= item.quantite) {
              promo_quantity = parseInt(item.quantite / item.promo_quantity);
            }
          }

          if (promo_quantity) {
            prix_vente =
              promo_quantity * item.promo_price +
              (item.quantite % item.promo_quantity) * item.prix_vente;
          }

          if (productFind) {
            productFind.prix_vente += prix_vente;
            productFind.quantite += item.quantite;
          } else {
            acc.push({
              ...item,
              prix_vente,
            });
          }

          return acc;
        }, []) || [];

      const productMostSold = allProductsByDayGrouped?.reduce(
        (acc, item) => {
          if (acc.quantite < item.quantite) {
            return item;
          }
          return acc;
        },
        {
          quantite: 0,
        }
      );

      const objectivePercent =
        (totalVente / (settings?.result.objective || 1)) * 100;

      console.log(allProductsByDayGrouped);
      const user = await getUserDetails(session);
      const expiredDate = getExpiredDate(user.expiredPaymentDate);
      // Ajout de la devise dynamique
      const country = require("../constants").PAYS.find(
        (p) => p.code === (user.country || "cote_d_ivoire")
      );
      const currency = country ? country.devise : "XOF";

      res.render("dashboard", {
        totalemploye: employe.length,
        Tab: prod,
        totalVente: formatAmount(totalVente),
        venteByDay,
        user,
        expiredDate,
        years: generateYears(),
        months: MONTHS,
        toDayPercent: toDayPercent.toFixed(2),
        objective: settings?.result.objective || 0,
        objectivePercent:
          objectivePercent > 100 ? 100 : objectivePercent.toFixed(2),
        allProductsByDayGrouped,
        productMostSold,
        totalVenteWeek: formatAmount(totalVenteWeek || 0),
        currentWeekIndex,
        weeksInMonth,
        totalVentesValidate: totalVentesValidate.result,
        currency, // Ajout de la devise
        meilleurEmploye, // Ajout du meilleur employé
        classementEmployes, // Ajout du classement des employés
        formatAmount, // Ajout de la fonction formatAmount
      });
    } catch (e) {
      console.log("err", e);
      res.redirect(e);
    }
  } else {
    res.redirect("/");
  }
};

exports.dashboardPost = async (req, res) => {
  if (req.session.user) {
    res.setHeader("Content-Type", "text/html");
    try {
      const user = req.session.user;
      const country = require("../constants").PAYS.find(
        (p) => p.code === (user.country || "cote_d_ivoire")
      );
      const currency = country ? country.devise : "XOF";
      res.render("dashboard", { user: req.session.user, currency });
    } catch (e) {
      console.log("err", e);
      res.redirect(e);
    }
  } else {
    res.redirect("/");
  }
};
