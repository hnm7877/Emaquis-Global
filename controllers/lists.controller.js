const jwt = require('jsonwebtoken');
const venteModel = require('../models/vente.model');
const produitModel = require('../models/produit.model');
const userModel = require('../models/user.model');

exports.auth = async (req, res) => {
	const { username, password } = req.body;
	if (
		username === process.env.LISTS_ADMIN_USERNAME &&
		password === process.env.LISTS_ADMIN_PASSWORD
	) {
		const user = { id: 1, username };
		const token = jwt.sign({ ...user, justForList: true }, process.env.SECRET, {
			expiresIn: '24h',
		});
		res.send({
			success: true,
			user,
			token,
		});
	} else {
		res.send({
			success: false,
			message: 'Invalid credentials',
		});
	}
};

exports.listsUsers = async (req, res) => {
	const { limit = 30, page = 1 } = req.query;

	const users = await userModel
		.find({})
		.select('email nom_etablissement numero city square username createdAt')
		.sort({ createdAt: -1 })
		.limit(parseInt(limit))
		.skip((Number(page) - 1) * limit);

	const total = await userModel.count({});

	const usersWithVentes = await Promise.all(
		users.map(async (user) => {
			const ventesLength = await venteModel.count({ travail_pour: user._id });
			const produitsLength = await produitModel.count({ session: user._id });

			return {
				user,
				ventes: ventesLength,
				total: produitsLength,
			};
		})
	);

	res.send({
		success: true,
		users: usersWithVentes,
		total,
		totalPage: Math.ceil(total / limit),
		page,
	});
};
