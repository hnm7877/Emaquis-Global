/**
 * Script pour supprimer le champ 'country' de la collection 'produit-globals'
 * Ce script ne modifie pas la logique ni les endpoints existants
 */

require("dotenv").config();
const mongoose = require("mongoose");

// Configuration de la connexion MongoDB (identique à settings/database.js)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("✅ Connexion à MongoDB réussie");
  } catch (error) {
    console.error("❌ Erreur de connexion à MongoDB:", error);
    process.exit(1);
  }
};

// Fonction principale pour supprimer le champ country
const removeCountryField = async () => {
  try {
    console.log('🔄 Début de la suppression du champ "country"...');

    // Utiliser la collection directement avec mongoose
    const db = mongoose.connection.db;
    const collection = db.collection("produit-globals");

    // Compter les documents avant la modification
    const countBefore = await collection.countDocuments({});
    console.log(`📊 Nombre de documents dans la collection: ${countBefore}`);

    // Supprimer le champ 'country' de tous les documents
    const result = await collection.updateMany(
      {}, // Filtre vide pour tous les documents
      {
        $unset: { country: "" }, // Supprime le champ country
      }
    );

    console.log(`✅ Modification réussie:`);
    console.log(`   - Documents modifiés: ${result.modifiedCount}`);
    console.log(`   - Documents correspondants: ${result.matchedCount}`);

    // Vérifier qu'aucun document n'a encore le champ country
    const countWithCountry = await collection.countDocuments({
      country: { $exists: true },
    });
    console.log(
      `🔍 Documents avec le champ 'country' restants: ${countWithCountry}`
    );

    if (countWithCountry === 0) {
      console.log(
        '✅ Tous les champs "country" ont été supprimés avec succès!'
      );
    } else {
      console.log(
        `⚠️  Attention: ${countWithCountry} document(s) ont encore le champ "country"`
      );
    }
  } catch (error) {
    console.error(
      '❌ Erreur lors de la suppression du champ "country":',
      error
    );
    throw error;
  }
};

// Fonction principale
const main = async () => {
  try {
    await connectDB();
    await removeCountryField();
    console.log("✅ Script terminé avec succès");
  } catch (error) {
    console.error("❌ Erreur lors de l'exécution du script:", error);
    process.exit(1);
  } finally {
    // Fermer la connexion
    await mongoose.connection.close();
    console.log("🔌 Connexion MongoDB fermée");
    process.exit(0);
  }
};

// Exécuter le script
if (require.main === module) {
  main();
}

module.exports = { removeCountryField };
