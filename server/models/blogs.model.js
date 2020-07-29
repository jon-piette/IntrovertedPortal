const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    // author: {
    //     type: String,
    //     required: [true, "We need to know who is publishing these articles!"],
    //     minlength: [2, "Don't be shy I need to know your whole name"],
    //     maxlength: [60, "That's a long name you got there, don't you have like a nickname or something?"]
    // },
    title:{
        type: String,
        required: [true, "What are you going to call your post?"],
        minlength: [2, "You gotta atleast try to be creative"],
        maxlength:[45, "Okay dial it back there chief"]
    },

    description:{
        type: String,
        required: [true, "So tell me, what is it that you are writing about?"],
        minlength: [5, "Don't be shy, we gotta have some idea of what you're writing"],
        maxlength: [45, "It's just a short description, not the blog"]
    },

    post:{
        type: String,
        required: [true, "Why come to a blog site and not write a blog? Oh, you're the type that likes to watch huh?"],
        minlength: [5, "Come on it's time to share and tell the world how you feel"],
        maxlength: [100000, "Okay, this is a BLOG not a book, chill out George R. R. Martin"]
    }
}, {timestamps: true});

const Blog = new mongoose.model("Blog", BlogSchema);

module.exports = Blog;