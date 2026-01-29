const { venteQueries } = require('../requests/venteQueries');
const { userQueries } = require('../requests/UserQueries');
const { employeQueries } = require('../requests/EmployeQueries');
const { calculPromoTotal } = require('../utils/calculPromoTotal');
const { generateTicket } = require('../utils/generateTicket');
const ejs = require('ejs');
const path = require('path');
const puppeteer = require('puppeteer');

// Afficher la page d'archive des tickets
exports.showArchivePage = async (req, res) => {
	try {
		const user = req.session.user;
		if (!user) {
			return res.redirect('/connexion');
		}
		res.render('ticket-archive.ejs', { user });
	} catch (err) {
		console.log('Error showing archive page:', err);
		res.status(500).send('Erreur lors du chargement de la page');
	}
};

// Récupérer la liste des tickets avec filtres
exports.getTicketArchives = async (req, res) => {
	try {
		const user = req.session.user;
		if (!user) {
			return res.status(401).json({ success: false, message: 'Non authentifié' });
		}

		const adminId = user.travail_pour || user.id || user._id;
		const { filter = 'all', startDate, endDate, limit = 50, page = 1 } = req.query;

		// Construire la query
		const query = { travail_pour: adminId };

		// Filtre par statut d'impression
		if (filter === 'printed') {
			query.ticketPrinted = true;
		} else if (filter === 'unprinted') {
			query.ticketPrinted = false;
		}

		// Filtre par date
		if (startDate || endDate) {
			query.createdAt = {};
			if (startDate) query.createdAt.$gte = new Date(startDate);
			if (endDate) query.createdAt.$lte = new Date(endDate);
		}

		const skip = (parseInt(page) - 1) * parseInt(limit);
		const options = { limit: parseInt(limit), skip };

		const select = {
			ticketPrinted: 1,
			ticketPrintedAt: 1,
		};

		const ventesRes = await venteQueries.getVentes(query, select, options);

		if (!ventesRes.success) {
			return res.status(500).json({ success: false, message: 'Erreur serveur' });
		}

		res.json({
			success: true,
			data: ventesRes.result,
			pagination: {
				page: parseInt(page),
				limit: parseInt(limit),
			},
		});
	} catch (err) {
		console.log('Error getting ticket archives:', err);
		res.status(500).json({ success: false, message: 'Erreur serveur' });
	}
};

// Réimprimer un ticket archivé
exports.reprintTicket = async (req, res) => {
	try {
		const user = req.session.user;
		if (!user) {
			return res.send('Vous devez être connecté pour accéder à cette page');
		}

		const adminId = user.travail_pour || user.id || user._id;
		const orderId = req.params.orderId;

		const admin = await userQueries.getUserById(adminId);
		const venteRes = await venteQueries.getVentesById(orderId);
		const vente = venteRes.result;

		if (!vente) {
			return res.send("La commande n'existe pas");
		}

		const barman = await employeQueries.getEmployeById(vente.employe);

		const browser = await puppeteer.launch({
			headless: 'new',
			args: ['--no-sandbox', '--disable-setuid-sandbox'],
		});
		const page = await browser.newPage();

		const data = {
			vente: {
				...vente._doc,
				produit: vente.produit.map((p, index) => ({
					...p._doc,
					total_price: p.promo
						? parseInt(vente.quantite[index] / p.promo_quantity) *
								p.promo_price +
						  (vente.quantite[index] % p.promo_quantity) * p.prix_vente
						: p.prix_vente * vente.quantite[index],
				})),
			},
			barman: barman.result.nom,
			nom_etablissement: admin.result.nom_etablissement,
			adresse: admin.result.adresse,
			telephone: admin.result.telephone,
			email: admin.result.email,
			country: admin.result.country,
			city: admin.result.city,
			total: vente.produit.reduce((acc, curr, index) => {
				let prix_vente = curr.prix_vente;

				if (curr.promo) {
					prix_vente = calculPromoTotal(curr, vente.quantite[index]);
				}

				return acc + prix_vente * (curr.promo ? 1 : vente.quantite[index]);
			}, 0),
			id_vente: vente._id.toString().slice(-8),
		};

		let ticket = generateTicket(data);

		const htmlContent = await ejs.renderFile(
			path.join(__dirname, '../templates/orderTicket.ejs'),
			{
				ticket,
			}
		);

		await page.setContent(htmlContent);

		const pdf = await page.pdf();

		browser.close();

		// Note: On ne met PAS à jour ticketPrintedAt pour garder la date d'origine
		// C'est une réimpression, pas une première impression

		res.contentType('application/pdf');
		res.send(pdf);
	} catch (err) {
		console.log('Error reprinting ticket:', err);
		res.send("Une erreur s'est produite, veuillez réessayer plus tard");
	}
};
