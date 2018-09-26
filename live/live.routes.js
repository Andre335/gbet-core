const express = require('express')
var Live = require('./live.controller')
var router = express.Router()

router.get('/', Live.findAll)

router.get('/:id', Live.findOne)

router.post('/', Live.create)

router.delete('/:id', Live.deleteById)

router.put('/:id', Live.update)

router.get('/:id/aposta', function (req, res) {
    res.send('Get Aposta from Live Request!')
})

module.exports = router