const express = require('express')
const app = express()

app.get('/live', function (req, res) {
    res.send('Get Lives Request!')
})

app.get('/live/:id', function (req, res) {
    res.send('Get Live Request!')
})

app.get('/live/:id/aposta', function (req, res) {
    res.send('Get Aposta from Live Request!')
})

app.post('/live', function (req, res) {
    res.send('Post Live Request!')
})