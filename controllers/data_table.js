const { venteQueries } = require('../requests/venteQueries');
const { getUserDetails, getExpiredDate } = require('../utils/getExpirateDate');

exports.data_table = async (req, res) => {
	try {
		const user = req.session.user;
		if (user) {
			const ventes = await venteQueries.getVentes({
				travail_pour: user.id || user.travail_pour,
			});
			const userDetails = await getUserDetails(user);

			res.render('data_table', {
				ventes: ventes.result.map((el) => {
					return {
						...(el._doc || el),
						code: ('' + el._id).slice(-6).toUpperCase(),
						produit: el.produit
							.map((el) => el.produit?.nom_produit || '')
							.join(','),
						categories: [
							...new Set(
								el.produit
									.filter((el) => el.produit?.categorie)
									.map((el) => el.produit?.categorie?.nom)
							),
						].join(','),
						employe: `${el.employe?.nom} ${el.employe?.prenom}`,
						createdAt: new Date(el.createdAt).toLocaleString('fr-Fr'),
					};
				}),
				user: userDetails,
				expiredDate: getExpiredDate(userDetails.expiredPaymentDate),
			});
		} else {
			res.redirect('connexion');
		}
	} catch (e) {
		console.log('err', e);
		res.redirect('connexion');
	}
};
exports.data_tablePost = async (req, res) => {
	try {
		res.render('data_table');
	} catch (e) {
		console.log('err', e);
		res.redirect(e);
	}
};
