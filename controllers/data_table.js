const { venteQueries } = require("../requests/venteQueries");
const { settingQueries } = require("../requests/settingQueries");
const { produitQueries } = require("../requests/produitQueries");
const { getUserDetails, getExpiredDate } = require("../utils/getExpirateDate");

exports.data_table = async (req, res) => {
  try {
    const user = req.session.user;
    if (user) {
      const ventes = await venteQueries.getVentes(
        {
          travail_pour: user.id || user.travail_pour,
        },
        {
          offered: 1,
          offered_confirmed: 1,
        }
      );
      const userDetails = await getUserDetails(user);

      // Ajout de la devise dynamique
      const country = require("../constants").PAYS.find(
        (p) => p.code === (user.country || "cote_d_ivoire")
      );
      const currency = country ? country.devise : "XOF";

      res.render("data_table", {
        ventes: ventes.result.map((el) => {
          return {
            ...(el._doc || el),
            code: ("" + el._id).slice(-6).toUpperCase(),
            produit: el.produit
              .map((el) => el.produit?.nom_produit || "")
              .join(","),
            categories: [
              ...new Set(
                el.produit
                  .filter((el) => el.produit?.categorie)
                  .map((el) => el.produit?.categorie?.nom)
              ),
            ].join(","),
            employe: `${el.employe?.nom} ${el.employe?.prenom}`,
            createdAt: new Date(el.createdAt).getTime(),
          };
        }),
        user: userDetails,
        expiredDate: getExpiredDate(userDetails.expiredPaymentDate),
        currency, // Ajout de la devise
      });
    } else {
      res.redirect("connexion");
    }
  } catch (e) {
    console.log("err", e);
    res.redirect("connexion");
  }
};

exports.data_table_offert = async (req, res) => {
  try {
    const user = req.session.user;
    if (user) {
      const { produit, vendeur, status, date, date_start, date_end, periode } =
        req.query;

      const baseFilter = {
        travail_pour: user.id || user.travail_pour,
        offered: true,
      };

      if (produit) {
        baseFilter["produit.produit.nom_produit"] = new RegExp(produit, "i");
      }

      if (vendeur) {
        baseFilter["employe.nom"] = new RegExp(vendeur, "i");
      }

      if (status === "Validée") {
        baseFilter.offered_confirmed = true;
      } else if (status === "En attente") {
        baseFilter.offered_confirmed = false;
      } else if (status && status !== "Offert") {
        baseFilter.status_commande = status;
      }

      const now = new Date();
      let startDate = null;
      let endDate = null;

      if (periode) {
        switch (periode) {
          case "jour":
            startDate = new Date(now.setHours(0, 0, 0, 0));
            endDate = new Date(now.setHours(23, 59, 59, 999));
            break;
          case "semaine":
            startDate = new Date(now.setDate(now.getDate() - now.getDay()));
            startDate.setHours(0, 0, 0, 0);
            endDate = new Date();
            endDate.setHours(23, 59, 59, 999);
            break;
          case "mois":
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            endDate = new Date(
              now.getFullYear(),
              now.getMonth() + 1,
              0,
              23,
              59,
              59,
              999
            );
            break;
          case "annee":
            startDate = new Date(now.getFullYear(), 0, 1);
            endDate = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
            break;
          case "trimestre":
            const quarter = Math.floor(now.getMonth() / 3);
            startDate = new Date(now.getFullYear(), quarter * 3, 1);
            endDate = new Date(
              now.getFullYear(),
              quarter * 3 + 3,
              0,
              23,
              59,
              59,
              999
            );
            break;
        }
      }

      if (date) {
        startDate = new Date(date);
        endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);
      }

      if (date_start && date_end) {
        startDate = new Date(date_start);
        endDate = new Date(date_end);
        endDate.setHours(23, 59, 59, 999);
      }

      if (startDate && endDate) {
        baseFilter.createdAt = { $gte: startDate, $lte: endDate };
      }

      const ventes = await venteQueries.getVentes(baseFilter, {
        offered: 1,
        offered_confirmed: 1,
      });
      const userDetails = await getUserDetails(user);

      const setting = await settingQueries.getSettingByUserId(
        user.id || user.travail_pour
      );

      if (!setting?.result?.hasOffer) {
        return res.redirect("/data_table");
      }

      const totalOffert = ventes.result.reduce((acc, el) => {
        return (
          acc +
          (el.status_commande === "Annulée" || !el.offered_confirmed
            ? 0
            : el.prix)
        );
      }, 0);

      const country = require("../constants").PAYS.find(
        (p) => p.code === (user.country || "cote_d_ivoire")
      );
      const currency = country ? country.devise : "XOF";
      res.render("data_table_vente_offert", {
        ventes: ventes.result.map((el) => {
          return {
            ...(el._doc || el),
            code: ("" + el._id).slice(-6).toUpperCase(),
            produit: el.produit
              .map((el) => el.produit?.nom_produit || "")
              .join(","),
            categories: [
              ...new Set(
                el.produit
                  .filter((el) => el.produit?.categorie)
                  .map((el) => el.produit?.categorie?.nom)
              ),
            ].join(","),
            employe: `${el.employe?.nom} ${el.employe?.prenom}`,
            createdAt: new Date(el.createdAt).getTime(),
          };
        }),
        user: userDetails,
        expiredDate: getExpiredDate(userDetails.expiredPaymentDate),
        totalOffert,
        query: req.query,
        currency,
      });
    } else {
      res.redirect("connexion");
    }
  } catch (e) {
    console.log("err", e);
    res.redirect("connexion");
  }
};

