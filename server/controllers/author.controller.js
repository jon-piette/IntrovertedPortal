const User = require('../models/author.model')

module.exports ={

    allUsers: (req, res) => {
        User.find({})
            .then(user => res.json({message: "success", results: user}))
            .catch(err => res.json({message: "error", results: err}))
    }, 

    oneUser: (req,res) => {
        User.findOne ({_id: req.params.id})
            .then(user=> res.json({ message: "success", results: user}))
            .catch(err => res.json({message: "error", results: err}))
    },

    registerUser: (req, res) => {
        User.create(req.body)
            .then(user =>res.json({ message: "success", results: user}))
            .catch(err => res.json({message: "error", results: err}))
        },

    loginUser: async(req, res) => {
        const user = await User.findOne({ email: req.body.email });
    if(user === null) {
        return res.sendStatus(400);
    }

    const correctPassword = await bcrypt.compare(req.body.password, user.password);

    if(!correctPassword){
        return res.sendStatus(400);
    }
    
    res.json({ message: "success"});
    },

    logoutUser: (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    }
}