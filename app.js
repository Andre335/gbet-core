const express = require('express');
var bet = require('./bet/bet.routes');
var calendar = require('./calendar/calendar.routes');
var complaint = require('./complaint/complaint.routes');
var live = require('./live/live.routes');
var user = require('./user/user.routes');
var streammer = require('./user/roles/streammer/streammer.routes');
var viewer = require('./user/roles/viewer/viewer.routes');
var morgan = require('morgan');
var path = require('path');
var rfs = require('rotating-file-stream');
var fs = require('fs');
var mongoose = require('mongoose');
var cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const ENVIRON = process.env.ENVIRON || 'production';
const DBUSER = process.env.DBUSER || 'john';
const DBPASS = process.env.DBPASS || 'doe';

// mongoose.connect('mongodb://' + DBUSER + ':' + DBPASS + '@ds155292.mlab.com:55292/gbet', { useNewUrlParser: true });
// mongoose.connect('mongodb://' + 'angoncal' + ':' + 'Andre95153565' + '@ds155292.mlab.com:55292/gbet', { useNewUrlParser: true });
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var logDirectory = path.join(__dirname, 'log');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var accessLogStream = rfs('access.log', {
  interval: '1d', 
  path: logDirectory
});

app.use(morgan('combined', { stream: accessLogStream }));
app.use(cors())

app.use('/bet', bet);
app.use('/calendar', calendar);
app.use('/complaint', complaint);
app.use('/live', live);
app.use('/user', user);
app.use('/streammer', streammer);
app.use('/viewer', viewer);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.get('/', function (req, res) {
//     res.send('Hello GBet!')
// });

app.listen(PORT, () => console.log('Server started on port ' + PORT + ' and on ' + ENVIRON + ' enviroment'))

module.exports = app;