const { venteQueries } = require('../requests/venteQueries');
const { settingQueries } = require('../requests/settingQueries');
const { produitQueries } = require('../requests/produitQueries');
const { getUserDetails, getExpiredDate } = require('../utils/getExpirateDate');

exports.data_table = async (req, res) => {
	try {
		const user = req.session.user;
		if (user) {
			const ventes = await venteQueries.getVentes(
				{
					travail_pour: user.id || user.travail_pour,
				},
				{
					offered: 1,
					offered_confirmed: 1,
				}
			);
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
						createdAt: new Date(el.createdAt).getTime(),
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

exports.data_table_offert = async (req, res) => {
	try {
		const user = req.session.user;
		if (user) {
			const ventes = await venteQueries.getVentes(
				{
					travail_pour: user.id || user.travail_pour,
					offered: true,
				},
				{
					offered: 1,
					offered_confirmed: 1,
				}
			);
			const userDetails = await getUserDetails(user);

			const setting = await settingQueries.getSettingByUserId(
				user.id || user.travail_pour
			);

			if (!setting?.result?.hasOffer) {
				return res.redirect('/data_table');
			}

			const totalOffert = ventes.result.reduce((acc, el) => {
				return (
					acc +
					(el.status_commande === 'Annulée' || !el.offered_confirmed
						? 0
						: el.prix)
				);
			}, 0);

			res.render('data_table_vente_offert', {
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
						createdAt: el.createdAt,
					};
				}),
				user: userDetails,
				expiredDate: getExpiredDate(userDetails.expiredPaymentDate),
				totalOffert,
			});
		} else {
			res.redirect('connexion');
		}
	} catch (e) {
		console.log('err', e);
		res.redirect('connexion');
	}
};

exports.confim_vente_offert = async (req, res) => {
	try {
		const { offerId } = req.body;

		const vente = await venteQueries.getVentesById(offerId);

		if (!vente?.result) {
			return res.redirect('/data_table_vente_offert');
		}

		const { offered } = vente.result;

		if (offered) {
			await venteQueries.updateVente(offerId, { offered_confirmed: true });
		}

		res.redirect('/data_table_vente_offert');
	} catch (error) {
		console.log('error', error);
	}
};

exports.cancel_vente_offert = async (req, res) => {
	try {
		const { offerId } = req.body;

		const vente = await venteQueries.getVentesById(offerId);

		const sess = req.session.user;
		console.log('🚀 ~ exports.cancel_vente_offert= ~ sess:', sess);
		const travail_pour = sess.travail_pour || sess.id || sess._id;

		if (!vente?.result) {
			return res.redirect('/data_table_vente_offert');
		}

		const { offered, produit: products, quantite } = vente.result;

		if (offered) {
			await venteQueries.updateVente(offerId, { status_commande: 'Annulée' });

			console.log(
				'🚀 ~ exports.cancel_vente_offert= ~ vente:',
				vente.result.produit
			);

			for (const [i, product] of products.entries()) {
				console.log('🚀 ~ exports.cancel_vente_offert= ~ product:', product);
				const produit = await produitQueries.getProduitById(product.productId);

				const newQte = produit.result.quantite + Number(quantite[i]);

				await produitQueries.updateProduit(
					{
						produitId: product.productId,
						session: travail_pour,
					},
					{ quantite: newQte }
				);

				console.log(
					{
						produitId: product.productId,
						session: travail_pour,
					},
					{ quantite: newQte }
				);

				if (req.app.io) {
					// console.log(req.app.io, sess.travail_pour,"lkfjdkfjdlfjldkfjk");
					req.app.io.emit(`${travail_pour}-update-product`, {
						product: {
							produitId: product.productId,
							quantite: newQte,
						},
					});
				}
			}
		}

		res.redirect('/data_table_vente_offert');
	} catch (error) {
		console.log('error', error);
		res.redirect('/data_table_vente_offert');
	}
};

exports.data_tablePost = async (req, res) => {
	try {
		const { offerId } = req.body;

		const vente = await venteQueries.getVentesById(offerId);

		if (!vente?.result) {
			return res.redirect('/data_table_vente_offert');
		}

		const { offered } = vente.result;

		if (offered) {
			await venteQueries.updateVente(offerId, { status_commande: 'Annulée' });
		}

		res.redirect('/data_table_vente_offert');
	} catch (e) {
		console.log('err', e);
		res.redirect(e);
	}
};
