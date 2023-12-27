const { userQueries } = require("../requests/UserQueries");

const getParentMaquisList = async (req, res, next) => {
  try {
    const user = req.session.user;

    if (user) {
      if (
        (user.parentSession || !user.parent) &&
        user.maquisList === undefined
      ) {
        const { result: maquisList } = await userQueries.getAllUSersByParent(
          user.parentSession?.id || user._id
        );

        if (user.parentSession) {
          maquisList.push(user.parentSession);
        }

        const currentMaquisIndex = maquisList.findIndex(
          maquis => "" + maquis._id === "" + (user.id || user._id)
        );

        if (currentMaquisIndex > -1) {
          maquisList.splice(currentMaquisIndex, 1);
        }

        req.session.user = {
          ...req.session.user,
          maquisList
        };
      } else if (
        user.maquisList === undefined &&
        user.parentSession?.maquisList
      ) {
        user.maquisList = user.parentSession.maquisList;
      }
    }

    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getParentMaquisList
};
