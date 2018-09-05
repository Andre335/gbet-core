const express = require('express')
const app = express()

app.get('/viewer', function (req, res) {
    res.send('Get Viewers Request!')
})

app.get('/viewer/:id', function (req, res) {
    res.send('Get Viewer Request!')
})

app.get('/viewer/:id/denuncia', function (req, res) {
    res.send('Get User Denuncia Request!')
})

app.get('/viewer/:id/calendario', function (req, res) {
    res.send('Get Users Request!')
})