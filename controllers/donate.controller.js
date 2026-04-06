exports.donatePage = async (req, res) => {
	const { amount } = req.body;
	console.log('🚀 ~ exports.donatePage= ~ amount:', amount);

	if (Number.isNaN(amount) || amount < 100) {
		res.redirect('/');
	} else {
    const apiKey = process.env.CINETPAY_API_KEY || '212203080763d5904661eff5.58954293';
    const siteId = process.env.CINETPAY_SITE_ID || '397031';
    const mode = 'PRODUCTION';
    const baseUrl = res.locals.publicBaseUrl || process.env.PUBLIC_BASE_URL || `${req.protocol}://${req.get('host')}`;
    const notifyUrl = `${baseUrl}/donate/webhook`;
    const returnUrl = `${baseUrl}/donate-success`;
    
		res.render('donate', {
			amount: Number(amount),
			apiKey,
      siteId,
      mode,
      notifyUrl,
      returnUrl,
		});
	}
};

exports.donateWebhook = async (req, res) => {
	console.log('webhook called');
	console.log(JSON.stringify(req.body, null, 2));
	res.status(200).send('OK');
};

exports.donateSuccess = async (req, res) => {
	res.render('donateSuccess');
};

exports.donateError = async (req, res) => {
	res.render('donateError');
};
