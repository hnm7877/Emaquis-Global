// Script Node.js pour forcer la mise à jour du champ country d'un utilisateur
const mongoose = require("mongoose");
const User = require("../models/user.model");

if (process.argv.length < 4) {
  console.log(
    "Usage: node forceCountryUpdate.js <userEmail|userId> <countryCode>"
  );
  process.exit(1);
}

const identifier = process.argv[2];
const country = process.argv[3];

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/emaquis";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    let user;
    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      user = await User.findById(identifier);
    } else {
      user = await User.findOne({ email: identifier });
    }
    if (!user) {
      console.log("Utilisateur non trouvé");
      process.exit(1);
    }
    user.country = country;
    await user.save();
    console.log(
      `Pays mis à jour pour l'utilisateur ${
        user.email || user._id
      } : ${country}`
    );
    process.exit(0);
  })
  .catch((err) => {
    console.error("Erreur MongoDB:", err);
    process.exit(1);
  });
