const { PAYS } = require("../constants");
const { userQueries } = require("../requests/UserQueries");
const ejs = require("ejs");
const path = require("path");
const { sendMail } = require("../utils/email");
const { generateToken, verifyToken } = require("../utils/manageToken");
const bcrypt = require("bcryptjs");

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

exports.forgetPassword = async (req, res) => {
  try {
    res.render("forgot_password");
  } catch (e) {
    console.log("err", e);
    res.redirect(e);
  }
};

exports.forgotUserPassword = async (req, res) => {
  try {
    const body = req.body;

    const { result: user } = await userQueries.getUserByNumberOrEmail({
      email: body.email,
      numero: "",
    });

    if (user) {
      const token = generateToken({ id: user.id }, "5m");
      const url = `${process.env.URL}/reset_password?token=${token}`;
      const html = await ejs.renderFile(
        path.join(__dirname, "../templates/resetPassword.ejs"),
        {
          url,
          fullName:
            user.nom && user.prenom
              ? `${user.nom} ${user.prenom}`
              : user.nom_etablissement,
        }
      );
      const options = {
        subject: "Réinitialiser votre mot de passe",
        html,
      };
      const { success } = await sendMail(user.email, options);
      if (true) {
        res.status(200).json({
          success: true,
          message: "Un email de réinitialisation de mot de passe a été envoyé",
        });
      } else {
        res.status(500).json({
          message: "Une erreur s'est produite lors de l'envoi de l'email",
        });
      }
    } else {
      res.status(404).json({
        message: "Utilisateur non trouvé",
      });
    }
  } catch (e) {
    console.log("err", e);
    res.redirect("/");
  }
};

exports.getResetPassword = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.redirect("/connexion");
    }

    const isCorrectToken = verifyToken(token);

    res.render("reset_password", {
      token,
    });
  } catch (e) {
    res.redirect("/connexion");
  }
};

exports.postResetPassword = async (req, res) => {
  try {
    const { password, confirm_password, token } = req.body;

    let isSucces = false;
    let message =
      "Félicitations, votre mot de passe a été réinitialisé avec succès";

    const { id: userId } = verifyToken(token);

    if (!(password && confirm_password)) {
      message = "Veuillez remplir tous les champs";
    }

    if (password !== confirm_password) {
      message = "Les mots de passe ne correspondent pas";
    }

    if (password.length < 4) {
      message = "Le mot de passe doit contenir au moins 8 caractères";
    }

    if (password === confirm_password && password.length >= 4) {
      const { result: updatedUser } = await userQueries.updateUser(userId, {
        password: bcrypt.hashSync(password, 10),
      });

      isSucces = true;
    }

    res.render("reset_password", {
      success: isSucces,
      message,
    });
  } catch (e) {
    if (e.message === "jwt expired") {
      return res.render("reset_password", {
        message: "Le lien a expiré",
      });
    }

    res.redirect("/connexion");
  }
};
