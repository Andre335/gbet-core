const express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
    res.send('Get Lives Request!')
})

router.get('/:id', function (req, res) {
    res.send('Get Live Request!')
})

router.get('/:id/aposta', function (req, res) {
    res.send('Get Aposta from Live Request!')
})

router.post('/', function (req, res) {
    res.send('Post Live Request!')
})

module.exports = router