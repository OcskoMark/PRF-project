const express = require('express');
const mongoose = require('mongoose');

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

const app = express();

mongoose.connect('mongodb://localhost:27017/prf-project-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Hiba a MongoDB csatlakoztatása során:'));
db.once('open', function () {
    console.log('MongoDB csatlakozás sikeres!');
});

const User = require('./db/userSchema');
const Game = require('./db/gameSchema');
require('./db/bootstrapper')();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

passport.use('local', new localStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
        if (err) {
            console.log("Hiba a lekérés során!");
            return done('Hiba a lekérés során!', null);
        }
        if (!user) {
            console.log("Nincs ilyen felhasználónév!");
            return done('Nincs ilyen felhasználónév!', null);
        }
        user.comparePasswords(password, function (error, isMatch) {
            if (error) {
                console.log("Hiba a jelszó ellenőrzése során!");
                return done(error, false);
            }
            if (!isMatch) {
                console.log("Hibás jelszó!");
                return done('Hibás jelszó!', false);
            }
            return done(null, user);
        })
    })
}));
  
  
passport.serializeUser(function (user, done) {
    if (!user) {
        console.log("Nincs megadva beléptethető felhasználó!");
        return done('Nincs megadva beléptethető felhasználó!', null);
    }
    return done(null, user);
});
  
passport.deserializeUser(function (user, done) {
    if (!user) {
        console.log("Nincs felhasználó, akit kiléptethetnénk!");
        return done("Nincs felhasználó, akit kiléptethetnénk!", null);
    }
    return done(null, user);
});
  
app.use(expressSession({ secret: 'prfprojectsecretstring', resave: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log("A middleware futott!");
    next();
});

app.use('/api/users', require('./usersRouter'));
app.use('/api/games', require('./gamesRouter'));

app.listen(3000, () => {
    console.log("A szerver fut, és elérhető a http://localhost:3000 címen");
});