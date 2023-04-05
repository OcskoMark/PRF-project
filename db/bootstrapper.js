const mongoose = require('mongoose');
const User = mongoose.model('user');

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

module.exports = ensureUsersExists;