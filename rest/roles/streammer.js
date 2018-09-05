const express = require('express')
const app = express()

app.get('/streammer', function (req, res) {
    res.send('Get Streammers Request!')
})

app.get('/streammer/:id', function (req, res) {
    res.send('Get Streammer Request!')
})

app.get('/streammer/:id/denuncia', function (req, res) {
    res.send('Get User Denuncia Request!')
})

app.get('/streammer/:id/calendario', function (req, res) {
    res.send('Get Users Request!')
})