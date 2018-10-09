const express = require('express')
var User = require('./user.controller')
var router = express.Router()

const auth = require('../config/auth');
const authenticate = auth.auth;

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

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags:
 *       - User
 *     description: Return one user with id: {id}
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Find one user
 *         schema:
 *            $ref: '#/definitions/user '
 *             
 */
router.get('/:id', User.findOne)

/**
 * @swagger
 * /user/:
 *   post:
 *     tags:
 *       - User
 *     description: Create one User
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Create one user
 *         schema:
 *            $ref: '#/definitions/user '
 *             
 */
router.post('/', User.create)

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     tags:
 *       - User
 *     description: Delete the user with id: {id}
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Delete one user
 *         schema:
 *            $ref: '#/definitions/user '
 *             
 */
router.delete('/:id', User.deleteById)

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     tags:
 *       - User
 *     description: Update the user with id: {id}
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Update one user
 *         schema:
 *            $ref: '#/definitions/user '
 *             
 */
router.put('/:id', User.update)

/**
 * @swagger
 * /user/{id}/lives:
 *   get:
 *     tags:
 *       - User
 *     description: Return all the user with id: {id} lives
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Return all the user lives
 *             
 */
router.get('/:id/lives', User.findLivesByOwner)

/**
 * @swagger
 * /user/{id}/bets:
 *   get:
 *     tags:
 *       - User
 *     description: Return all the user with id: {id} bets
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Return all the user bets
 *             
 */
router.get('/:id/bets', User.findBetsByOwner)

/**
 * @swagger
 * /user/{id}/complaints/author:
 *   get:
 *     tags:
 *       - User
 *     description: Return all the user with id: {id} complaints as author
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Return all the user complaints as author
 *             
 */
router.get('/:id/complaints/author', User.findComplaintsByAuthor)

/**
 * @swagger
 * /user/{id}/complaints/author:
 *   get:
 *     tags:
 *       - User
 *     description: Return all the user with id: {id} complaints as accused
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Return all the user complaints as accused
 *             
 */
router.get('/:id/complaints/accused', User.findComplaintsByAccused)

/**
 * @swagger
 * /user/{id}/calendar:
 *   get:
 *     tags:
 *       - User
 *     description: Return the user with id: {id} calendar
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Return the user calendar
 *             
 */
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