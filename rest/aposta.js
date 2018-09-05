const express = require('express')
const app = express()

app.get('/aposta', function (req, res) {
    res.send('Get Apostas Request!')
})

app.post('/aposta', function (req, res) {
    res.send('Post Aposta Request!')
})