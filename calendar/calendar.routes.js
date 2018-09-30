const express = require('express')
var Calendar = require('./calendar.controller')
var router = express.Router()

router.get('/', Calendar.findAll)

router.get('/:id', Calendar.findOne)

router.post('/', Calendar.create)

router.delete('/:id', Calendar.deleteById)

router.put('/:id', Calendar.update)

module.exports = router