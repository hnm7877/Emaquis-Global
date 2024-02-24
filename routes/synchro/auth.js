const express = require('express');
const jwt = require('jsonwebtoken');
const Router = express.Router();
const secret = process.env.SECRET;

Router.post('/token', async (req, res) => {
	const { username, password } = req.body;

	if (
		username === process.env.ADMIN_USERNAME &&
		password === process.env.ADMIN_PASSWORD
	) {
		const token = jwt.sign({ username, justForSynchro: true }, secret, {
			expiresIn: '1h',
		});
		res.send({
			success: true,
			token,
		});
	} else {
		res.send({
			success: false,
			message: 'Invalid credentials',
		});
	}
});

module.exports = Router;
