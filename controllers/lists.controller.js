const jwt = require('jsonwebtoken');
const venteModel = require('../models/vente.model');
const produitModel = require('../models/produit.model');

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
	const users = await produitModel.aggregate([
		{
			$group: {
				_id: '$session',
				total: { $sum: 1 },
			},
		},
		{
			$lookup: {
				from: 'users',
				localField: '_id',
				foreignField: '_id',
				as: 'user',
			},
		},
		{
			$unwind: '$user',
		},
		{
			$project: {
				_id: 0,
				total: 1,
				user: {
					_id: 1,
					email: 1,
					nom_etablissement: 1,
					numero: 1,
					city: 1,
					square: 1,
					username: 1,
					createdAt: 1,
				},
			},
		},
    {
      $sort: {
        'user.createdAt': -1,
      }
    },
		{
			$match: {
				total: { $lt: 10 },
			},
		},
		{
			$skip: (Number(page) - 1) * limit,
		},
		{
			$limit: parseInt(limit),
		},
    
	]);

	const usersAll = await produitModel.aggregate([
		{
			$group: {
				_id: '$session',
				total: { $sum: 1 },
			},
		},
		{
			$lookup: {
				from: 'users',
				localField: '_id',
				foreignField: '_id',
				as: 'user',
			},
		},
		{
			$unwind: '$user',
		},
		{
			$project: {
				_id: 0,
				total: 1,
				user: {
					_id: 1,
					email: 1,
					nom_etablissement: 1,
					numero: 1,
					city: 1,
					square: 1,
					username: 1,
					createdAt: 1,
				},
			},
		},
    {
			$match: {
				total: { $lt: 10 },
			},
		},
	]);

  const usersWithVentes = await Promise.all(
    users.map(async (user) => {
      const ventes = await venteModel.count({ travail_pour: user.user._id });
      return {
        ...user,
        ventes,
      };
    })
  )

	res.send({
		success: true,
		users: usersWithVentes,
		total: usersAll.length,
		totalPage: Math.ceil(usersAll.length / limit),
		page,
	});
};
