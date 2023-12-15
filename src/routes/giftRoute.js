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

const giftController = require('../controllers/giftController');
const jwtMiddlewares = require('../Middlewares/jwtMiddleware');
const express = require('express');
const router = express.Router();

    router
        .route('/secretSanta')
        .post(jwtMiddlewares.verifyToken, giftController.secretSanta);

module.exports = router;