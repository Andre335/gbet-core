const express = require('express')
var Viewer = require('./viewer.controller')
var router = express.Router()

/**
 * @swagger
 * /viewer:
 *   get:
 *     tags:
 *       - Viewer
 *     description: Return all viewers
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: All viewers
 *         schema:
 *            $ref: '#/definitions/viewer '
 *             
 */
router.get('/', Viewer.findAll)

/**
 * @swagger
 * /viewer/{id}:
 *   get:
 *     tags:
 *       - Viewer
 *     description: Return one viewer with id: {id}
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Find one viewer
 *         schema:
 *            $ref: '#/definitions/viewer '
 *             
 */
router.get('/:id', Viewer.findOne)

/**
 * @swagger
 * /viewer/:
 *   post:
 *     tags:
 *       - Viewer
 *     description: Create one viewer
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Create one viewer
 *         schema:
 *            $ref: '#/definitions/viewer '
 *             
 */
router.post('/', Viewer.create)

/**
 * @swagger
 * /viewer/{id}:
 *   delete:
 *     tags:
 *       - Viewer
 *     description: Delete the viewer with id: {id}
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Delete one viewer
 *         schema:
 *            $ref: '#/definitions/viewer '
 *             
 */
router.delete('/:id', Viewer.deleteById)

/**
 * @swagger
 * /viewer/{id}:
 *   put:
 *     tags:
 *       - Viewer
 *     description: Update the viewer with id: {id}
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Update one viewer
 *         schema:
 *            $ref: '#/definitions/viewer '
 *             
 */
router.put('/:id', Viewer.update)

module.exports = router

/**
 * @swagger
 * definition:
 *   viewer:
 *     properties:
 *          user_id:
 *              type: ObjectId
 *          favourite_lives:
 *              type: Array of ObjectId
 *          favourite_streammers:
 *              type: Array of ObjectId
 *          bets:
 *              type: Array of ObjectId
 */