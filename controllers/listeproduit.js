const { employeQueries } = require('../requests/EmployeQueries');
const { produitQueries } = require('../requests/produitQueries');
const { ObjectId } = require('mongoose').Types;
exports.produit = async (req, res) => {
  if (req.session.user) {
    const session = req.session.user;

    try {
      // const Produit = await produitQueries.getProduit();
      // console.log(session ,"session")
      // const Produitid = await produitQueries.getProduitById(req.query.id);
      // let Result = [];
      // let Myemploye = [];
      // const employe = await employeQueries.getEmployeByEtablissement(session._id)
      // Myemploye.push(employe)
      // if (Produit.result !== null) {
      //   console.log(session ,"session")
      //   const produit = await produitQueries.getProduit(Produitid);
      //   let prod = produit.result;
      //   prod.forEach(async (el) => {
      //     if (session.id == el.session || session.travail_pour == el.session) {
      //       Result.push(el);
      //     }
      //   });
      // }
      const Produit = await produitQueries.getProduit();
      console.log(session, "session");
      const Produitid = await produitQueries.getProduitById(req.query.id);
      let Result = [];
      let Myemploye = [];
      const employe = await employeQueries.getEmployeByEtablissement(session._id);
      console.log(employe,"employe")
      if (employe.result && employe.result.length > 0) {
        // Fill Myemploye with employee IDs
        Myemploye = employe.result.map((emp) => emp._id);
        
      }
      console.log(Myemploye ,"Myemploye")
      if (Produit.result !== null) {
        console.log(session, "session");
        const produit = await produitQueries.getProduit(Produitid);
        let prod = produit.result;

        const MyemployeObjectIds = Myemploye.map((id) => ObjectId(id));
        // Use Promise.all with async/await for proper asynchronous processing
        await Promise.all(
          prod.map(async (el) => {
            // Check if "el.session" is equal to one of the employee IDs in Myemploye, the session ID, or the travail_pour property of the session
            if (session.id == el.session ||  MyemployeObjectIds.some((empId) => empId.equals(el.session)) || session.travail_pour == el.session) {
              Result.push(el);
            }
          })
        );
      }
      res.render('listeproduit', { Result, user: req.session.user });
    } catch (e) {
      console.log('err', e);
      res.redirect(e);
    }
  } else {
    res.redirect('/');
  }
};

exports.produitPost = async (req, res) => {
  if (req.session.user) {
    try {
      res.render('listeproduit');
    } catch (e) {
      console.log('err', e);
      res.redirect(e);
    }
  } else {
    res.redirect('/');
  }
};
