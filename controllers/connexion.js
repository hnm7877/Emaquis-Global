const { PAYS } = require("../constants");

exports.connexion = async (req, res) => {
  try {
    res.render("connexion", {
      countries: PAYS,
    });
  } catch (e) {
    console.log("err", e);
    res.redirect(e);
  }
};
exports.connexionPost = async (req, res) => {
  try {
    res.render("connexion");
  } catch (e) {
    console.log("err", e);
    res.redirect(e);
  }
};
