const express = require('express')
const app = express()

app.get('/denuncia', function (req, res) {
    res.send('Get Denuncias Request!')
})

app.post('/denuncia/:id', function (req, res) {
    res.send('Post Denuncia Request!')
})