exports.confim_vente_offert = async (req, res) => {
  try {
    const { offerId } = req.body;
    const vente = await venteQueries.getVentesById(offerId);

    if (!vente?.result) return res.redirect("/data_table_vente_offert");

    const { offered } = vente.result;

    if (offered) {
      await venteQueries.updateVente(offerId, { offered_confirmed: true });
    }

    res.redirect("/data_table_vente_offert");
  } catch (error) {
    console.log("error", error);
    res.redirect("/data_table_vente_offert");
  }
};

exports.cancel_vente_offert = async (req, res) => {
  try {
    const { offerId } = req.body;
    const vente = await venteQueries.getVentesById(offerId);
    const sess = req.session.user;
    const travail_pour = sess.travail_pour || sess.id || sess._id;

    if (!vente?.result) return res.redirect("/data_table_vente_offert");

    const { offered, produit: products, quantite } = vente.result;

    if (offered) {
      await venteQueries.updateVente(offerId, { status_commande: "Annulée" });

      for (const [i, product] of products.entries()) {
        const produit = await produitQueries.getProduitById(product.productId);
        const newQte = produit.result.quantite + Number(quantite[i]);

        await produitQueries.updateProduit(
          {
            produitId: product.productId,
            session: travail_pour,
          },
          { quantite: newQte }
        );

        if (req.app.io) {
          req.app.io.emit(`${travail_pour}-update-product`, {
            product: {
              produitId: product.productId,
              quantite: newQte,
            },
          });
        }
      }
    }

    res.redirect("/data_table_vente_offert");
  } catch (error) {
    console.log("error", error);
    res.redirect("/data_table_vente_offert");
  }
};

exports.data_tablePost = async (req, res) => {
  try {
    const user = req.session.user;
    if (user) {
      const ventes = await venteQueries.getVentes(
        {
          travail_pour: user.id || user.travail_pour,
        },
        {
          offered: 1,
          offered_confirmed: 1,
        }
      );
      const userDetails = await getUserDetails(user);

      // Ajout de la devise dynamique
      const country = require("../constants").PAYS.find(
        (p) => p.code === (user.country || "cote_d_ivoire")
      );
      const currency = country ? country.devise : "XOF";
      res.render("data_table", {
        ventes: ventes.result.map((el) => {
          return {
            ...(el._doc || el),
            code: ("" + el._id).slice(-6).toUpperCase(),
            produit: el.produit
              .map((el) => el.produit?.nom_produit || "")
              .join(","),
            categories: [
              ...new Set(
                el.produit
                  .filter((el) => el.produit?.categorie)
                  .map((el) => el.produit?.categorie?.nom)
              ),
            ].join(","),
            employe: `${el.employe?.nom} ${el.employe?.prenom}`,
            createdAt: new Date(el.createdAt).getTime(),
          };
        }),
        user: userDetails,
        expiredDate: getExpiredDate(userDetails.expiredPaymentDate),
        currency,
      });
    } else {
      res.redirect("connexion");
    }
  } catch (e) {
    console.log("err", e);
    res.redirect("connexion");
  }
};
