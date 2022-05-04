const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const port = process.env.port || 3000;

//const dbURL = 'mongodb://localhost:27017';
const dbURL = 'mongodb+srv://admin:admin@prf-cluster.l1ake.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(dbURL);

mongoose.connection.on('connected', () => {
    console.log('adatbázis csaltakoztatva');
})

mongoose.connection.on('error', (err) => {
    console.log('Hiba történt.', err);
})

require('./db.model');

/*
app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
    console.log('The server is running!');
})
*/