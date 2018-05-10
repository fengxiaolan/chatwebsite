var mongoose = require('mongoose')
//活动的用户
var ActuserSchema = new mongoose.Schema({
    name: String,
    username: String,
    time: {
        type: Date,
        default: Date.now()
    }
}, {
    versionKey: false
})

module.exports = ActuserSchema