const Vente = require("../models/vente.model");

exports.venteQueries = class {
  static setVente(data) {
    return new Promise(async (next) => {
      const vente = new Vente(data);

      await vente
        .save()
        .then((res) => {
          next({
            etat: true,
            result: res,
          });
        })
        .catch((err) => {
          next({
            etat: false,
            err: err,
          });
        });
    });
  }

  static getVente() {
    return new Promise(async (next) => {
      Vente.find()
        .populate({
          path: "produit.produit",
        })
        .then((data) => {
          next({
            etat: true,
            result: data,
          });
        })
        .catch((err) => {
          next({
            etat: false,
            err: err,
          });
        });
    });
  }

  static getVentes(query, select = {}) {
    return new Promise(async (next) => {
      Vente.find(query)
        .populate({
          path: "produit.produit",
          populate: {
            path: "categorie",
            select: "nom color",
          },
        })
        .populate({
          path: "employe",
          select: "nom prenom",
        })
        .sort("-_id")

        .select({
          _id: 1,
          "produit._id": 1,
          "produit.prix_achat": 1,
          "produit.prix_vente": 1,
          "produit.promo": 1,
          "produit.productId": 1,
          "produit.promo_quantity": 1,
          "produit.promo_price": 1,
          "produit.taille": 1,
          quantite: 1,
          prix: 1,
          createdAt: 1,
          travail_pour: 1,
          for_employe: 1,
          somme_encaisse: 1,
          monnaie: 1,
          amount_collected: 1,
          status_commande: 1,
          formules: 1,
          table_number: 1,
          ...select,
        })
        .lean()
        .then((ventes) => {
          next({
            success: true,
            result: ventes,
          });
        })
        .catch((err) => {
          next({
            success: false,
            err: err,
          });
        });
    });
  }

  static getTotalVentesValidate(travail_pour) {
    return new Promise(async (next) => {
      Vente.countDocuments({travail_pour, status_commande: "Validée" })
        .then((data) => {
          next({
            etat: true,
            result: data,
          });
        })
        .catch((err) => {
          next({
            etat: false,
            err: err,
          });
        });
    });
  }

  static getVentesById(id) {
    try {
      return new Promise(async (next) => {
        Vente.findById({ _id: id })
          .populate([
            {
              path: "produit.produit",
              populate: {
                path: "categorie",
              },
            },
            {
              path: "employe",
              select: "nom prenom",
            },
          ])
          .then((data) => {
            next({
              etat: true,
              result: data,
            });
          })
          .catch((err) => {
            next({
              etat: false,
              err: err,
            });
          });
      });
    } catch (error) {
      console.log(error);
    }
  }

  static updateVente(id, data) {
    return new Promise(async (next) => {
      Vente.updateOne(
        {
          _id: id,
        },
        {
          $set: data,
        }
      )
        .then((data) => {
          next({
            etat: true,
            result: data,
          });
        })
        .catch((err) => {
          next({
            etat: false,
            err: err,
          });
        });
    });
  }

  static deleteVente(data) {
    try {
      return new Promise(async (next) => {
        Vente.findByIdAndDelete({ _id: data })
          .then((data) => {
            next({
              etat: true,
              result: data,
            });
          })
          .catch((err) => {
            next({
              etat: false,
              err: err,
            });
          });
      });
    } catch (error) {
      console.log(error);
    }
  }
  static blindVenteAndOffer(data) {
    return new Promise(async (next) => {
      Vente.findOneAndUpdate(
        { _id: data.fournisseurId },
        {
          $set: {
            offreappel: data.apelOffreId,
          },
        }
      )
        .then((data) => {
          next({
            etat: true,
            result: data,
          });
        })
        .catch((err) => {
          next({
            etat: false,
            err: err,
          });
        });
    });
  }
};
