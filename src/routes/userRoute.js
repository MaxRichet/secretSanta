const express = require('express');
const router = express.Router();
/**
 * @openapi
 * tags:
 *   name: Users
 *   description: Operations related to users
 */

/**
 * @openapi
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     description: Endpoint to register a new user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               exist:
 *                 type: boolean
 *             required:
 *               - email
 *               - password
 *               - exist
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example: { message: 'User created successfully' }
 *       401:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example: { message: 'Bad request' }
 */


/**
 * @openapi
 * /user/login:
 *   post:
 *     summary: Login as an existing user
 *     description: Endpoint to login as an existing user with an   * existing email and password.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             example: { message: 'User logged in successfully' }
 *       401:
 *         description: Email or password wrong
 *         content:
 *           application/json:
 *             example: { message: 'Email or password wrong' }
 *       500:
 *         description: User not found
 *         content:
 *           application/json: User not found
 */

/**
 * @openapi
 * /user/delete:
 *   delete:
 *     summary: Delete a user account
 *     description: Endpoint to login as an existing user with an existing email and password.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             example: { message: 'User logged in successfully' }
 *       500:
 *         description: servor error
 *         content:
 *           application/json: servor error
 */

const userController = require('../controllers/userController');
const jwtMiddlewares = require('../Middlewares/jwtMiddleware');

    router
        .route('/user/register')
        .post(userController.userRegister);

    router
        .route('/user/login')
        .post(userController.userLogin);
    
    router
        .route('/user/delete')
        .delete(jwtMiddlewares.verifyToken, userController.userDelete);

module.exports = router;