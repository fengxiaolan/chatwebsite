var mongoose = require('mongoose')
var MessageSchema = require('../schemas/message')
var Message = mongoose.model('Messages',MessageSchema)

module.exports = Message