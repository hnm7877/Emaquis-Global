const { venteQueries } = require("../requests/venteQueries");
const { produitQueries } = require("../requests/produitQueries");
const { employeQueries } = require("../requests/EmployeQueries");
const categorieModel = require("../models/categorie.model");
const { BilletQueries } = require("../requests/BilletQueries");
const { settingQueries } = require("../requests/settingQueries");
const { helperCurrentTime } = require("../utils/helperCurrentTime");
const { userQueries } = require("../requests/UserQueries");
const mongoose = require("mongoose");

exports.emdashboard = async (req, res) => {
  console.log("ROUTE EMDASHBOARD APPELEE");
  try {
    if (!req.session.user) {
      res.redirect("/emconnexion");
      return;
    }

    // DEBUG: Afficher tout le contenu de l'utilisateur connecté
    console.log("[DEBUG] req.session.user complet:", req.session.user);
    // DEBUG: Afficher l'ID employé utilisé et son type
    console.log(
      "[DEBUG] employe_id utilisé:",
      req.session.user._id,
      typeof req.session.user._id
    );
    // Récupération du billet ouvert (caisse ouverte) pour l'employé
    let billetData = await BilletQueries.getBilletByQuery({
      employe_id: mongoose.Types.ObjectId(req.session.user._id),
      is_closed: false,
    });
    // DEBUG: Afficher le résultat de la requête billetData
    console.log("[DEBUG] billetData trouvé:", billetData);
    let billet =
      billetData.result && billetData.result.length > 0
        ? billetData.result[0]
        : null;
    // Si aucun billet ouvert n'existe pour cet employé, on en crée un automatiquement
    if (!billet) {
      const newBillet = await BilletQueries.setBillet({
        employe_id: mongoose.Types.ObjectId(req.session.user._id),
        open_hour: new Date(),
        travail_pour: req.session.user.travail_pour,
        is_closed: false,
      });
      billet = newBillet.result || null;
      console.log("[DEBUG] Nouveau billet ouvert automatiquement:", billet);
    }

    const Vente = await venteQueries.getVentes({
      status_commande: { $in: ["Validée", "Retour"] },
      employe_validate_id: req.session.user?._id,
      createdAt: {
        $gte: new Date(new Date(billet?.open_hour)),
        $lte: new Date(),
      },
      travail_pour: req.session?.user?.travail_pour,
    });

    const VenteEntente = await venteQueries.getVentes({
      status_commande: "En attente",
      travail_pour: req.session?.user?.travail_pour,
    });

    const parentSetting = await settingQueries.getSettingByUserId(
      req.session.user.travail_pour
    );
    const parentInfo = await userQueries.getUserById(
      req.session.user.travail_pour
    );

    const Categories = await categorieModel.find({
      idParent: null,
      isDeleted: false,
    });

    const CategoriesWithChilds = await categorieModel.find({
      idParent: { $ne: null },
      isDeleted: false,
    });

    const newCategories = Categories.map((category) => {
      const childs = CategoriesWithChilds.filter(
        (c) => c.idParent.toString() === category._id.toString()
      );
      return {
        ...category._doc,
        childs,
      };
    }).filter((c) =>
      !parentSetting?.result?.hasSubCategories && c.childs.length > 0
        ? false
        : true
    );

    const newSave = req.session.newSave;

    req.session.newSave = false;

    const produit = await produitQueries.getProduitBySession(
      req.session.user.travail_pour
    );
    const employes = await employeQueries.getEmployeByEtablissement(
      req.session.user.travail_pour
    );

    const ventes = Vente.result?.filter((vente) => {
      return (
        !vente.for_employe ||
        "" + vente.for_employe === "" + req.session.user._id
      );
    });

    const ventesEntente = VenteEntente.result.filter((vente) => {
      return (
        !vente.for_employe ||
        "" + vente.for_employe === "" + req.session.user._id
      );
    });

    const sum = ventes?.reduce((total, vente) => total + vente.prix, 0) || 0;

    const country = require("../constants").PAYS.find(
      (p) => p.code === (req.session.user.country || "cote_d_ivoire")
    );
    const currency = country ? country.devise : "XOF";
    if (req.session.user.role === "Barman") {
      const { password, ...data } = req.session.user;
      const globalUser = parentInfo?.result || null;
      const PAYS = require("../constants").PAYS;
      console.log("BILLET DEBUG", billet);
      res.render("emdashboard", {
        ventes: ventesEntente,
        newSave: newSave,
        user: {
          ...data,
          product_return_type: parentSetting?.result?.product_return_type,
          hasOffer: parentSetting?.result?.hasOffer,
        },
        produits: produit.result,
        emplnum: employes.length || 0,
        sum,
        categories: newCategories,
        billet,
        currentTiming:
          parentInfo?.result?.timings?.length > 0
            ? helperCurrentTime({
                timings: parentInfo?.result?.timings || [],
              })
            : null,
        currency,
        globalUser, // user principal pour le front
        PAYS, // liste des pays pour le front
      });
    } else {
      res.redirect("/emconnexion");
    }
  } catch (e) {
    console.log("err", e);
  }
};

exports.emdashboardPost = async (req, res) => {
  res.setHeader("Content-Type", "text/html");
  try {
    res.render("emdashboard");
  } catch (e) {
    console.log("err", e);
    res.redirect(e);
  }
};
