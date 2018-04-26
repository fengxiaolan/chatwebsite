var mongoose = require('mongoose')
//朋友
var FriendSchema = new mongoose.Schema({
    username: String,
    src: String,
    time: {
        type: Date,
        default: Date.now()
    }
})

module.exports = FriendSchema