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

async function checkUsername(user, next) {
    try {
        const dbUser = await mongoose.models["user"].findOne({username: user.username});
        if (dbUser) {
            user.invalidate("username", "A felhasználónévnek egyedinek kell lennie!");
            return next(new Error("A felhasználónévnek egyedinek kell lennie!"));
        }
    } catch (err) {
        return next(err);
    }
}

async function checkEmail(user, next) {
    try {
        const dbUser = await mongoose.models["user"].findOne({email: user.email});
        if (dbUser) {
            user.invalidate("email", "Az e-mail címnek egyedinek kell lennie!");
            return next(new Error("Az e-mail címnek egyedinek kell lennie!"));
        }
    } catch (err) {
        return next(err);
    }
}

userSchema.pre('save', function(next) {
    const user = this;
    
    if(user.isModified('username')) {
        checkUsername(user, next);
    }

    if(user.isModified('email')) {
        checkEmail(user, next);
    }
    
    if(user.isModified('password')) {
        console.log("A jelszó módosult.");
        bcrypt.genSalt(10, function(err, salt) {
            if(err) {
                console.log('Hiba a salt generálása során!');
                return next(error);
            }
            bcrypt.hash(user.password, salt, function(error, hash) {
                if(error) {
                    console.log('Hiba a hashelés során!');
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

userSchema.methods.comparePasswords = function(password, nx) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        nx(err, isMatch);
    });
};

const User = mongoose.model('user', userSchema);

module.exports = User;