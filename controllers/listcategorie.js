const { categorieQueries } = require('../requests/categorieQueries');
const { getUserDetails, getExpiredDate } = require('../utils/getExpirateDate');

exports.categoriesList = async (req, res) => {
  const user = req.session.user;
  if (user) {
    const result = await categorieQueries.getCategorie();
    res.send({ data: result.result, success: result.etat });
  } else {
    res.send({ data: [], success: false });
  }
};

exports.seecat = async (req, res) => {
  if (req.session.user) {
    try {
      const Categorie = await categorieQueries.getCategorie();

      if (Categorie.result !== null) {
        const categorie = await categorieQueries.getCategorie();
        let categories = categorie.result;

        const user = await getUserDetails(req.session.user);

        res.render('listecategories', {
          categories: categories,
          user: user,
          expiredDate: getExpiredDate(user.expiredPaymentDate),
        });
      }
    } catch (e) {
      console.log('err', e);
      res.redirect(e);
    }
  } else {
    res.redirect('/');
  }
};

exports.seecatPost = async (req, res) => {
  if (req.session.user) {
    try {
      res.render('listecategories');
    } catch (e) {
      console.log('err', e);
      res.redirect(e);
    }
  } else {
    res.redirect('/');
  }
};
