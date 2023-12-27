const { PAYS, TYPE_RETOUR_PRDUITS } = require("../constants");
const { userQueries } = require("../requests/UserQueries");
const { settingQueries } = require("../requests/settingQueries");

const getMaquisListeByParent = async (req, res) => {
  try {
    const user = req.session.user;

    if (user) {
      const { result: maquis } = await userQueries.getAllUSersByParent(
        user.parentSession?.id || user._id || user.id
      );

      if (user.parentSession) {
        maquis.push(user.parentSession);
      }

      const currentMaquisIndex = maquis.findIndex(
        maquis => "" + maquis._id === "" + (user.id || user._id)
      );

      if (currentMaquisIndex > -1) {
        maquis.splice(currentMaquisIndex, 1);
      }

      res.render("maquis_list", { maquis: maquis || [], user: user });
    } else {
      res.redirect("/connexion");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAddNewMaquis = async (req, res) => {
  try {
    const user = req.session.user;
    if (user) {
      res.render("add_new_maquis", {
        user: user,
        pays: PAYS,
        retour_produits_types: TYPE_RETOUR_PRDUITS,
      });
    } else {
      res.redirect("/connexion");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postAddNewMaquis = async (req, res) => {
  try {
    const user = req.session.user;
    if (req.session.user) {
      const body = req.body;

      let error = null;

      const data = {
        username: body.username,
        nom_etablissement: body.nom_etablissement,
        adresse: body.adresse,
        email: body.email,
        numero: body.numero,
        product_return_type: body.product_return_type,
        objective: body.objective,
        numberOfTables: body.numberOfTables,
        country: body.country,
        city: body.city,
        password: body.password,
        parent: body.parent,
      };

      for (let key of [
        "username",
        "nom_etablissement",
        "adresse",
        "email",
        "numero",
        "parent",
        "country",
        "city",
      ]) {
        if (data[key] === "") {
          if (
            (key === "email" && data["numero"]) ||
            (key === "numero" && data["email"])
          ) {
            continue;
          }
          error = `Le champ ${key} est obligatoire`;
          break;
        }
      }

      if (user.parent || !user.parentSession) {
        error = "Vous n'avez pas le droit de créer un maquis";
      }

      if (user.parentSession) {
        data.parent = user.parentSession.id;
      }

      const { result: maquisExisted } =
        await userQueries.getUserByNumberOrEmail({
          email: data.email,
          numero: data.numero,
        });

      if (maquisExisted) {
        error = "Un maquis avec ce numéro ou cet email existe déjà";
      }

      if (error) {
        return res.render("add_new_maquis", {
          user: user,
          pays: PAYS,
          retour_produits_types: TYPE_RETOUR_PRDUITS,
          error,
        });
      }

      const { result: maquis } = await userQueries.setUserWithParent(data);

      if (maquis) {
        let resSetting = await settingQueries.setSetting({
          travail_pour: maquis._id,
          product_return_type: data.product_return_type,
          objective: data.objective,
          numberOfTables: data.numberOfTables,
        });
      }

      res.redirect("/maquis-list");
    } else {
      res.redirect("/connexion");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const swapTokenMaquis = async (req, res) => {
  try {
    const user = req.session.user;

    if (user.parentSession || !user.parent) {
      const maquis_id = req.params.maquis_id;

      const { result: maquis } = await userQueries.getUserById(maquis_id);

      if (maquis) {
        let newUser = {
          id: maquis._id,
          ...maquis._doc,
        };

        if (!user.parent) {
          newUser.parentSession = user.parentSession || user;
        } else if (user.parentSession) {
          newUser.parentSession = user.parentSession;
        }

        req.session.user = newUser;

        req.session.save();

        res.redirect("/dashboard");
      } else {
        throw new Error("Maquis not found");
      }
    } else {
      res.redirect("/connexion");
    }
  } catch (err) {
    res.status(400).json({ error: error.message });
  }
};

const adminDeleteMaquis = async (req, res) => {
  try {
    const user = req.session.user;

    if (user.parentSession || !user.parent) {
      const maquis_id = req.params.maquis_id;

      const { result: maquis } = await userQueries.getUserById(maquis_id);

      if (maquis && "" + maquis.parent === "" + user.id)
        await userQueries.deleteUser(maquis_id);

      res.redirect("/maquis-list");
    } else {
      res.redirect("/connexion");
    }
  } catch (err) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getMaquisListeByParent,
  getAddNewMaquis,
  postAddNewMaquis,
  swapTokenMaquis,
  adminDeleteMaquis,
};
