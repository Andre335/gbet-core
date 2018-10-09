const express = require('express')
var Streammer = require('./streammer.controller')
var router = express.Router()

/**
 * @swagger
 * /streammer:
 *   get:
 *     tags:
 *       - Streammer
 *     description: Return all streammers
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: All streammers
 *         schema:
 *            $ref: '#/definitions/streammer '
 *             
 */
router.get('/', Streammer.findAll)

/**
 * @swagger
 * /streammer/{id}:
 *   get:
 *     tags:
 *       - Streammer
 *     description: Return one streammer with id: {id}
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Find one streammer
 *         schema:
 *            $ref: '#/definitions/streammer '
 *             
 */
router.get('/:id', Streammer.findOne)

/**
 * @swagger
 * /streammer/:
 *   post:
 *     tags:
 *       - Streammer
 *     description: Create one streammer
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Create one streammer
 *         schema:
 *            $ref: '#/definitions/streammer '
 *             
 */
router.post('/', Streammer.create)

/**
 * @swagger
 * /streammer/{id}:
 *   delete:
 *     tags:
 *       - Streammer
 *     description: Delete the streammer with id: {id}
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Delete one streammer
 *         schema:
 *            $ref: '#/definitions/streammer '
 *             
 */
router.delete('/:id', Streammer.deleteById)

/**
 * @swagger
 * /streammer/{id}:
 *   put:
 *     tags:
 *       - Streammer
 *     description: Update the streammer with id: {id}
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Update one streammer
 *         schema:
 *            $ref: '#/definitions/streammer '
 *             
 */
router.put('/:id', Streammer.update)

module.exports = router

/**
 * @swagger
 * definition:
 *   streammer:
 *     properties:
 *          user_id:
 *              type: ObjectId
 *          lives:
 *              type: Array of ObjectId
 */