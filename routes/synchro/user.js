const express = require('express');
const { authSynchroApi } = require('../../middleware/auth');
const userModel = require('../../models/user.model');
const router = express.Router();

router.get('', authSynchroApi, async (req, res) => {
	const users = await userModel.find();
	res.send({
		success: true,
		data: users,
	});
});

module.exports = router;
