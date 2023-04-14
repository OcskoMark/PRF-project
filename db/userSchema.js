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

userSchema.pre('save', async function(next) {
    const user = this;
    if(user.isModified('password')) {
        bcrypt.genSalt(20, function(err, salt) {
            if(err) {
                console.log("Hiba a salt generálása során.");
                return next(error);
            }
            bcrypt.hash(self.password, salt, function(error, hash) {
                if(error) {
                    console.log("Hiba a hashelés során.");
                    return next(error);
                }
                self.password = hash;
                //return next();
            });
        });
    } else {
        //return next();
    }

    if(user.isModified('username')) {
        try {
            const dbUser = await mongoose.models["user"].findOne({username: user.username});
            if (dbUser) {
                user.invalidate("username", "A felhasználónévnek egyedinek kell lennie!");
                return next(new Error("A felhasználónévnek egyedinek kell lennie!"));
            }
        } catch (err) {
            return next(err);
        }
        
        /*
        await mongoose.models["user"].findOne({username: self.username}, function(err, user) {
            if(err) {
                return next(err);
            } else if(user) {
                self.invalidate("username", "A felhasználónévnek egyedinek kell lennie!");
                return next(new Error("A felhasználónévnek egyedinek kell lennie!"));
            } else {
                //return next();
            }
        });
        */
        //next();
    }

    if(user.isModified('email')) {
        try {
            const dbUser = await mongoose.models["user"].findOne({email: self.email});
            if (dbUser) {
                user.invalidate("email", "Az e-mail címnek egyedinek kell lennie!");
                return next(new Error("Az e-mail címnek egyedinek kell lennie!"));
            }
        } catch (err) {
            return next(err);
        }
        /*
        await mongoose.models["user"].findOne({email: self.email}, function(err, user) {
            if(err) {
                return next(err);
            } else if(user) {
                self.invalidate("email", "Az e-mail címnek egyedinek kell lennie!");
                return next(new Error("Az e-mail címnek egyedinek kell lennie!"));
            } else {
                //return next();
            }
        });
        */
        //next();
    }

    return next();
});

userSchema.methods.comparePasswords = function(password, nx) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        nx(err, isMatch);
    });
};

const User = mongoose.model('user', userSchema);

module.exports = User;