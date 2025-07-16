const { MONTHS } = require("../constants");
const { PRODUCT_SIZE } = require("../constants");
const { produitQueries } = require("../requests/produitQueries");
const { employeQueries } = require("../requests/EmployeQueries");
const { venteQueries } = require("../requests/venteQueries");
const { formatAmount } = require("../utils/formatAmount");
const { generateYears, formatDate } = require("../utils/generateYear");
const moment = require("moment");
const { getPercent } = require("../utils/getPercent");
const { settingQueries } = require("../requests/settingQueries");
const { categorieQueries } = require("../requests/categorieQueries");
let totalHebdomadaire = 0;

exports.bilan = async (req, res) => {
  if (req.session.user) {
    res.setHeader("Content-Type", "text/html");
    const session = req.session.user;
    const userId = session.id;
    try {
      const Categorie = await categorieQueries.getCategorie();
      const Employe = await employeQueries.getEmployeByEtablissement(userId);
      const Produit = await produitQueries.getProduitBySession(userId);
      const Vente = await venteQueries.getVentes({
        travail_pour: userId,
        status_commande: { $in: ["Validée", "Retour"] },
      });

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
      }, {});

      const yesterdayKey = formatDate(
        moment(new Date()).subtract(1, "days").toDate()
      );
      const toDayKey = formatDate(new Date());

      const yesterday = venteByDay[yesterdayKey] || [];
      const today = venteByDay[toDayKey] || [];

      const yesterdayTotal = yesterday.reduce((acc, item) => {
        return acc + item.prix;
      }, 0);

      const todayTotal = today.reduce((acc, item) => {
        return acc + item.prix;
      }, 0);

      const toDayPercent = getPercent(yesterdayTotal, todayTotal);

      const totalVente =
        venteByDay[toDayKey]?.reduce((acc, item) => {
          return acc + item.prix;
        }, 0) || 0;

      /* Calcul du total hebdomadaire */

      // get week day to begin monday

      // for (let day = 0; day < 7; day++) {
      //   let sale = venteByDay[formatDate(moment(new Date()).subtract(day, 'days').toDate())];

      //   totalHebdomadaire += sale;
      //   console.log(totalHebdomadaire);

      // }

      const toDay = new Date().getDay();
      const time = new Date().getTime();
      const previousWeekDay = new Date(
        time - ((toDay === 0 ? 7 : toDay) - 1) * 24 * 60 * 60 * 1000
      );

      const weekKeys = Object.keys(venteByDay).filter((acc) => {
        const date = new Date(acc);
        if (date >= new Date(formatDate(previousWeekDay))) {
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

      const allProductsByDay = venteByDay[toDayKey]?.reduce((acc, item) => {
        let products = [];
        for (let [key, value] of Object.entries(item.produit)) {
          products.push({
            ...value._doc,
            quantite: Number(item.quantite[key] || item.quantite[0]),
          });
        }

        return [...acc, ...products];
      }, []);

      const allProductsByDayGrouped =
        allProductsByDay?.reduce((acc, item) => {
          const productId = item.produit._id;
          const taille = item.taille;
          const productFind = acc.find(
            (item) => item.produit._id === productId && item.taille === taille
          );

          if (productFind) {
            productFind.prix_vente += item.prix_vente * item.quantite;
            productFind.quantite += item.quantite;
          } else {
            acc.push({
              ...item,
              prix_vente: item.prix_vente * item.quantite,
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
      const categories = Categorie.result;

      // Ajout de la devise dynamique
      const country = require("../constants").PAYS.find(
        (p) => p.code === (session.country || "cote_d_ivoire")
      );
      const currency = country ? country.devise : "XOF";

      res.render("bilan", {
        totalemploye: employe.length,
        Tab: prod,
        totalVente: formatAmount(totalVente),
        venteByDay,
        user: session,
        years: generateYears(),
        months: MONTHS,
        toDayPercent: toDayPercent.toFixed(2),
        objective: settings?.result.objective || 0,
        objectivePercent:
          objectivePercent > 100 ? 100 : objectivePercent.toFixed(2),
        allProductsByDayGrouped,
        productMostSold,
        totalVenteWeek: formatAmount(totalVenteWeek || 0),
        categories: categories,
        product_sizes: PRODUCT_SIZE,
        currency, // Ajout de la devise
      });
    } catch (error) {
      res.redirect(error);
    }
  } else {
    res.redirect("/");
  }
};

exports.bilanPost = async (req, res) => {
  if (req.session.user) {
    try {
      const session = req.session.user;
      const country = require("../constants").PAYS.find(
        (p) => p.code === (session.country || "cote_d_ivoire")
      );
      const currency = country ? country.devise : "XOF";
      res.render("bilan", {
        user: session,
        currency,
      });
    } catch (error) {
      res.redirect(error);
    }
  } else {
    res.redirect("/");
  }
};
