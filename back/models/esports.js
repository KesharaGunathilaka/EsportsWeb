const mongoose = require('mongoose')

const esportsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a Event name"]
        },
        date: {
            type: Date,
            required: true,
        },
        location: {
            type: String,
            
        },
        participants: {
            type: String,
            required: true,
        },
        prizepool: {
            type: String,
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

const Esport = mongoose.model('Esport',esportsSchema)

module.exports = Esport;