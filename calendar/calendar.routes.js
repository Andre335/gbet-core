const express = require('express')
var Calendar = require('./calendar.controller')
var router = express.Router()

/**
 * @swagger
 * /calendar:
 *   get:
 *     tags:
 *       - Calendar
 *     description: Return all calendars
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: All calendars
 *         schema:
 *            $ref: '#/definitions/calendar '
 *             
 */
router.get('/', Calendar.findAll)

/**
 * @swagger
 * /calendar/{id}:
 *   get:
 *     tags:
 *       - Calendar
 *     description: Return one calendar with id: {id}
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Find one calendar
 *         schema:
 *            $ref: '#/definitions/calendar '
 *             
 */
router.get('/:id', Calendar.findOne)

/**
 * @swagger
 * /calendar/:
 *   post:
 *     tags:
 *       - Calendar
 *     description: Create one calendar
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Create one calendar
 *         schema:
 *              $ref: '#/definitions/calendar '
 */ 
router.post('/', Calendar.create)

/**
 * @swagger
 * /calendar/{id}:
 *   delete:
 *     tags:
 *       - Calendar
 *     description: Delete the calendar with id: {id}
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Delete one calendar
 *         schema:
 *            $ref: '#/definitions/calendar '
 *             
 */
router.delete('/:id', Calendar.deleteById)

/**
 * @swagger
 * /calendar/{id}:
 *   put:
 *     tags:
 *       - Calendar
 *     description: Update the calendar with id: {id}
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Update one calendar
 *         schema:
 *            $ref: '#/definitions/calendar '
 *             
 */
router.put('/:id', Calendar.update)

router.get('/owner/:id/favourites', Calendar.findFavouritesByOwner)

module.exports = router

/**
 * @swagger
 * definition:
 *   calendar:
 *     properties:
 *          owner:
 *              type: ObjectId
 *          favourites:
 *              type: Array of ObjectId
 */