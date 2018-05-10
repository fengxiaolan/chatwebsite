var mongoose = require('mongoose')
//活动
var ActivitySchema = new mongoose.Schema({
    name: String,
    province: String,
    city: String,
    area: String,
    groupno: String,
    date: Date,
    time: {
        type: Date,
        default: Date.now()
    }
}, {
    versionKey: false
})

module.exports = ActivitySchema