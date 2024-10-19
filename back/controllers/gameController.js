const Game = require('../models/games')
const asyncHandler = require('express-async-handler')

const getGames=async(req,res)=>{
    try {
        const games = await Game.find({});
        res.status(200).json(games);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getGame= asyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        const game = await Game.findById(id);
        res.status(200).json(game);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const createGame =async(req,res)=>{
    try {
        const game = await Game.create(req.body)
        res.status(200).json(game);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
}

const updateGame =async(req,res)=>{
    try {
        const {id} = req.params;
        const game = await Game.findByIdAndUpdate(id,req.body);
        if(!game){
            return res.status(404).json({message: `cannot find any product with ID ${id}`});
        }
        const updatedgame = await Game.findById(id);
        res.status(200).json(updatedgame);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const deleteGame =async(req,res)=>{
    try {
        const {id} = req.params;
        const game = await Game.findByIdAndDelete(id);
        if(!game){
            return res.status(404).json({message: `cannot find any product with ID ${id}`});
        }
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = {
    getGames,
    getGame,
    createGame,
    updateGame,
    deleteGame
}