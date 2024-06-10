exports.donatePage = async (req, res) => {
	const { amount } = req.body;
	console.log('🚀 ~ exports.donatePage= ~ amount:', amount);

	if (Number.isNaN(amount) || amount < 100) {
		res.redirect('/');
	} else {
    const apiKey = process.env.CINETPAY_API_KEY;
    const siteId = process.env.CINETPAY_SITE_ID;
    const mode = process.env.CINETPAY_MODE;
    const notifyUrl = process.env.CINETPAY_NOTIFY_URL;
    const returnUrl = process.env.CINETPAY_RETURN_URL;
    
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
