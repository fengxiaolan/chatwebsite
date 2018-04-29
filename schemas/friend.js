var mongoose = require('mongoose')
//朋友
var FriendSchema = new mongoose.Schema({
    name: String,
    src: String,
    time: {
        type: Date,
        default: Date.now()
    }
}, {
    versionKey: false
})

module.exports = FriendSchema