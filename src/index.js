const express = require('express');
const router = express.Router();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//const passport = reqiure('passport');
//const localStrategy = require('passport-local').Strategy;
//const expressSession = require('express-session');

const app = express();

app.use(cors());

app.use('/', require('./routes'));

const port = process.env.port || 3000;

const dbURL = 'mongodb+srv://admin:admin@prf-cluster.l1ake.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(dbURL);

mongoose.connection.on('connected', () => {
    console.log('adatbázis csaltakoztatva');
})

mongoose.connection.on('error', (err) => {
    console.log('Hiba történt.', err);
})

mongoose.model('user', require('./user.model'));

/*
require('./user.models');
require('./product.models');
require('./order.models');
*/

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({}));

/*
app.use(expressSession({secret: 'prf2022beadando', resave: true}));
app.use(passport.initialize());
app.use(passport.session());
*/

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
    console.log('The server is running!');
})
