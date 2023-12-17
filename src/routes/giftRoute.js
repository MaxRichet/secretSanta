/**
 * @openapi
 * tags:
 *   name: Gift
 *   description: Operations related to gift
 */

/**
 * @openapi
 * /secretSanta:
 *   post:
 *     summary: Generate the secret santa duets
 *     description: Generate the secret santa duets randomly
 *     tags: [Gift]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               gift:
 *                 type: array
 *               group_id:
 *                 type: string
 *             required:
 *               - gift
 *               - group_id
 *     responses:
 *       201:
 *         description: Secret santa generates successfully
 *         content:
 *           application/json:
 *             example: { message: 'Secret santa generates successfully' }
 *       403:
 *         description: Missing token
 *         content:
 *           application/json:
 *             example: { message: 'Missing token' }
 *       500:
 *         description: Servor error
 *         content:
 *           application/json: Servor error
 */

/**
 * @openapi
 * /adminList:
 *   get:
 *     summary: Give the group list
 *     description: Give the group list if its admin
 *     tags: [Gift]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Admin list OK
 *         content:
 *           application/json:
 *             example: { message: 'The list of all group' }
 *       403:
 *         description: Missing token
 *         content:
 *           application/json:
 *             example: { message: 'Missing token' }
 *       500:
 *         description: Servor error
 *         content:
 *           application/json: Servor error
 */

/**
 * @openapi
 * /findMyReceiver:
 *   get:
 *     summary: Give your receiver
 *     description: Give your receiver
 *     tags: [Gift]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Your receiver
 *         content:
 *           application/json:
 *             example: { message: 'Your receiver' }
 *       403:
 *         description: Missing token
 *         content:
 *           application/json:
 *             example: { message: 'Missing token' }
 *       500:
 *         description: Servor error
 *         content:
 *           application/json: Servor error
 */

const giftController = require('../controllers/giftController');
const jwtMiddlewares = require('../Middlewares/jwtMiddleware');
const express = require('express');
const router = express.Router();

    router
        .route('/secretSanta')
        .post(jwtMiddlewares.verifyToken, giftController.secretSanta);

    router
        .route('/adminList')
        .get(jwtMiddlewares.verifyToken, giftController.adminList);

    router
        .route('/findMyReceiver')
        .get(jwtMiddlewares.verifyToken, giftController.findMyReceiver);

module.exports = router;