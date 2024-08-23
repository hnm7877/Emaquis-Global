const { employeQueries } = require('../requests/EmployeQueries');
const {getUserDetails, getExpiredDate} = require("../utils/getExpirateDate");

exports.ajouteruser = async (req, res) => {
  if (req.session.user) {
    try {
      const sess = req.session.user;

      const user = await getUserDetails(sess)
      const expiredDate=  getExpiredDate(user.expiredPaymentDate)
      res.render('add_new_user', { user,expiredDate });
    } catch (e) {
      console.log('err', e);
      res.redirect(e);
    }
  } else {
    res.redirect('/');
  }
};
exports.ajouteruserPost = async (req, res) => {
  if (req.session.user) {
    try {
      const sess = req.session.user;
      const user = await getUserDetails(sess)
      const expiredDate=  getExpiredDate(user.expiredPaymentDate)
      res.render('add_new_user',{user,expiredDate });
    } catch (e) {
      console.log('err', e);
      res.redirect(e);
    }
  } else {
    res.redirect('/');
  }
};

exports.edituser = async (req, res) => {
  if (req.session.user) {
    try {
      const id = req.query.user_id;
      const user = await employeQueries.getEmployeById(id);
      const users = await getUserDetails(req.session.user)
      const expiredDate=  getExpiredDate(users.expiredPaymentDate)
      console.log('👉 👉 👉  ~ file: ajouteruser.js:34 ~ user', user);
      if (user) {
        sess = req.session.user;
        res.render('add_new_user', {
          employe: user.result,
          user:users,
          expiredDate,
          update: true,
        });
      } else {
        res.redirect('/utilisateur');
      }
    } catch (e) {
      console.log('err', e);
      res.redirect('/');
    }
  }
};
