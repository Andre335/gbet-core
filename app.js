const express = require('express')
var bet = require('./bet/routes/bet')
var calendar = require('./calendar/routes/calendar')
var complaint = require('./complaint/routes/complaint')
var live = require('./live/routes/live')
var user = require('./user/routes/user')
var streammer = require('./user/routes/roles/streammer')
var viewer = require('./user/routes/roles/viewer')

const app = express()
app.use('/bet', bet)
app.use('/calendar', calendar)
app.use('/complaint', complaint)
app.use('/live', live)
app.use('/user', user)
app.use('/streammer', streammer)
app.use('/viewer', viewer)

app.get('/', function (req, res) {
    res.send('Hello GBet!')
})

app.listen(3000, () => console.log('Server started...'))