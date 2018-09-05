const express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
    res.send('Get Calendarios Request!')
})

router.post('/:id', function (req, res) {
    res.send('Post Calendario Request!')
})

module.exports = router