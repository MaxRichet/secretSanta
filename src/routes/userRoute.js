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
 *     description: Endpoint to register a new user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define your request body properties here
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example: { message: 'User registered successfully' }
 */

/**
 * @openapi
 * /user/login:
 *   post:
 *     summary: Login as an existing user
 *     description: Endpoint to login as an existing user.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define your request body properties here
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             example: { token: 'JWT_TOKEN_HERE' }
 */

/**
 * @openapi
 * /user:
 *   delete:
 *     summary: Delete a user account
 *     description: Endpoint to delete a user account.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User account deleted successfully
 *         content:
 *           application/json:
 *             example: { message: 'User account deleted successfully' }
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
        .route('/user')
        .delete(jwtMiddlewares.verifyToken, userController.userDelete);

module.exports = router;