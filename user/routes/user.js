const express = require('express')
var User = require('../user.controller')
var router = express.Router()

/**
 * @swagger
 * resourcePath: /api
 * description: All about API
 */
 
/**
 * @swagger
 * path: /user
 * operations:
 *   -  httpMethod: GET
 *      summary: Return all users
 *      responseClass: [User]
 *      consumes: 
 *        - application/json
 *      produces:
 *        - application/json
 *      parameters:
 *        - in: body
 *          name: getUsers
 *          schema:
 *              type: Object
 *              required:
 *                  - firstName
 *                  - lastName
 *                  - email
 *                  - role
 *              properties:
 *                  firstName:
 *                      type: string
 *                  lastName:
 *                      type: string
 *                  role:
 *                      type: string
 *                  email:
 *                      type: string
 *                  dateOfBirth:
 *                      type: date
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