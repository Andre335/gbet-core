const express = require('express')
var Bet = require('./bet.controller')
var router = express.Router()

/**
 * @swagger
 * /bet:
 *   get:
 *     tags:
 *       - Bet
 *     description: Return all bets
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: All bets
 *         schema:
 *            $ref: '#/definitions/bet '
 *             
 */
router.get('/', Bet.findAll)

/**
 * @swagger
 * /bet/{id}:
 *   get:
 *     tags:
 *       - Bet
 *     description: Return one bet with id: {id}
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Find one bet
 *         schema:
 *            $ref: '#/definitions/bet '
 *             
 */
router.get('/:id', Bet.findOne)

/**
 * @swagger
 * /bet/:
 *   post:
 *     tags:
 *       - Bet
 *     description: Create one bet
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Create one bet
 *         schema:
 *            $ref: '#/definitions/bet '
 */  
router.post('/', Bet.create)

/**
 * @swagger
 * /bet/{id}:
 *   put:
 *     tags:
 *       - Bet
 *     description: Update the bet with id: {id}
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Update one bet
 *         schema:
 *            $ref: '#/definitions/bet '
 *             
 */
router.put('/:id', Bet.update)

/**
 * @swagger
 * /bet/{id}:
 *   delete:
 *     tags:
 *       - Bet
 *     description: Delete the bet with id: {id}
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Delete one bet
 *         schema:
 *            $ref: '#/definitions/bet '
 *             
 */
router.delete('/:id', Bet.deleteById)

module.exports = router

/**
 * @swagger
 * definition:
 *   bet:
 *     properties:
 *          owner:
 *              type: ObjectId
 *          live:
 *              type: ObjectId
 *          value:
 *              type: Number
 */