const Blog = require('../models/blogs')
const asyncHandler = require('express-async-handler')

const getBlogs=async(req,res)=>{
    try {
        const blogs = await Blog.find({});
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getBlog= asyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        const blog = await Blog.findById(id);
        res.status(200).json(blog);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const createBlog =async(req,res)=>{
    try {
        const blog = await Blog.create(req.body)
        res.status(200).json(blog);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
}

const updateBlog =async(req,res)=>{
    try {
        const {id} = req.params;
        const blog = await Blog.findByIdAndUpdate(id,req.body);
        if(!blog){
            return res.status(404).json({message: `cannot find any product with ID ${id}`});
        }
        const updatedblog = await Blog.findById(id);
        res.status(200).json(updatedblog);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const deleteBlog =async(req,res)=>{
    try {
        const {id} = req.params;
        const blog = await Blog.findByIdAndDelete(id);
        if(!blog){
            return res.status(404).json({message: `cannot find any product with ID ${id}`});
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
}