const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const userModel = mongoose.model('user');
const productModel = mongoose.model('product');
const orderModel = mongoose.model('order');

router.route('./user').get((req, res, next) => {
    userModel.find({}, (err, users) => {
        if(err) return res.status(500).send('Adatbázis hiba!');
        res.status(200).send(users);
    })
}).post((req, res, next) => {
    if(req.body.username && req.body.email && req.body.password) {
        userMode.findOne({username: req.body.username}, (err, user) => {
            if(err) return res.status(500).send('Adatbázis hiba!');
            if(user) {
                return res.status(400).send('Hiba, már létezik ilyen felhasználónév.');
            }
            const usr = new UserModel({username: req.body.username, password: req.body.password, email: req.body.email});
            usr.save((error) => {
                if(error) return res.status(500).send('A mentés során hiba történt.');
                return res.status(200).send('Sikeres mentés.');
            })
        })
    } else {
        return res.status(400).send('A fehasználónév, az email cím és a jelszó megadása is szükséges a regisztrációhoz.');
    }
})

/*
router.route('/example').get((req, res, next) => {
    res.status(202).send('Ez egy pelda, minden rendben.');
}).post((req, res, next) => {
    
})
*/


module.exports = router;