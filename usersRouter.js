const express = require('express');
const usersRouter = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('user');

const passport = require('passport');

usersRouter.route('/login').post((req, res, next) => {
    if (req.body.username, req.body.password) {
        passport.authenticate('local', function (error, user) {
            if (error) {
                console.log(error);
                return res.status(500).send(error);
            }
            req.login(user, function (error) {
                if (error) {
                    console.log(error);
                    return res.status(500).send(error);
                }
                console.log("Sikeres bejelentkezés!");
                return res.status(200).send('Sikeres bejelentkezés!');
            })
        })(req, res);
    } else {
        console.log("Hibás kérés, a felhasználónév és a jelszó megadása kötelező!");
        return res.status(400).send('Hibás kérés, a felhasználónév és a jelszó megadása kötelező!');
    }
});
  
usersRouter.route('/logout').post((req, res, next) => {
    if (req.isAuthenticated()) {
        req.logout((err) => {
            if(err) {
                console.log("Hiba a kijelentkezés során!");
                return res.status(500).send(err)
            }
            console.log("Sikeres kijelentkezés!");
            return res.status(200).send('Kijelentkezés sikeres!');
        });
    } else {
        console.log("Nem is volt bejelentkezve!");
        return res.status(403).send('Nem is volt bejelentkezve!');
    }
});

usersRouter.route('/status').get((req, res, next) => {
    if (req.isAuthenticated()) {
        console.log(req.user)
        return res.status(200).send(req.user);
    } else {
        console.log("Nem is volt bejelentkezve!");
        return res.status(403).send('Nem is volt bejelentkezve!');
    }
});

async function getUser(req, res, next) {
    try {
        user = await User.findById(req.params.id);
        if(user == null) {
            return res.status(404).json({ message: "A felhasználó nem található!" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.user = user;
    next();
}

usersRouter.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        return res.staus(500).json({ message: error.message });
    }
});

usersRouter.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});

usersRouter.post('/', async (req, res) => {
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

usersRouter.patch('/:id', getUser, async (req, res) => {
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

usersRouter.delete('/:id', getUser, async (req, res) => {
    try {
      await res.user.remove();
      res.json({ message: 'A felhasználó sikeresen törölve!' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = usersRouter;