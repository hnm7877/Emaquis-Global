const { userQueries } = require("../requests/UserQueries");
const { venteQueries } = require("../requests/venteQueries");
const app_configModel = require("../models/app_config.model");

exports.index = async (req, res) => {

    try {
        const maquisCount = await userQueries.getCounts();
        const totalVentes = await venteQueries.getCounts();
        const config = await app_configModel.findOne({});
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



