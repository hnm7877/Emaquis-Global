// const { employeQueries } = require('../requests/EmployeQueries');
const Employe = require('../models/employe.model');

const dotenv = require('dotenv').config();
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.employelogin = async (req, res) => {
  try {
  } catch (e) {
    console.log('err', e);
    res.redirect(e);
  }
};

exports.employeloginPost = async (req, res) => {
  try {
    const { numero, password } = req.body;
    if (!(numero && password)) {
      return res.status(400).send('veuillez remplir tous les champs');
    }
    const employelogin = await Employe.findOne({ numero });

    if (
      employelogin &&
      (await bcrypt.compare(password, employelogin.password)) &&
      !employelogin.deletedItSelf
    ) {
      const token = jwt.sign(
        { employe_id: employelogin._id, numero },
        process.env.SECRET
      );

      employelogin.token = token;
      req.session.user = employelogin;
      console.log(req.session.user, 'session');
      res.status(200).send({ employelogin, token });
    } else {
      res.status(400).send('email ou mot de passe incorrect');
    }
  } catch (e) {
    console.log('err', e);
    res.status(400).send({ data: 'verifiez les champs', success: false });
  }
};
