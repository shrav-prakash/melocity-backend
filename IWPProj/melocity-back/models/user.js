const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    pArr: {
        type: [String],
        default: []
    },
    phone: {
        type: Number,
        default: 0
    },
    dob: {
        type: Date,
        default: Date("2000-01-01")
    }
});

const Users = mongoose.model('user', userSchema)
module.exports = Users;