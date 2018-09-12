const express = require('express')
var User = require('../controller/user')
var router = express.Router()

router.get('/', User.findAll)

router.get('/:id', function (req, res) {
    res.send('Get User Request!')
})

router.post('/', User.create)

router.get('/:id/denuncia', function (req, res) {
    res.send('Get User Denuncia Request!')
})

router.get('/:id/calendario', function (req, res) {
    res.send('Get Users Calendario Request!')
})

module.exports = router