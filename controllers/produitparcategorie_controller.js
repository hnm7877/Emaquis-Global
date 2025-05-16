const { produitQueries } = require('../requests/produitQueries');
const { categorieQueries } = require('../requests/categorieQueries');

exports.categorieProduct = async (req, res) => {};

exports.categorieProductPost = async (req, res) => {
	try {
		if (req.session.user) {
			const CategoryId = req.body.categoryId;
			const Session = req.body.session;
			let resultat = [];
			let cat = [];
			if (CategoryId !== null) {
				const Produit = await produitQueries.getProduit();

				if (Produit.result !== null) {
					for (let el of Produit.result) {
						if (
							el?.produit?.categorie?._id == CategoryId &&
							el.session == Session
						) {
							const { historiques, ...data } = el._doc;
							resultat.push(data);
						}
					}
					if (resultat.length <= 0) {
						res.status(400).send({
							data: "cette categorie n'a pas de produit,veuillez en rajouter svp",
							success: false,
						});
					} else {
						res
							.status(200)
							.send({ data: [...new Set(resultat)], success: true });
					}
				}
			}
		} else {
			res.status(400).send({ data: 'veuillez vous connecter', success: false });
		}
	} catch (e) {
		console.log('err', e);
		res.redirect(e);
	}
};

exports.categorieParentProductPost = async (req, res) => {
	try {
		if (req.session.user) {
			const CategoryId = req.body.categoryId;
			const Session = req.body.session;
			const travail_pour = req.session.user.travail_pour;
			let resultat = [];
			let cat = [];
			if (CategoryId !== null) {
				const { result: subCategories } =
					await categorieQueries.getCategorieByParentId(CategoryId);

				let result = [];

				for (let el of subCategories) {
					const products = await produitQueries.getProductsByCategorId(
						el._id.toString(),
						travail_pour
					);

					result.push({
						...el._doc,
						products: products.result || [],
					});
				}

				res.status(200).send({ data: result, success: true });
			}
		} else {
			res.status(400).send({ data: 'veuillez vous connecter', success: false });
		}
	} catch (e) {
		console.log('err', e);
		res.redirect(e);
	}
};
