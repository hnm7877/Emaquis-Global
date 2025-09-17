exports.summary = async (req, res) => {
  if (req.session.user) {
    try {
      let sess = req.session.user;
      //console.log(sess.id,"sqddsddqs")
      const country = require("../constants").PAYS.find(
        (p) => p.code === (sess.country || "cote_d_ivoire")
      );
      const currency = country ? country.devise : "XOF";
      res.render("summary", { user: sess, currency });
    } catch (error) {
      res.redirect(error);
    }
  } else {
    res.redirect("/");
  }
};

exports.summaryPost = async (req, res) => {
  if (req.session.user) {
    try {
      res.render("summary");
    } catch (error) {
      res.redirect(error);
    }
  } else {
    res.redirect("/");
  }
};

exports.paiement = async (req, res) => {
  if (req.session.user) {
    try {
      res.render("paiement");
    } catch (error) {
      res.redirect(error);
    }
  } else {
    res.redirect("/");
  }
};
