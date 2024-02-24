const express = require('express');
const { authSynchroApi } = require('../../middleware/auth');
const produitModel = require('../../models/produit.model');
const router = express.Router();

router.get('/:userId', authSynchroApi, async (req, res) => {
	const { userId } = req.params;

	const data = await produitModel
		.find({
			session: userId,
		})
		.populate('produit');

	res.send({
		success: true,
		data,
	});
});

module.exports = router;
