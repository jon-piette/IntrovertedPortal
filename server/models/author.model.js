const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema ({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName:{
        type: String,
        required:[true, "Last name is required"]
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password mus be 8 characters or longer"]
    }   

}, {timestamps: true});

const User = new mongoose.model("User", UserSchema);

module.exports = User;


