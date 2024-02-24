const express = require('express');
const { authSynchroApi } = require('../../middleware/auth');
const produitglobalModel = require('../../models/produitglobal.model');
const router = express.Router();

router.get('', authSynchroApi, async (req, res) => {
	const data = await produitglobalModel.find();

	res.send({
		success: true,
		data,
	});
});

module.exports = router;
