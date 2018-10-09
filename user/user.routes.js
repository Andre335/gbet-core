const express = require('express')
var User = require('./user.controller')
var router = express.Router()

/**
 * @swagger
 * /user:
 *   get:
 *     tags:
 *       - User
 *     description: Return all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: All users
 *         schema:
 *            $ref: '#/definitions/user '
 *             
 */
router.get('/', User.findAll)

router.get('/:id', User.findOne)

router.post('/', User.create)

router.delete('/:id', User.deleteById)

router.put('/:id', User.update)

router.get('/:id/lives', User.findLivesByOwner)

router.get('/:id/bets', User.findBetsByOwner)

router.get('/:id/complaints/author', User.findComplaintsByAuthor)

router.get('/:id/complaints/accused', User.findComplaintsByAccused)

router.get('/:id/calendar', User.findCalendarByOwner)

module.exports = router

/**
 * @swagger
 * definition:
 *   user:
 *     properties:
 *          firstName:
 *              type: string
 *          lastName:
 *              type: string
 *          role:
 *              type: string
 *          email:
 *              type: string
 *          dateOfBirth:
 *              type: date
 *          banned:
 *              type: boolean
 */