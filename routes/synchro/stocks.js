const express = require('express');
const { authSynchroApi } = require('../../middleware/auth');
const stocksModel = require('../../models/stocks');
const router = express.Router();

router.get('/:userId', authSynchroApi, async (req, res) => {
	const { userId } = req.params;

	const data = await stocksModel.find({
		travail_pour: userId,
	});

	res.send({
		success: true,
		data,
	});
});

module.exports = router;
