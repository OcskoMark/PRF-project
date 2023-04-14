const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
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
    if(game.isModified('name')) {
        try {
            const dbGame = await mongoose.models["game"].findOne({name: self.name});
            if (dbGame) {
                game.invalidate("name", "A játék nevének egyedinek kell lennie!");
                return next(new Error("A játék nevének egyedinek kell lennie!"));
            }
        } catch (err) {
            return next(err);
        }
        /*
        await mongoose.models["game"].findOne({name: self.name}, function(err,game){
            if(err){
                return next(err);
            } else if (game){
                self.invalidate("name", "A játék nevének egyedinek kell lennie!");
                return next(new Error("A játék nevének egyedinek kell lennie!"));
            }
        });
        */
    }

    return next();
});


const Game = mongoose.model('game', gameSchema);

module.exports = Game;