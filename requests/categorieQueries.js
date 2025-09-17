const Categorie = require("../models/categorie.model");
const mongoose = require("mongoose");

exports.categorieQueries = class {
  static setCategorie(data) {
    return new Promise(async (next) => {
      const categorie = await new Categorie({
        nom: data.nom,
        categorie_pour: data.categorie_pour,
        image: data.image,
        color: data.color,
        idParent: data.idParent || null,
      });
      await categorie
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

  static getCategorie(data) {
    try {
      return new Promise(async (next) => {
        console.log("🔍 Récupération des catégories...");
        Categorie.find({
          isDeleted: false,
          idParent: null,
        })
          .then(async (data) => {
            console.log("🔍 Catégories principales trouvées:", data.length);
            const newData2 = await Promise.all(
              data.map(async (categorie) => {
                let childs = await Categorie.find({
                  idParent: mongoose.Types.ObjectId(categorie._id),
                  isDeleted: false,
                });

                return { ...categorie._doc, childs };
              })
            );

            console.log("🔍 Catégories finales:", newData2.length);
            next({
              etat: true,
              result: newData2,
            });
          })
          .catch((err) => {
            console.log("❌ Erreur getCategorie:", err);
            next({
              etat: false,
              err: err,
            });
          });
      });
    } catch (error) {
      console.log("❌ Erreur getCategorie catch:", error);
    }
  }

  static getCategorieByParentId(id) {
    try {
      return new Promise(async (next) => {
        Categorie.find({ idParent: id, isDeleted: false })
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

  static getCategorieById(id) {
    try {
      return new Promise(async (next) => {
        Categorie.findById({ _id: id, isDeleted: false })
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

  static updateCategorie(id, data) {
    return new Promise(async (next) => {
      await Categorie.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            nom: data.nom,
            categorie_pour: data.categorie_pour,
            image: data.image,
            color: data.color,
            idParent: data.idParent || null,
          },
        }
      )
        .then((data) => {
          next({
            etat: true,
            result: data,
          });
        })
        .catch((rr) => {
          next({
            etat: false,
            err: rr,
          });
        });
    });
  }

  static deleteCategorie(id) {
    return new Promise(async (next) => {
      await Categorie.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            isDeleted: true,
          },
        }
      )
        .then((data) => {
          next({
            etat: true,
            result: data,
          });
        })
        .catch((rr) => {
          next({
            etat: false,
            err: rr,
          });
        });
    });
  }
};
