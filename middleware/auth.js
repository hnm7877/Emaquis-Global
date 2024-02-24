require('dotenv').config();
const jwt = require('jsonwebtoken');
const employeModel = require('../models/employe.model');
const secret = process.env.SECRET;
const User = require('../models/user.model');
const userModel = require('../models/user.model');

exports.authUser = async (req, res, next) => {
	const token = req.headers.token;
	if (!!!token) {
		res.status(404).send({ error: 'token not find' });
		return;
	}
	try {
		const tokenExist = await User.findOne({ token: token });
		if (tokenExist) {
			const data = jwt.verify(token, secret);
			req.user = {
				id: tokenExist._id,
				folders: tokenExist.folders,
				role: tokenExist.role,
			};
			if (data) {
				next();
			} else {
				res.status(401).send({ error: 'error signature' });
			}
		} else {
			res.status(404).send({ error: 'Token not find' });
			return;
		}
	} catch (err) {
		res.status(404).send({ error: err.message });
		return;
	}
};

exports.checkAuthUser = async (req, res, next) => {
	if (req.session.user) {
		next();
	} else {
		res.redirect('/connexion');
	}
};

exports.authAdmin = async (req, res, next) => {
	const token = req.headers.token;
	if (!!!token) {
		res.status(404).send({ error: 'token not find' });
		return;
	}
	try {
		const tokenExist = await User.findOne({ token: token });
		if (tokenExist && tokenExist.role === 'ROLE_ADMIN') {
			const data = jwt.verify(token, secret);
			req.user = {
				id: tokenExist._id,
				folders: tokenExist.folders,
				role: tokenExist.role,
			};
			if (data) {
				next();
			} else {
				res.status(401).send({ error: 'error signature' });
			}
		} else {
			res.status(404).send({ error: "you are don't accès to this route" });
			return;
		}
	} catch (err) {
		res.status(404).send({ error: err.message });
		return;
	}
};

exports.authSuperAdmin = async (req, res, next) => {
	const isAdmin = req.session.user?.isAdmin;
	if (!!!isAdmin) {
		res.redirect('/connexion');

		return;
	}

	next();
};

exports.authSynchroApi = async (req, res, next) => {
	const auth = req.headers.authorization;
	if (auth) {
		const token = auth.split(' ')[1];
		if (token) {
			jwt.verify(token, secret, (err, user) => {
				if (err) {
					return res.sendStatus(403);
				}
				req.user = user;
				next();
			});
		} else {
			return res.sendStatus(401);
		}
	} else {
		return res.sendStatus(401);
	}
};

// Authorization Bearer token

exports.forceSession = async (req, res, next) => {
	const authorization = req.headers.authorization;

	if (authorization && !req.session.user) {
		try {
			const token = authorization.split(' ')[1];
			const data = jwt.verify(token, secret);
			let employe = await employeModel.findOne({
				_id: data?.employe_id,
				deleted: false,
			});

			if (data && !employe) {
				employe = await userModel.findOne({
					_id: data?.user_id,
				});
			}

			if (!employe && !data?.justForSynchro) {
				res.status(401).send({ error: 'error signature' });
				return;
			}
			req.session.user = employe;
		} catch (e) {
			res.status(401).send({ error: 'error signature' });
			return;
		}
	} else if (req.session.user && req.session.user.deleted) {
		res.status(401).send({ error: 'error signature' });
		return;
	}

	next();
};
