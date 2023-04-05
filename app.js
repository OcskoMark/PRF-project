const express = require('express');
const mongoose = require('mongoose');

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
require('./db/bootstrapper')();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
    console.log("A middleware futott!");
    next();
});

app.use('/api/users', require('./usersRouter'))

app.listen(3000, () => {
    console.log("A szerver fut, és elérhető a http://localhost:3000 címen");
});