const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "views", "ajouterproduit.ejs");
let lines = fs.readFileSync(filePath, "utf8").split("\n");

// Remplacer ligne 719 (index 718) - remplacer directement
lines[718] =
  "          const hasSubCategories = userData && userData.hasSubCategories ? userData.hasSubCategories : false;";

// Remplacer ligne 723 (index 722) - remplacer directement
lines[722] =
  "          const productCategoryId = productData && productData.produit && productData.produit.categorie && productData.produit.categorie._id ? productData.produit.categorie._id : '';";

// Remplacer ligne 1060 (index 1059) - remplacer directement
lines[1059] =
  "          const catId = productData && productData.produit && productData.produit.categorie && productData.produit.categorie._id ? productData.produit.categorie._id : '';";

fs.writeFileSync(filePath, lines.join("\n"), "utf8");
console.log("Remplacements effectués avec succès");
