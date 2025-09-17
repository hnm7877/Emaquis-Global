const { employeQueries } = require('../requests/EmployeQueries');
const { getUserDetails, getExpiredDate } = require('../utils/getExpirateDate');
exports.userlist = async (req, res) => {
  if (req.session.user) {
    const session = req.session.user;
    console.log(session.id);
    try {
      const Employe = await employeQueries.getAllEmploye();
      let Result = [];
      if (Employe.result !== null) {
        let employe = Employe.result;
        employe.forEach(async (el) => {
          if (session.id == el.travail_pour) {
            Result.push(el);
          }
        });
        const user = await getUserDetails(session);
        res.render('user_list', {
          Result: Result,
          user,
          expiredDate: getExpiredDate(user.expiredPaymentDate)
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
exports.userlistPost = async (req, res) => {
  if (req.session.user) {
    try {
      const body = req.body;

      if (body.userId) {
        const Result = await employeQueries.deleteEmploye(body.userId);
        console.log(Result);
      }

      res.redirect('/utilisateur');
    } catch (e) {
      console.log('err', e);
      res.redirect(e);
    }
  } else {
    res.redirect('/');
  }
};
