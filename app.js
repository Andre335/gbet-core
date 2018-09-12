const express = require('express');
var bet = require('./bet/routes/bet');
var calendar = require('./calendar/routes/calendar');
var complaint = require('./complaint/routes/complaint');
var live = require('./live/routes/live');
var user = require('./user/routes/user');
var streammer = require('./user/routes/roles/streammer');
var viewer = require('./user/routes/roles/viewer');
var morgan = require('morgan');
var path = require('path');
var rfs = require('rotating-file-stream');
var fs = require('fs');
// var mongoose = require('mongoose');
// var mongoMemory = require('mongodb-memory-server');

const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const ENVIRON = process.env.ENVIRON || 'production';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var logDirectory = path.join(__dirname, 'log');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var accessLogStream = rfs('access.log', {
  interval: '1d', 
  path: logDirectory
});

app.use(morgan('combined', { stream: accessLogStream }));

// const mongoServer = mongoMemory.MongodbMemoryServer();
// mongoose.Promise = Promise;
// mongoServer.getConnectionString().then((mongoUri) => {
//     const mongooseOpts = {
//         autoReconnect: true,
//         reconnectTries: Number.MAX_VALUE,
//         reconnectInterval: 1000,
//     };
// });
// mongoose.connect(mongoUri, mongooseOpts);

// mongoose.connect('mongodb://localhost/test');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Connection error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log('Connection to the database estabilished!');
// });

app.use('/bet', bet);
app.use('/calendar', calendar);
app.use('/complaint', complaint);
app.use('/live', live);
app.use('/user', user);
app.use('/streammer', streammer);
app.use('/viewer', viewer);

app.get('/', function (req, res) {
    res.send('Hello GBet!')
});

app.listen(PORT, () => console.log('Server started on port ' + PORT + ' and on ' + ENVIRON + ' enviroment'))