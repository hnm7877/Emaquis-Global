const express = require('express');
const { authSynchroApi } = require('../../middleware/auth');
const employeModel = require('../../models/employe.model');
const router = express.Router();

router.get('/:userId', authSynchroApi, async (req, res) => {
	const { userId } = req.params;

	const employees = await employeModel.find({
		travail_pour: userId,
	});

	res.send({
		success: true,
		data: employees,
	});
});

module.exports = router;
