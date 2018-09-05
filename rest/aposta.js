const express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
    res.send('Get Apostas Request!')
})

router.post('/', function (req, res) {
    res.send('Post Aposta Request!')
})

module.exports = router