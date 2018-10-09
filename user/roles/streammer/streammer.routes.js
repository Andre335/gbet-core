const express = require('express')
var Streammer = require('./streammer.controller')
var router = express.Router()

router.get('/', Streammer.findAll)

router.get('/:id', Streammer.findOne)

router.post('/', Streammer.create)

router.delete('/:id', Streammer.deleteById)

router.put('/:id', Streammer.update)

module.exports = router