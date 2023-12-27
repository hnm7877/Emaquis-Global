const { PAYS } = require("../constants");

exports.inscription = async (req, res) => {
  try {
    res.render("signup", {
      countries: PAYS
    });
  } catch (e) {
    console.log("err", e);
    res.redirect(e);
  }
};
exports.inscriptionPost = async (req, res) => {
  try {
    res.render("signup");
  } catch (e) {
    console.log("err", e);
    res.redirect(e);
  }
};
