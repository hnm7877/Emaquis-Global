exports.inscription = async (req, res) => {
  try {
    res.render("signup");
  } catch (e) {
    res.redirect(e);
  }
};
exports.inscriptionPost = async (req, res) => {
  try {
    res.render("signup");
  } catch (e) {
    res.redirect(e);
  }
};
