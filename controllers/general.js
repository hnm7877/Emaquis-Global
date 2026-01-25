const { userQueries } = require("../requests/UserQueries");
const { venteQueries } = require("../requests/venteQueries");
const app_configModel = require("../models/app_config.model");

exports.index = async (req, res) => {

    try {
        const [maquisCount, totalVentes, config] = await Promise.all([
            userQueries.getCounts(),
            venteQueries.getCounts(),
            app_configModel.findOne({})
        ]);
        res.render('landing', {maquisCount,totalVentes})
    } catch (e) {
        console.log('err', e);
        res.redirect(e)
    }

};

exports.indexPost = async (req, res) => {

    try {
        res.render('landing')

    } catch (e) {
        console.log('err', e);
        res.redirect(e)
    }

};



