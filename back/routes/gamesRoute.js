const express = require('express');
const Game = require('../models/games');
const {getGames, getGame, createGame, updateGame, deleteGame} = require('../controllers/gameController')

const router = express.Router();

router.post('/',createGame)

router.get('/',getGames);

router.get('/:id',getGame)

router.put('/:id',updateGame)

router.delete('/:id',deleteGame)

module.exports = router;