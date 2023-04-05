const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('user');

async function getUser(req, res, next) {
    try {
        user = await User.findById(req.params.id);
        if(user == null) {
            return res.status(404).json({ message: "A felhasználó nem található!" });
        }
    } catch (error) {
        return res.staus(500).json({ message: error.message });
    }

    res.user = user;
    next();
}

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        return res.staus(500).json({ message: error.message });
    }
});

router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});

router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        accessLevel: req.body.accessLevel,
        registrationDate: new Date(),
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.patch('/:id', getUser, async (req, res) => {
    if (req.body.username != null) {
        res.user.username = req.body.username;
    }
    if (req.body.password != null) {
        res.user.password = req.body.password;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    if (req.body.accessLevel != null) {
        res.user.accessLevel = req.body.accessLevel;
    }

    try {
        const updateUser = await res.user.save();
        res.json(updateUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: "A felhasználó törlése sikerült!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;