/**
 * @openapi
 * tags:
 *   name: Invite
 *   description: Operations related to invitation
 */

/**
 * @openapi
 * /invite:
 *   post:
 *     summary: Create an invitation in group on an user
 *     description: Create an invitation in group on an user
 *     tags: [Invite]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               group_id:
 *                 type: array
 *               user_id:
 *                 type: string
 *               isAccept:
 *                 type: boolean
 *             required:
 *               - group_id
 *               - user_id
 *     responses:
 *       201:
 *         description: invite create successfully
 *         content:
 *           application/json:
 *             example: { message: 'invite create successfully' }
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
 * /invite/accept:
 *   post:
 *     summary: Accept an invitation
 *     description: Accept an invitation
 *     tags: [Invite]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: invite create successfully
 *         content:
 *           application/json:
 *             example: { message: 'invite create successfully' }
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
 * /invite/refuse:
 *   post:
 *     summary: Refuse an invitation
 *     description: Refuse an invitation
 *     tags: [Invite]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: invite create successfully
 *         content:
 *           application/json:
 *             example: { message: 'invite create successfully' }
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

    router
        .route('/invite/refuse')
        .post(jwtMiddlewares.verifyToken, inviteController.refuseInvite);

module.exports = router;