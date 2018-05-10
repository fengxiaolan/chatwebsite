var mongoose = require('mongoose')
var ActuserSchema = require('../schemas/actuser')
var Actuser = mongoose.model('Actusers', ActuserSchema)

module.exports = Actuser