const giftController = require('../controllers/giftController');
const jwtMiddlewares = require('../Middlewares/jwtMiddleware');
const express = require('express');
const router = express.Router();

    router
        .route('/secretSanta')
        .post(jwtMiddlewares.verifyToken, giftController.secretSanta);

module.exports = router;