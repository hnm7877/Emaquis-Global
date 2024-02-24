const express = require('express');
const { authSynchroApi } = require('../../middleware/auth');
const app_configModel = require('../../models/app_config.model');
const router = express.Router();

router.get('', authSynchroApi, async (req, res) => {
	const data = await app_configModel.find();

	res.send({
		success: true,
		data,
	});
});

module.exports = router;
