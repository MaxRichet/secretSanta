const groupController = require('../controllers/groupController');
const jwtMiddlewares = require('../Middlewares/jwtMiddleware');
const express = require('express');
const router = express.Router();

    router
        .route('/group')
        .post(jwtMiddlewares.verifyToken, groupController.createGroup);

module.exports = router;