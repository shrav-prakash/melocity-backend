const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGOURL,
    (error) => {
        if (error)
            console.log(error)
        else
            console.log("Database connection established!")
    }
)

mongoose.Promise = global.Promise;