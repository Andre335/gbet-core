const express = require('express')
const app = express()

app.get('/calendario', function (req, res) {
    res.send('Get Calendarios Request!')
})

app.post('/calendario/:id', function (req, res) {
    res.send('Post Calendario Request!')
})