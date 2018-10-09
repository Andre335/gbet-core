const express = require('express')
var Complaint = require('./complaint.controller')
var router = express.Router()

/**
 * @swagger
 * /complaint:
 *   get:
 *     tags:
 *       - Complaint
 *     description: Return all complaints
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: All complaints
 *         schema:
 *            $ref: '#/definitions/complaint '
 *             
 */
router.get('/', Complaint.findAll)

/**
 * @swagger
 * /complaint/{id}:
 *   get:
 *     tags:
 *       - Complaint
 *     description: Return one complaint with id: {id}
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Find one complaint
 *         schema:
 *            $ref: '#/definitions/complaint '
 *             
 */
router.get('/:id', Complaint.findOne)

/**
 * @swagger
 * /complaint/:
 *   post:
 *     tags:
 *       - Complaint
 *     description: Create one complaint
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Create one complaint
 *         schema:
 *              $ref: '#/definitions/complaint '
 */  
router.post('/', Complaint.create)

/**
 * @swagger
 * /complaint/{id}:
 *   delete:
 *     tags:
 *       - Complaint
 *     description: Delete the complaint with id: {id}
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Delete one complaint
 *         schema:
 *            $ref: '#/definitions/complaint '
 *             
 */
router.delete('/:id', Complaint.deleteById)

/**
 * @swagger
 * /complaint/{id}:
 *   put:
 *     tags:
 *       - Complaint
 *     description: Update the complaint with id: {id}
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         content: 
 *            -application/json:
 *         description: Update one complaint
 *         schema:
 *            $ref: '#/definitions/complaint '
 *             
 */
router.put('/:id', Complaint.update)

module.exports = router

/**
 * @swagger
 * definition:
 *   complaint:
 *     properties:
 *          author:
 *              type: ObjectId
 *          accused:
 *              type: ObjectId
 *          title:
 *              type: String
 *          description:
 *              type: String
 *          date:
 *              type: Date
 */