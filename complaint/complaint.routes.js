const express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
    res.send('Get Denuncias Request!')
})

router.post('/:id', function (req, res) {
    res.send('Post Denuncia Request!')
})

module.exports = router