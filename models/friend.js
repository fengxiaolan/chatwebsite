var mongoose = require('mongoose')
var FriendSchema = require('../schemas/friend')
var Friend = mongoose.model('friends',FriendSchema)

module.exports = Friend