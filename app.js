const express = require('express')
var bet = require('./bet/routes/bet')
var calendar = require('./calendar/routes/calendar')
var complaint = require('./complaint/routes/complaint')
var live = require('./live/routes/live')
var user = require('./user/routes/user')
var streammer = require('./user/routes/roles/streammer')
var viewer = require('./user/routes/roles/viewer')
var morgan = require('morgan')
var path = require('path')
var rfs = require('rotating-file-stream')
var fs = require('fs')

const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var logDirectory = path.join(__dirname, 'log')

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

var accessLogStream = rfs('access.log', {
  interval: '1d', 
  path: logDirectory
})

app.use(morgan('combined', { stream: accessLogStream }))

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