var mongoose = require('mongoose')
var FriendSchema = require('../schemas/friend')
var Friend = mongoose.model('Friends',FriendSchema)

module.exports = Friend