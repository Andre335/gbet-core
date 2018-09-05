const express = require('express')
const app = express()

app.get('/user', function (req, res) {
    res.send('Get Users Request!')
})

app.get('/user/:id', function (req, res) {
    res.send('Get User Request!')
})

app.post('/user', function (req, res) {
    res.send('Post User Request!')
})

app.get('/user/:id/denuncia', function (req, res) {
    res.send('Get User Denuncia Request!')
})

app.get('/user/:id/calendario', function (req, res) {
    res.send('Get Users Request!')
})