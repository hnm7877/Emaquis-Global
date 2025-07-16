const { produitQueries } = require("../requests/produitQueries");
const { getUserDetails, getExpiredDate } = require("../utils/getExpirateDate");

exports.produit = async (req, res) => {
  if (req.session.user) {
    const session = req.session.user;

    try {
      const products = await produitQueries.getProduitBySession(
        session.id || session.travail_pour
      );

      const user = await getUserDetails({
        ...session,
        id: session.id || session.travail_pour,
      });
      // Ajout de la devise dynamique
      const { PAYS } = require("../constants");
      const country = user.country || "cote_d_ivoire";
      const countryObj = PAYS.find((p) => p.code === country);
      const currency = countryObj ? countryObj.devise : "XOF";
      res.render("listeproduit", {
        Result: products.result,
        user: user,
        expiredDate: getExpiredDate(user.expiredPaymentDate),
        currency,
      });
    } catch (e) {
      console.log("err", e);
      res.redirect(e);
    }
  } else {
    res.redirect("/");
  }
};

exports.produitPost = async (req, res) => {
  if (req.session.user) {
    try {
      res.render("listeproduit");
    } catch (e) {
      console.log("err", e);
      res.redirect(e);
    }
  } else {
    res.redirect("/");
  }
};

exports.produitByPrice = async (req, res) => {
  if (req.session.user) {
    const session = req.session.user;

    try {
      const products = await produitQueries.getProduitBySession(
        session.id || session.travail_pour
      );

      const sortedProducts = products.result.sort(
        (a, b) => a.prix_vente - b.prix_vente
      );

      res.render("listeproduit", {
        Result: sortedProducts,
        user: req.session.user,
      });
    } catch (e) {
      console.log("err", e);
      res.redirect(e);
    }
  } else {
    res.redirect("/");
  }
};
