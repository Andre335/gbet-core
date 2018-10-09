const express = require('express')
var Live = require('./live.controller')
var router = express.Router()

/**
 * @swagger
 * /live:
 *   get:
 *     tags:
 *       - Live
 *     description: Return all lives
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: All lives
 *         schema:
 *            $ref: '#/definitions/live '
 *             
 */
router.get('/', Live.findAll)

/**
 * @swagger
 * /live/{id}:
 *   get:
 *     tags:
 *       - Live
 *     description: Return one live with id: {id}
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Find one live
 *         schema:
 *            $ref: '#/definitions/live '
 *             
 */
router.get('/:id', Live.findOne)

/**
 * @swagger
 * /live/:
 *   post:
 *     tags:
 *       - Live
 *     description: Create one live
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Create one live
 *         schema:
 *            $ref: '#/definitions/live '
 */    
router.post('/', Live.create)

/**
 * @swagger
 * /live/{id}:
 *   delete:
 *     tags:
 *       - Live
 *     description: Delete the live with id: {id}
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Delete one live
 *         schema:
 *            $ref: '#/definitions/live '
 *             
 */
router.delete('/:id', Live.deleteById)

/**
 * @swagger
 * /live/{id}:
 *   put:
 *     tags:
 *       - Live
 *     description: Update the live with id: {id}
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Update one live
 *         schema:
 *            $ref: '#/definitions/live '
 *             
 */
router.put('/:id', Live.update)

/**
 * @swagger
 * /live/{id}/bets:
 *   get:
 *     tags:
 *       - Live
 *     description: Return all the live with id: {id} bets
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Return all the live bets
 *             
 */
router.get('/:id/bets', Live.findBetsByLive)

module.exports = router

/**
 * @swagger
 * definition:
 *   live:
 *     properties:
 *          owner:
 *              type: ObjectId
 *          title:
 *              type: string
 *          description:
 *              type: string
 *          email:
 *              type: string
 *          date:
 *              type: date
 */