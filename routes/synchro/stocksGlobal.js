const express = require('express');
const { authSynchroApi } = require('../../middleware/auth');
const stocksImgModel = require('../../models/stocks-img.model');
const router = express.Router();

router.get('', authSynchroApi, async (req, res) => {
	const data = await stocksImgModel.find();

	res.send({
		success: true,
		data,
	});
});

module.exports = router;
