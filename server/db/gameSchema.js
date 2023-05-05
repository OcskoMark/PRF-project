const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    genre: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    priceString: {
        type: String,
        required: true,
    },
    sum: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    releaseDateString: {
        type: String,
        required: true,
    },
});


gameSchema.pre('save', function(next) {
    const game = this;
    
    if (game.isModified('price')) {
        if (game.price > 1000) {
            thousands = parseInt(game.price / 1000);
            hundres = game.price % 1000;
            game.priceString = thousands.toString() + ' ' + hundres;
        } else {
            game.priceString = game.price.toString();
        }
    }

    if (game.isModified('releaseDate')) {
        const year = game.releaseDate.getFullYear();
        const month = (game.releaseDate.getMonth() + 1) < 10 ? '0' + (game.releaseDate.getMonth() + 1) : (game.releaseDate.getMonth() + 1);
        const day = game.releaseDate.getDate() < 10 ? '0' + game.releaseDate.getDate() : game.releaseDate.getDate();
        game.releaseDateString = year + '-' + month + '-' + day;
    }

    return next();

});

const Game = mongoose.model('game', gameSchema);

module.exports = Game;