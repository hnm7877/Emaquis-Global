const express = require('express');
const { authSynchroApi } = require('../../middleware/auth');
const userModel = require('../../models/user.model');
const employeModel = require('../../models/employe.model');
const router = express.Router();

router.get('', authSynchroApi, async (req, res) => {
	const users = await userModel.find();

	const usersWithEmployees = await Promise.all(
		users.map(async (user) => {
			const employees = await employeModel.find({
				travail_pour: user._id,
			});

			return {
				...user._doc,
				employees,
			};
		})
	);

	res.send({
		success: true,
		data: usersWithEmployees,
	});
});

module.exports = router;
