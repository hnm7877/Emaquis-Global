const express = require("express");
const router = express.Router();
const Setting = require("../models/settings.model");
const { authUser } = require("../middleware/auth");

// Route pour activer dynamiquement une ou plusieurs options premium après paiement
router.post("/activate-options", authUser, async (req, res) => {
  const { userId, options } = req.body;
  if (!userId || req.user.id.toString() !== userId.toString()) {
    return res.status(403).json({ error: "Accès refusé" });
  }
  if (!Array.isArray(options) || options.length === 0) {
    return res.status(400).json({ error: "Aucune option à activer" });
  }
  // Construction dynamique de l'objet de mise à jour
  const updateFields = {};
  options.forEach((opt) => {
    if (["hasStock", "hasOffer", "hasSubCategories"].includes(opt)) {
      updateFields[opt] = true;
    }
  });
  if (Object.keys(updateFields).length === 0) {
    return res.status(400).json({ error: "Options invalides" });
  }
  try {
    const updated = await Setting.findOneAndUpdate(
      { travail_pour: userId },
      { $set: updateFields },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ error: "Paramètres non trouvés" });
    res.json({ success: true, settings: updated });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
