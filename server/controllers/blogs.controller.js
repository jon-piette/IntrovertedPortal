const Blog = require('../models/blogs.model');

module.exports = {
    allBlogs: (req, res) => {
        Blog.find({})
            .then(blog => res.json({ message: "success", results: blog}))
            .catch(err => res.json({ message: "error", results: err}))
    },
    
    oneBlog: (req, res) => {
        Blog.findOne ({ _id: req.params.id})
            .then(blog=> res.json({ message: "success", results: blog}))
            .catch(err => res.json({ message:"error", results: err}))
    },

    newBlog: (req, res) => {
        Blog.create(req.body)
            .then(blog=> res.json({ message: "success", results: blog}))
            .catch(err => res.json({ message: "error", results: err}))
    },

    deleteBlog: (req, res) =>{
        Blog.findOneAndDelete({ _id: req.params.id})
            .then(blog => res.json({ message: "success", results: blog}))
            .catch(err => res.json({ message: "error", results: err}))
    }
}