const express = require('express');
const { authSynchroApi } = require('../../middleware/auth');
const venteModel = require('../../models/vente.model');
const router = express.Router();

router.get('/:userId', authSynchroApi, async (req, res) => {
	const { userId } = req.params;

	const data = await venteModel.find({
		travail_pour: userId,
	});

	res.send({
		success: true,
		data,
	});
});

module.exports = router;
