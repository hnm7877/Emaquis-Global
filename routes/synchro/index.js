const express = require('express');
const usersRoute = require('./user');

const router = express.Router();

router.use('/users', usersRoute);

module.exports = router;
