const mongoose = require('mongoose')

const gameSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a Game name"]
        },
        genres: {
            type: String,
            required: true,
        },
        companies: {
            type: String,
            
        },
        releasedate: {
            type: Date,
            required: true,
        },
        details: {
            type: String,
            required: true,
        },
        imageURL: {
            type: String,
            
        }
    },
    {
        timestamps: true
    }

)

const Game = mongoose.model('Game',gameSchema)

module.exports = Game;