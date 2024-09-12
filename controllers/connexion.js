exports.connexion = async (req, res) => {
  try {
    res.render("connexion");
  } catch (e) {
    res.redirect(e);
  }
};
exports.connexionPost = async (req, res) => {
  try {
    res.render("connexion");
  } catch (e) {
    res.redirect(e);
  }
};
