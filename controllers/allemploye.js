const { employeQueries } = require('../requests/EmployeQueries');
const bcrypt = require('bcryptjs');

exports.allemploye = async (req, res) => {
  try {
    const user = req.session.user;
    if (user) {
      const employe = await employeQueries.getEmployeByEtablissement(
        user.id || user._id || user.travail_pour
      );

      if (employe.result !== null) {
        let resultat = employe.result;
        res.json({
          etat: true,
          data: resultat,
          user: req.session.user,
        });
      }
    } else {
      res.status(401).send({
        etat: false,
        data: 'error',
      });
    }
  } catch (e) {
    console.log('err', e);
    res.redirect(e);
  }
};



exports.allBarmans = async (req, res) => {
  if (req.session.user) {
    const body = req.body;
    console.log('👉 👉 👉  ~ file: allemploye.js:23 ~ body:', body);
    try {
      const barmans = await employeQueries.getBarmans(body.travail_pour);
      if (barmans.result !== null) {
        let resultat = barmans.result;
        res.json({
          etat: true,
          data: resultat,
        });
      }
    } catch (e) {
      console.log('👉 👉 👉  ~ file: allemploye.js:34 ~ e:', e);
      res.status(500).send({
        error: 'error',
      });
    }
  } else {
    res.status(401).send({
      error: 'error signature',
    });
  }
};

exports.allemployePost = async (req, res) => {
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


exports.deleteSelfEmployee = async (req, res) => {
  if(req.session.user){
    const user = req.session.user;
    const password = req.body.password;
    const employe = await employeQueries.getEmployeById(user._id);

    if(employe.result !== null){
      const result = employe.result;
      const isPasswordCorrect = bcrypt.compareSync(password, result.password);

      if(!isPasswordCorrect){
        return res.json({
          etat: false,
          data: 'Mot de passe incorrect',
        });
      }


      if(result.deletedItSelf){
        return res.json({
          etat: false,
          data: 'Employé déjà supprimé',
        });
      }


      await employeQueries.updateEmployeDeletedItSelf(user._id, true);

      return res.json({
        etat: true,
        data: 'Employé supprimé',
      });


    }else{
      return res.json({
        etat: false,
        data: 'Employé non trouvé',
      });
    }
  }else{
   return res.json({
    etat: false,
    data: 'Utilisateur non authentifié',
   });
  }
}


exports.confirmDeleteEmployee = async (req, res) => {
  if(req.session.user){
    const user = req.session.user;
    const userId = req.body.userId;
    const confirmer = req.body.confirmer === "on";
    
    const employe = await employeQueries.getEmployeById(userId);
    if(employe.result !== null){
      if(employe.result.deletedItSelf){
        if(confirmer){
          await employeQueries.deleteEmploye(userId);
        }else{
          await employeQueries.updateEmployeDeletedItSelf(userId, false);
        }
      }
    }
  }

  res.redirect('/utilisateur');
}