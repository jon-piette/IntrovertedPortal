const controller = require('../controllers/blogs.controller');

module.exports = function(app){
    app.get('/api/blogs', controller.allBlogs);
    app.get('/api/blogs/:id', controller.oneBlog);
    app.post('/api/blogs', controller.newBlog);
    app.delete('/api/blogs/:id', controller.deleteBlog);
}