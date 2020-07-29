const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blogs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => console.log("Established connection to the database."))
    .catch(err => console.log("Something went wrong while trying to connect to the database", err))