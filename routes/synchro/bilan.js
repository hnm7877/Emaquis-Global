const express = require('express');
const { authSynchroApi } = require('../../middleware/auth');
const BilanModel = require('../../models/billet.model');
const router = express.Router();

router.get('/:userId', authSynchroApi, async (req, res) => {
	const { userId } = req.params;

	const data = await BilanModel.find({
		travail_pour: userId,
	});

	res.send({
		success: true,
		data,
	});
});

module.exports = router;
