var mongoose = require('mongoose')
var ActivitySchema = require('../schemas/activity')
var Activity = mongoose.model('Activitys', ActivitySchema)

module.exports = Activity