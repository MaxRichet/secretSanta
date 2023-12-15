const inviteController = require('../controllers/inviteController');
const jwtMiddlewares = require('../Middlewares/jwtMiddleware');
const express = require('express');
const router = express.Router();

    router
        .route('/invite')
        .post(jwtMiddlewares.verifyToken, inviteController.createInvite);

    router
        .route('/invite/accept')
        .post(jwtMiddlewares.verifyToken, inviteController.acceptInvite)
        .post(jwtMiddlewares.verifyToken, inviteController.refuseInvite);

    router
        .route('/invite/refuse')
        .post(jwtMiddlewares.verifyToken, inviteController.refuseInvite);

module.exports = router;