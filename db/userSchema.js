const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    accessLevel: {
        type: Number,
        required: true,
        default: 1,
    },
    registrationDate: {
        type: Date,
        required: true,
    },
});

userSchema.pre('save', function(next) {
    const user = this;
    if(user.isModified('password')) {
        bcrypt.genSalt(20, function(err, salt) {
            if(err) {
                console.log("Hiba a salt generálása során.");
                return next(error);
            }
            bcrypt.hash(user.password, salt, function(error, hash) {
                if(error) {
                    console.log("Hiba a hashelés során.");
                    return next(error);
                }
                user.password = hash;
                return next();
            });
        });
    } else {
        return next();
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;