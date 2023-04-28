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
    sum: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
});


gameSchema.pre('save', async function (next) {
    const game = this;
    if(game.isModified('title')) {
        try {
            const dbGame = await mongoose.models["game"].findOne({title: game.title});
            if (dbGame) {
                game.invalidate("title", "A játék címének egyedinek kell lennie!");
                return next(new Error("A játék címének egyedinek kell lennie!"));
            }
        } catch (err) {
            return next(err);
        }
    }
    return next();
});


const Game = mongoose.model('game', gameSchema);

module.exports = Game;