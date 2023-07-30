const { employeQueries } = require('../requests/EmployeQueries');
exports.userlist = async (req, res) => {
  if (req.session.user) {
    const session = req.session.user;
    console.log(session);
    try {
      // Vérifier si la propriété "travail_pour" existe dans la session
      const employeQueryParameter = session.travail_pour ? session.travail_pour : session.id;
      console.log(employeQueryParameter,"employeQueryParameter")
      // Utiliser la valeur appropriée pour la requête "getEmployeByEtablissement"
      const Employe = await employeQueries.getEmployeByEtablissement(employeQueryParameter);
       console.log(Employe,"employe")
      if (Employe.result !== null) {
        // let employe = Employe.result;
        // employe.forEach((el) => {
        //   if (session.id == el.travail_pour) {
          //  Result.push(Employe.result);
        //   }
        // });
        res.render('user_list', {
          Result: Employe.result,
          user: req.session.user,
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
