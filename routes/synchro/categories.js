const express = require('express');
const { authSynchroApi } = require('../../middleware/auth');
const categorieModel = require('../../models/categorie.model');
const router = express.Router();

router.get('', authSynchroApi, async (req, res) => {
	const data = await categorieModel.find();

	res.send({
		success: true,
		data,
	});
});

module.exports = router;
