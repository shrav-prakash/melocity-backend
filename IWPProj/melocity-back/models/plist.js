const mongoose = require("mongoose");

const plistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    slist: {
        type: [String],
        default: []
    }
});

const Plists = mongoose.model('plist', plistSchema)
module.exports = Plists;