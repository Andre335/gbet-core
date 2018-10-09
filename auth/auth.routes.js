var express = require('express');
var router = express.Router();
var auth = require('../auth/auth.controller');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Login on the system
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *        - in: body
 *          name: user
 *          schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *      201:
 *       description: Logged In
 *       schema:
 *            $ref: '#/definitions/authentication'
 */
router.post('/login', auth.login);


/**
 * @swagger
 * /auth/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Logout from system
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *      201:
 *       description: Loged Out
 *       schema:
 *            $ref: '#/definitions/authentication'
 */
router.post('/logout', auth.logOut);

module.exports = router;

/**
 * @swagger
 * definition:
 *   authentication:
 *     properties:
 *          email:
 *              type: string
 *          password:
 *              type: string
 */