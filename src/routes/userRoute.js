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
 *     description: Endpoint to register a new user with an email and password.
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
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json: { message: 'Utilisateur crée: ${user.email}' }
 *       401:
 *         description: Bad request
 *         content:
 *           application/json: { message: 'Requête invalide' }
 */

/**
 * @openapi
 * /user/login:
 *   post:
 *     summary: Login as an existing user
 *     description: Endpoint to login as an existing user with an existing email and password.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: {
                        email: {
                            type: String,
                            required: true,
                            unique: true
                        },
                        password: {
                            type: String,
                            required: true
                        }
                    }
 *             type: object
 *             properties:
 *               // Define your request body properties here
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json: { token }
 *      500:
 *         description: User not found
 *         content:
 *           application/json: utilisateur non trouvé
 *      401:
 *         description: Email or password wrong
 *         content:
 *           application/json: Email ou password incorrect
 *      500:
 *         description: Eror coming during processing
 *         content:
 *           application/json: Une erreur s'est produit lors du traitement
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
 *           application/json: { message: 'Compte supprimé' }
 *       500:
 *         description: servor error
 *         content:
 *           application/json: { message: 'erreur serveur' }
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