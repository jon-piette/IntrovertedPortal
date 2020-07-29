const User = require('../controllers/author.controller');

module.exports = app => {
    app.get("/api/blogs/users/register", User.allUsers);
    app.get("/api/blogs/users/:id", User.oneUser);
    app.post("/api/blogs/users/register", User.registerUser);
    app.post("/api/blogs/users/login", User.loginUser);
    app.patch("/api/blogs", User.logoutUser);
}