const express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
    res.send('Get Viewers Request!')
})

router.get('/:id', function (req, res) {
    res.send('Get Viewer Request!')
})

router.get('/:id/denuncia', function (req, res) {
    res.send('Get User Denuncia Request!')
})

router.get('/:id/calendario', function (req, res) {
    res.send('Get Viewer Calendario Request!')
})

module.exports = router