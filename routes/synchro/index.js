const express = require('express');
const authRoute = require('./auth');
const usersRoute = require('./users');
const productGlobalRoute = require('./productsGlobal');
const categorieRoute = require('./productsGlobal');
const employeesRoute = require('./employees');
const productsRoute = require('./products');
const appConfigRoute = require('./appConfig');
const returnProductsRoute = require('./returnProducts');
const settingRoute = require('./settings');
const stocksGlobalRoute = require('./stocksGlobal');
const stocksRoute = require('./stocks');
const ventesRoute = require('./ventes');
const bilanRoute = require('./bilan');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', usersRoute);
router.use('/products-global', productGlobalRoute);
router.use('/app-config', appConfigRoute);
router.use('/categories', categorieRoute);
router.use('/products', productsRoute);
router.use('/employees', employeesRoute);
router.use('/return-products', returnProductsRoute);
router.use('/settings', settingRoute);
router.use('/stocks-global', stocksGlobalRoute);
router.use('/stocks', stocksRoute);
router.use('/ventes', ventesRoute);
router.use('/bilan', bilanRoute);

module.exports = router;
