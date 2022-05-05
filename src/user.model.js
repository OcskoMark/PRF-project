const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    admin: {type: Boolean, required: true}
}, {collection: 'user'});

userSchema.pre('save', function(next) {
    const user = this;
    if(user.isModified('username')) {
        user.admin = false;
    }
    if(user.isModified('password')) {
        bcyrpt.genSalt(10, function(err, salt) {
            if(error) {
                console.log('Hiba a salt generálása során.');
                return next(error);
            }
            bcrypt.hash(user.password, salt, function(error, hash) {
                if (error) {
                    console.log('Hiba történt a hashelés során.');
                    return next(error);
                }
                user.password = hash;
                return next();
            })
        })
    } else {
        return next();
    }
})

//module.exports = userSchema;

mongoose.model('user', userSchema);