/**
 * Donate Controller — GeniusPay Integration
 * 
 * Gère les dons via l'API GeniusPay (mode checkout hébergé).
 * Toutes les méthodes de paiement : Wave, Orange Money, MTN, Moov,
 * Paystack, PawaPay, Airtel, Carte bancaire.
 */

const geniusPay = require('../services/geniuspay.service');

/**
 * POST /donate
 * 
 * Reçoit le montant (+ infos optionnelles), appelle l'API GeniusPay
 * pour créer un paiement en mode checkout, et retourne l'URL de checkout.
 * Le frontend redirige l'utilisateur vers cette URL.
 */
exports.donatePage = async (req, res) => {
	const { amount } = req.body;
	console.log('🎁 Donation request — amount:', amount);

	const parsedAmount = parseInt(amount, 10);

	if (isNaN(parsedAmount) || parsedAmount < 200) {
		return res.status(400).json({
			success: false,
			message: 'Montant invalide. Le minimum est de 200 FCFA.',
		});
	}

	try {
		const baseUrl = process.env.PUBLIC_BASE_URL || `${req.protocol}://${req.get('host')}`;

		// Infos donateur (optionnel, depuis la session utilisateur)
		const user = req.session?.user?._doc || req.session?.user || {};
		const customer = {};
		if (user.nom || user.prenoms) {
			customer.name = [user.nom, user.prenoms || user.prenom].filter(Boolean).join(' ');
		}
		if (user.email) customer.email = user.email;
		if (user.numero) customer.phone = String(user.numero);

		const result = await geniusPay.createPayment({
			amount: parsedAmount,
			description: `Don E-Maquis — ${parsedAmount} FCFA`,
			customer: Object.keys(customer).length > 0 ? customer : undefined,
			success_url: `${baseUrl}/donate-success`,
			error_url: `${baseUrl}/donate-error`,
			metadata: {
				type: 'donation',
				donor_name: customer.name || 'Anonyme',
				donor_email: customer.email || '',
				source: 'emaquis-modal',
			},
		});

		console.log('✅ GeniusPay payment created:', result.data?.reference);

		// Retourner l'URL de checkout au frontend
		const checkoutUrl = result.data?.checkout_url || result.data?.payment_url;

		if (!checkoutUrl) {
			throw new Error('Aucune URL de checkout retournée par GeniusPay');
		}

		return res.json({
			success: true,
			checkout_url: checkoutUrl,
			reference: result.data?.reference,
		});
	} catch (error) {
		console.error('❌ GeniusPay createPayment error:', error.message);
		return res.status(500).json({
			success: false,
			message: 'Erreur lors de la création du paiement. Veuillez réessayer.',
		});
	}
};

/**
 * POST /donate/webhook
 * 
 * Reçoit les notifications de GeniusPay (payment.success, payment.failed, etc.)
 * Vérifie la signature HMAC-SHA256, puis traite l'événement.
 */
exports.donateWebhook = async (req, res) => {
	console.log('🔔 GeniusPay webhook received');

	const signature = req.headers['x-webhook-signature'];
	const timestamp = req.headers['x-webhook-timestamp'];
	const event = req.headers['x-webhook-event'];
	const environment = req.headers['x-webhook-environment'];

	const rawBody = JSON.stringify(req.body);

	// Vérifier la signature (si le secret est configuré)
	if (process.env.GENIUSPAY_WEBHOOK_SECRET && process.env.GENIUSPAY_WEBHOOK_SECRET !== 'whsec_XXXXXXXX') {
		if (!geniusPay.verifyWebhookSignature(timestamp, rawBody, signature)) {
			console.warn('⚠️ Webhook signature invalide');
			return res.status(401).json({ error: 'Invalid signature' });
		}

		if (!geniusPay.isTimestampValid(timestamp)) {
			console.warn('⚠️ Webhook timestamp trop ancien');
			return res.status(400).json({ error: 'Timestamp too old' });
		}
	}

	const payload = req.body;
	const paymentData = payload.data || {};

	console.log(`📋 Event: ${event || payload.event}`);
	console.log(`💰 Reference: ${paymentData.reference}`);
	console.log(`📊 Status: ${paymentData.status}`);
	console.log(`💵 Amount: ${paymentData.amount} ${paymentData.currency || 'XOF'}`);
	console.log(`🌍 Environment: ${environment || payload.environment}`);

	if (paymentData.metadata) {
		console.log(`📝 Metadata:`, JSON.stringify(paymentData.metadata, null, 2));
	}

	const eventType = event || payload.event;

	switch (eventType) {
		case 'payment.success':
			console.log(`✅ Don réussi ! ${paymentData.amount} FCFA — ${paymentData.customer_name || 'Anonyme'}`);
			// Ici on pourrait sauvegarder en base de données si nécessaire
			break;

		case 'payment.failed':
			console.log(`❌ Don échoué — ${paymentData.reference}`);
			break;

		case 'payment.cancelled':
			console.log(`🚫 Don annulé — ${paymentData.reference}`);
			break;

		case 'payment.expired':
			console.log(`⏰ Don expiré — ${paymentData.reference}`);
			break;

		case 'webhook.test':
			console.log('🧪 Webhook test reçu');
			break;

		default:
			console.log(`📌 Événement non géré: ${eventType}`);
	}

	// Toujours répondre 200 pour éviter que GeniusPay ne retente l'envoi
	res.status(200).json({ received: true });
};

/**
 * GET /donate-success
 * 
 * Page de succès après un don réussi. GeniusPay redirige le client ici.
 */
exports.donateSuccess = async (req, res) => {
	res.render('donateSuccess');
};

/**
 * GET /donate-error
 * 
 * Page d'erreur après un don échoué. GeniusPay redirige le client ici.
 */
exports.donateError = async (req, res) => {
	res.render('donateError');
};
