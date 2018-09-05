const express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
    res.send('Get Users Request!')
})

router.get('/:id', function (req, res) {
    res.send('Get User Request!')
})

router.post('/', function (req, res) {
    console.log(req.body)
    res.send(req.body)
})

router.get('/:id/denuncia', function (req, res) {
    res.send('Get User Denuncia Request!')
})

router.get('/:id/calendario', function (req, res) {
    res.send('Get Users Calendario Request!')
})

module.exports = router
