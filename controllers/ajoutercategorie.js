const { categorieQueries } = require("../requests/categorieQueries");
const { getUserDetails, getExpiredDate } = require("../utils/getExpirateDate");
const { uploadFile } = require("../utils/uploadFile");

exports.addcat = async (req, res) => {
  if (req.session.user) {
    try {
      sess = req.session.user;

      const user = await getUserDetails(sess);

      const categories = await categorieQueries.getCategorie();

      //console.log(sess.id,"sqddsddqs")
      res.render("ajoutercategorie", {
        user,
        expiredDate: getExpiredDate(user.expiredPaymentDate),
        categorie: null,
        categories: categories?.result,
      });
    } catch (error) {
      console.log("👉 👉 👉  ~ file: ajoutercategorie.js:21 ~ error:", error);
      res.redirect(error);
    }
  } else {
    res.redirect("/");
  }
};

exports.editCat = async (req, res) => {
  if (req.session.user) {
    try {
      sess = req.session.user;
      const catId = req.query.catId;
      let categorie = null;

      const user = await getUserDetails(sess);

      if (catId) {
        categorie = await categorieQueries.getCategorieById(catId);
      }

      const categories = await categorieQueries.getCategorie();

      //console.log(sess.id,"sqddsddqs")
      res.render("ajoutercategorie", {
        user,
        expiredDate: getExpiredDate(user.expiredPaymentDate),
        categorie: categorie?.result,
        categories: categories?.result,
      });
    } catch (error) {
      res.redirect(error);
    }
  } else {
    res.redirect("/");
  }
};

exports.deleteCat = async (req, res) => {
  if (req.session.user) {
    const catId = req.params.catId;

    const cat = await categorieQueries.deleteCategorie(catId);

    if (cat.result) {
      res.status(200).json({
        message: "Categorie supprimée avec succès",
      });
    } else {
      res.status(500).json({
        message: "Erreur lors de la suppression de la categorie",
      });
    }
  } else {
    res.redirect("/");
  }
};

exports.addcatPost = async (req, res) => {
  if (req.session.user) {
    try {
      const file = req.file;
      const catId = req.body.catId; // ID de la catégorie si c'est une modification

      let imageUrl = null;

      // Gérer l'upload d'image si un fichier est fourni
      if (file) {
        console.log("Configuration Cloudinary:", {
          cloud_name: process.env.CLOUDNAME,
          api_key: process.env.APYKEY ? "***" : "NON DÉFINI",
          api_secret: process.env.API_SECRET ? "***" : "NON DÉFINI",
        });

        const result = await uploadFile(file);
        if (result && result.Location) {
          imageUrl = result.Location;
        }
      }

      const data = {
        nom: req.body.nom?.trim(),
        categorie_pour: req.body.categorie_pour,
        color: req.body.color,
        idParent: req.body.idParent || null,
      };

      // Ajouter l'image si elle a été uploadée
      if (imageUrl) {
        data.image = imageUrl;
      }

      let result;

      if (catId) {
        // Modification d'une catégorie existante
        const existingCat = await categorieQueries.getCategorieById(catId);
        if (existingCat?.result) {
          // Si pas de nouvelle image, garder l'ancienne
          if (!imageUrl && existingCat.result.image) {
            data.image = existingCat.result.image;
          }
        }
        result = await categorieQueries.updateCategorie(catId, data);
      } else {
        // Création d'une nouvelle catégorie
        result = await categorieQueries.setCategorie(data);
      }

      if (result?.etat) {
        res.redirect("/listcategorie");
      } else {
        console.error(
          "Erreur lors de la sauvegarde de la catégorie:",
          result?.err
        );
        res.status(500).send({
          success: false,
          message: "Erreur lors de la sauvegarde de la catégorie",
        });
      }
    } catch (error) {
      console.error("Erreur dans addcatPost:", error);
      res.status(500).send({
        success: false,
        message: error.message || "Erreur lors de la sauvegarde",
      });
    }
  } else {
    res.redirect("/");
  }
};
