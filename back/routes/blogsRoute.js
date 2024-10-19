const express = require('express');
const Blog = require('../models/blogs');
const {getBlogs, getBlog, createBlog, updateBlog, deleteBlog} = require('../controllers/blogController')

const router = express.Router();

router.post('/',createBlog)

router.get('/',getBlogs);

router.get('/:id',getBlog)

router.put('/:id',updateBlog)

router.delete('/:id',deleteBlog)

module.exports = router;