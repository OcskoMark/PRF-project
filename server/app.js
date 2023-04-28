const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

const app = express();


const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback('error')
        }
    }
};

mongoose.connect('mongodb://localhost:27017/prf-project-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB kapcsolódási hiba:'));
db.once('open', function () {
    console.log('MongoDb kapcsolódás sikeres!');
});

const User = require('./db/userSchema');
const Game = require('./db/gameSchema');

require('./db/bootstrapper')();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const whiteList = ['http://localhost:4200'];

app.use(cors({
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback('error')
        }
    },
    credentials: true, methods: "GET,PUT,POST,DELETE,OPTIONS"
}));

passport.use('local', new localStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
        if (err) return done('Hiba a lekérés során!', null);
        if (!user) return done('Nincs ilyen felhasználónév!', null);
        user.comparePasswords(password, function (error, isMatch) {
            if (error) return done(error, false);
            if (!isMatch) return done('Hibás jelszó!', false);
            return done(null, user);
        });
    });
}));


passport.serializeUser(function (user, done) {
    if (!user) return done('Nincs megadva beléptethető felhasználó!', null);
    return done(null, user);
});

passport.deserializeUser(function (user, done) {
    if (!user) return done("Nincs felhasználó, akit kiléptethetnénk!", null);
    return done(null, user);
});

app.use(expressSession({ secret: 'prfproject2023server', resave: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log('A middleware futott!');
    next();
});

app.use('/api/users', require('./usersRouter'));
app.use('/api/games', require('./gamesRouter'));

app.listen(3000, () => {
  console.log('A szerver fut, és elérhető a http://localhost:3000 címen.');
});