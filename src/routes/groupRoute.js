/**
 * @openapi
 * tags:
 *   name: Group
 *   description: Operations related to group
 */

/**
 * @openapi
 * /group/createGroup:
 *   post:
 *     summary: Create a group
 *     description: create a group and give a group token
 *     tags: [Group]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               admin_id:
 *                 type: string
 *               members_id:
 *                 type: array
 *             required:
 *               - admin_id
 *     responses:
 *       201:
 *         description: Group create successfully
 *         content:
 *           application/json:
 *             example: { message: 'Group create successfully' }
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

const groupController = require('../controllers/groupController');
const jwtMiddlewares = require('../Middlewares/jwtMiddleware');
const express = require('express');
const router = express.Router();

    router
        .route('/group')
        .post(jwtMiddlewares.verifyToken, groupController.createGroup);

module.exports = router;