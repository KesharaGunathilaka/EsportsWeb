const mongoose = require('mongoose')

const blogSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a Game name"]
        },
        details: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },        
        likes: {
            type: String,
            required: false,
        },
        comments: {
            type: String,
            required: false,
        },
        imageURL: {
            type: String,
            required: false,
        },
        user: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }

)

const Blog = mongoose.model('Blog',blogSchema)

module.exports = Blog;