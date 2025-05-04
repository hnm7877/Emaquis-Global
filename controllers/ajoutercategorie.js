const { categorieQueries } = require('../requests/categorieQueries');
const { getUserDetails, getExpiredDate } = require('../utils/getExpirateDate');

exports.addcat = async (req, res) => {
  if (req.session.user) {
    try {
      sess = req.session.user;

      const user = await getUserDetails(sess);

      const categories = await categorieQueries.getCategorie();

      //console.log(sess.id,"sqddsddqs")
      res.render('ajoutercategorie', {
        user,
        expiredDate: getExpiredDate(user.expiredPaymentDate),
        categorie: null,
        categories: categories?.result,
      });
    } catch (error) {
      console.log('👉 👉 👉  ~ file: ajoutercategorie.js:21 ~ error:', error);
      res.redirect(error);
    }
  } else {
    res.redirect('/');
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
      res.render('ajoutercategorie', {
        user,
        expiredDate: getExpiredDate(user.expiredPaymentDate),
        categorie: categorie?.result,
        categories: categories?.result,
      });
    } catch (error) {
      res.redirect(error);
    }
  } else {
    res.redirect('/');
  }
};

exports.deleteCat = async (req, res) => {
  if (req.session.user) {
    const catId = req.params.catId;

    const cat = await categorieQueries.deleteCategorie(catId);

    if (cat.result) {
      res.status(200).json({
        message: 'Categorie supprimée avec succès',
      });
    } else {
      res.status(500).json({
        message: 'Erreur lors de la suppression de la categorie',
      });
    }
  } else {
    res.redirect('/');
  }
};

exports.addcatPost = async (req, res) => {
  if (req.session.user) {
    try {
      res.render('ajoutercategorie');
    } catch (error) {
      res.redirect(error);
    }
  } else {
    res.redirect('/');
  }
};
