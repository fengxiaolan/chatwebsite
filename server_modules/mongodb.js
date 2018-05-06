/*引入*/
var mongoose = require('mongoose')
// 用于异步回调
mongoose.Promise = require('bluebird') //同步检查允许您同步检索已履行承诺的履行价值或已被拒绝承诺的拒绝原因
global.db = mongoose.connect("mongodb://localhost:27017/weChat",{useMongoClient:true}).then(function(db) {
    console.log("数据库连接成功");
});

module.exports = mongoose;
