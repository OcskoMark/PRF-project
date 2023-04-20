const mongoose = require('mongoose');
const User = mongoose.model('user');
const Game = mongoose.model('game');

async function ensureAdminExists() {
    try {
        const admin = await User.findOne({accessLevel: 3});
        if (admin) {
            console.log('Már van admin felhasználó az adatbázisban!')
        } else {
            const newAdmin = new User({
                username: "gipsz.jakab",
                password: "gipsz.jakab.123",
                email: "gipsz.jakab@prf.hu",
                accessLevel: 3,
                registrationDate: new Date(),
            });
            await newAdmin.save();
            console.log("Az admin felhasználó sikeresen létrehozva.");
        }
    } catch (error) {
        console.error("Hiba történt az admin user ellenőrzése vagy létrehozása közben: ", error);
    }
}

async function ensureUserExists() {
    try{
        const user = await User.findOne({accessLevel: 1});
        if (user) {
            console.log("Már van alap jogosultságokkal rendelkező felhasználó az adatbázisan!");
        } else {
            const newUser = new User({
                username: "csak.anyos",
                password: "csak.anyos.123",
                email: "csak.anyos@prf.hu",
                accessLevel: 1,
                registrationDate: new Date(),
            });
            await newUser.save();
            console.log("Az alap jogosultságokkal rendelkező felhasználó létrehozva.");
        }
    } catch (error) {
        console.log("Hiba történt az alap felhasználó ellenőrzése vagy létrehozása közben: ", error)
    }
}

async function ensureUsersExists() {
    ensureAdminExists();
    ensureUserExists();
}

async function ensureSportGameExists() {
    try {
        const game = await Game.findOne({genre: "sport"});
        if (game) {
            console.log("Már van sportjáték az adatbázisban!");
        } else {
            const newGame = new Game({
                name: "FIFA 23",
                genre: "sport",
                price: 18990,
                sum: "A népszerű FIFA sorozat 2022/2023-as kiadása.",
                releaseDate: "2022-09-27",
            });
            await newGame.save();
            console.log("A sportjáték sikeresen hozzáadva az adatbázishoz.");
        }
    } catch (error) {
        console.log("Hiba történt a sportjáték beszúrása közben.");
        console.log(error);
    }
}

async function ensureRaceGameExists() {
    try {
        const game = await Game.findOne({genre: "autóverseny"});
        if (game) {
            console.log("Már van autóverseny az adatbázisban!");
        } else {
            const newGame = new Game({
                name: "F1 22",
                genre: "autóverseny",
                price: 15990,
                sum: "A népszerű F1 sorozat 2022-es kiadása.",
                releaseDate: "2022-06-28",
            });
            await newGame.save();
            console.log("Az autóverseny játék sikeresen hozzáadva az adatbázishoz.");
        }
    } catch (error) {
        console.log("Hiba történt az autóverseny játék beszúrása közben.");
        console.log(error);
    }
}

async function ensureStrategyGameExists() {
    try {
        const game = await Game.findOne({genre: "stratégia"});
        if (game) {
            console.log("Már van stratégiai játék az adatbázisban!");
        } else {
            const newGame = new Game({
                name: "Imperium Galactica 2",
                genre: "stratégia",
                price: 1990,
                sum: "A méltán híres magyar fejlesztésű űrstratégiai játék.",
                releaseDate: "1999-12-01",
            });
            await newGame.save();
            console.log("A stratégiai játék sikeresen hozzáadva az adatbázishoz.");
        }
    } catch (error) {
        console.log("Hiba történt a stratégiai játék beszúrása közben.");
        console.log(error);
    }
}

async function ensureGamesExists() {
    ensureSportGameExists();
    ensureRaceGameExists();
    ensureStrategyGameExists();
}

async function ensureDatasExists() {
    ensureUsersExists();
    ensureGamesExists();
}

module.exports = ensureDatasExists;