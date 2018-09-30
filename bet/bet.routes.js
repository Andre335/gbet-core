const express = require('express')
var Bet = require('./bet.controller')
var router = express.Router()

router.get('/', Bet.findAll)

router.get('/:id', Bet.findOne)

router.post('/', Bet.create)

router.put('/:id', Bet.update)

router.delete('/:id', Bet.deleteById)

module.exports = router