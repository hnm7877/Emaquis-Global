const express = require('express');
const { authSynchroApi } = require('../../middleware/auth');
const produitModel = require('../../models/produit.model');
const settingsModel = require('../../models/settings.model');
const router = express.Router();

router.get('/:userId', authSynchroApi, async (req, res) => {
	const { userId } = req.params;

	const data = await settingsModel.find({
		travail_pour: userId,
	});

	res.send({
		success: true,
		data,
	});
});

module.exports = router;
