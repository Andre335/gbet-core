const express = require('express')
var Complaint = require('./complaint.controller')
var router = express.Router()

router.get('/', Complaint.findAll)

router.get('/:id', Complaint.findOne)

router.post('/', Complaint.create)

router.delete('/:id', Complaint.deleteById)

router.put('/:id', Complaint.update)

module.exports = router