const express = require('express');
const gamesRouter = express.Router();
const mongoose = require('mongoose');
const Game = mongoose.model('game');

async function getGame(req, res, next) {
    try {
        game = await Game.findById(req.params.id);
        if(game == null) {
            return res.status(404).json({ message: "A játék nem található!" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.game = game;
    next();
}

gamesRouter.get('/', async (req, res) => {
    try {
        const games = await Game.find();
        res.status(200).json(games);
    } catch (error) {
        return res.staus(500).json({ message: error.message });
    }
});

gamesRouter.get('/:id', getGame, (req, res) => {
    res.json(res.game);
});

gamesRouter.post('/', async (req, res) => {
    const game = new Game({
        name: req.body.name,
        genre: req.body.genre,
        price: req.body.price,
        sum: req.body.sum,
        releaseDate: req.body.releaseDate,
    });

    try {
        const newGame = await game.save();
        res.status(201).json(newGame);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

gamesRouter.patch('/:id', getGame, async (req, res) => {
    if (req.body.name != null) {
        res.game.name = req.body.name;
    }
    if (req.body.genre != null) {
        res.game.genre = req.body.genre;
    }
    if (req.body.price != null) {
        res.game.price = req.body.price;
    }
    if (req.body.sum != null) {
        res.game.sum = req.body.sum;
    }
    if (req.body.releaseDate != null) {
        res.game.releaseDate = req.body.releaseDate;
    }

    try {
        const updateGame = await res.game.save();
        res.json(updateGame);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

gamesRouter.delete('/:id', getGame, async (req, res) => {
    try {
      await res.game.remove();
      res.json({ message: 'A játék sikeresen törölve!' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = gamesRouter;