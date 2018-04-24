/*引入*/
var mongoose = require('mongoose')
// 用于异步回调
mongoose.Promise = require('bluebird')
global.db = mongoose.connect("mongodb://localhost:27017/weChat",{useMongoClient:true}).then(function(db) {
    console.log("数据库连接成功");
});

module.exports = mongoose;
