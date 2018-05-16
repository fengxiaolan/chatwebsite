const User = require('../models/user')
var Friend = require('../models/friend')
var Activity = require('../models/activity')
var Actuser = require('../models/actuser')
const Message = require('../models/message')
const superagent = require('superagent')
const fs = require('fs')
const multiparty = require('multiparty');
module.exports =  (app) => {
  app.use( (req, res, next) => {
    const _user = req.session.user

    app.locals.user = _user

    next()
  })
  app.post('/file/uploadimg',  (req, res, next) => {
    // //生成multiparty对象，并配置上传目标路径
    const form = new multiparty.Form()
    // //设置编辑
    form.encoding = 'utf-8'
    // //设置文件存储路径
    form.uploadDir = "./static/files/"
    // //设置单文件大小限制
    form.maxFilesSize = 2 * 1024 * 1024
    // form.maxFields = 1000;  设置所以文件的大小总和
    // 上传完成后处理
    form.parse(req, (err, fields, files) => {
      if (err) {
        global.logger.error('parse error: ' + err)
        res.json({
          errno: 1
        })
      } else {
        const inputFile = files.file[0];
        const uploadedPath = inputFile.path
        const array = inputFile.originalFilename.split('.')
        const imgtype = array[array.length - 1]
        let dstPath;
        const time = new Date().getTime();
        if (process.env.NODE_ENV === 'development') {
          dstPath = `./static/files/${time}.${imgtype}`
        } else {
          dstPath = `./dist/static/files/${time}.${imgtype}`
        }
        const inPath = `./static/files/${time}.${imgtype}`
        // 判断是否存在./dist/static/files文件
        fs.stat('./dist/static/files', (err, stats) => {
          if (JSON.stringify(stats) === undefined) {
            fs.mkdirSync('./dist', 0777)
            fs.mkdirSync('./dist/static', 0777)
            fs.mkdirSync('./dist/static/files', 0777)
          }
          storeFiles(uploadedPath, dstPath, fields, inPath)
        })
      }
    })
    function storeFiles(uploadedPath, dstPath, fields, inPath) {
      //重命名为真实文件名
      fs.rename(uploadedPath, dstPath,  (err) => {
        if (err) {
          global.logger.error(`rename error:${err}`)
          res.json({
            errno: 1
          })
        } else {
          const mess = {
            username: fields.username,
            src: fields.src,
            img: inPath,
            roomid: fields.roomid,
            time: fields.time
          }
          const message = new Message(mess)
          message.save((err, mess) => {
            if (err) {
              global.logger.error(err)
            }
            global.logger.info(mess)
          })
          global.logger.info('rename ok')
          res.json({
            errno: 0
          })
        }
      })
    }
  })
  // 注册
  app.post('/user/signup',  (req, res) => {
    const _user = req.body
    User.findOne({name: _user.name},  (err, user) => {
      if (err) {
        global.logger.error(err)
      }
      if (user) {
        res.json({
          errno: 1,
          data: '用户名已存在'
        })
      } else {
        user = new User(_user)
        user.save( (err, user) => {
          if (err) {
            global.logger.error(err)
          }
          res.json({
            errno: 0,
            data: '注册成功'
          })
        })
      }
    })
  }),
  // 登录
  app.post('/user/signin', (req, res) => {
    const _user = req.body
    const name = _user.name
    const password = _user.password
    User.findOne({name: name}, (err, user) => {
      if (err) {
        global.logger.error(err);
      }
      if (!user) {
        res.json({
          errno: 1,
          data: '用户不存在'
        })
      } else {
        if (!!password) {
          user.comparePassword(password, (err, isMatch) => {
            if (err) {
              global.logger.error(err);
            }
            if (isMatch) {
              req.session.user = user;
              global.logger.info('success');
              res.json({
                errno: 0,
                data: '登录成功',
                name: name,
                src: user.src,
                sex: user.sex
              })
            } else {
              res.json({
                errno: 1,
                data: '密码不正确'
              })
              global.logger.info('password is not meached');
            }
          })
        } else {
          res.json({
            errno: 1,
            data: '登录失败'
          })
        }
      }

    })
  }),

  //注销当前用户
  app.post('/deleteuser', function (req, res) {
      var _user = req.body
      var name = _user.name
      User.remove({name: name}, function (err) {
          if (err) {
              console.error(err)
              res.json({
                  errno: 1,
                  data: '删除未成功'
              });
          } else {
              console.info("用户注销成功")
              res.json({
                  errno: 0,
                  data: '删除成功'
              })
          }
      })
  }),

  //查询用户
  app.post('/userinfo', function (req, res) {
      var _user = req.body;
      var name = _user.name;
      User.find({name: name}, function (err, data) {
          var searchinfo = {
              errno: 0,
              data: {}
          }
          if (err) {
              console.log(err);
          } else {
              searchinfo.data = data

              res.json({
                  data: searchinfo
              })
          }
      })
  }),

  //添加好友
  app.post('/addfriend', function (req, res) {
      var _user = req.body;
      var name= _user.name;
      var newname = _user.newname;

      Friend.findOne({name: name, newname: newname}, function (err, friend) {
          var newfriend = {
              name: name,
              newname: newname
          }
          if (err) {
              console.log(err)
          }
          console.info('friend', friend)
          if(friend){
              res.json({
                  errno: 1,
                  data: '已是好友'
              })
          } else {
              friend = new Friend(newfriend)
              friend.save((err, friend) => {
                  if (err) {
                      console.log(err)
                  }
                  res.json({
                      errno: 0,
                      data: '添加好友成功'
                  })
              })
          }
      })
  }),

  //查看好友6+
  app.post('/sgoodfriend', function (req, res) {
      var _user = req.body;
      var name = _user.name;
      var searchgood = {
          errno: 0,
          data: {}
      }
      Friend.find({name: name},function (err, data) {
          if (err) {
              console.log(err);
          } else {
              searchgood.data = data

              res.json({
                  data: searchgood
              })
          }
      })
  }),

  //查询图片
  app.post('/imginfo', function (req, res) {
      var _user = req.body;
      var name = _user.name;
      var searchgood = {
          errno: 0,
          data: {}
      }
      Message.find({roomid: 'undefined'},function (err, data) {
          if (err) {
              console.log(err);
          } else {
              searchgood.data = data

              res.json({
                  data: searchgood
              })
          }
      })
  }),

  //修改用户名
  app.post('/rename', function (req, res){
    var _user = req.body;
    var name = _user.name;
    User.update({name: name}, {password: '111'}, function (err) {
        if(err) {
            console.log(err)
            res.json({
                errno: 1,
                data: err
            })
        } else {
            res.json({
                errno: 0,
                data: '重置密码成功111'
            })
        }
    })
  }),

  //修改用户信息
  app.post('/reinfo', function (req, res){
        var _user = req.body;
        var name = _user.name;
        var password = _user.password;
        User.update({name: name}, {password: password}, function (err) {
            if(err) {
                console.log(err)
                res.json({
                    errno: 1,
                    data: err
                })
            } else {
                res.json({
                    errno: 0,
                    data: '修改成功，请重新登录'
                })
            }
        })
    }),

  //添加活动
  app.post('/addactivity', function (req, res) {
      var act = req.body;
      var name= act.name;
      var province = act.province,
          city = act.city,
          area = act.area,
          groupno = act.groupno,
          date = act.date;
      Activity.findOne({name: ''}, function (err, activity) {
          var newact = {
              name: name,
              province: province,
              city: city,
              area: area,
              groupno: groupno,
              date: date
          }
          if (err) {
              console.log(err)
          }
          console.info('activity', activity)
          if(activity){
              res.json({
                  errno: 1,
                  data: '已添加此活动'
              })
          } else {
              activity = new Activity(newact)
              activity.save(function (err, activity) {
                  if (err) {
                      console.log(err)
                  }
                  res.json({
                      errno: 0,
                      data: '添加活动成功'
                  })
              })
          }
      })
  }),

  //查看活动
  app.post('/sactivity', function (req, res) {
      var acts = {
          errno: 0,
          data: {}
      }
      Activity.find({}, function (err, data) {
          if (err) {
              console.log(err);
          } else {
              acts.data = data

              res.json({
                  data: acts
              })
          }
      })
  }),

  //申请加入活动用户
  app.post('/applyact', function (req, res) {
      var act = req.body;
      var name= act.name;
      var username= act.username;
      Actuser.findOne({name: ''}, function (err, actuser) {
          var newact = {
              name: name,
              username: username
          }
          if (err) {
              console.log(err)
          }
          console.info('actuser', actuser)
          if(actuser){
              res.json({
                  errno: 1,
                  data: '已申请加入'
              })
          } else {
              actuser = new Actuser(newact)
              actuser.save(function (err, act) {
                  if (err) {
                      console.log(err)
                  }
                  res.json({
                      errno: 0,
                      data: '申请活动成功'
                  })
              })
          }
      })
  }),

  //查看加入活动用户
  app.post('/sapply', function (req, res) {
      var acts = {
          errno: 0,
          data: {}
      }
      Actuser.find({}, function (err, data) {
          if (err) {
              console.log(err);
          } else {
              acts.data = data

              res.json({
                  data: acts
              })
          }
      })
  }),

  //查看性别
  app.post('/sman', function (req, res) {
      var _sex = req.body;
      var sex = _sex.sex;
      var man = {
          errno: 0,
          data: {}
      }
      User.find({sex: sex},function (err, data) {
          if (err) {
              console.log(err);
          } else {
              man.data = data

              res.json({
                  data: man
              })
          }
      })
  }),

  // 信息
  app.get('/message', (req, res) => {
    const id = req.query.roomid
    Message.find({roomid: id}).sort({"time": -1}).limit(80).exec((err, message) => {
      if (err) {
        global.logger.error(err)
      } else {
        res.json({
          errno: 0,
          data: message.reverse()
        })
      }
    })
  }),

  // 获取历史记录
  app.get('/history/message', (req, res) => {
    const id = req.query.roomid
    const current = req.query.current
    if (!id || !current) {
      global.logger.error('roomid | page current can\'t find')
      res.json({
        errno: 1
      });
    }
    const message = {
      errno: 0,
      data: {},
      total: 0,
      current: current
    }
    const task1 = new Promise((resolve, reject) => {
      const skip = parseInt((current - 1) * 40)
      Message.find({roomid: id}).skip(skip).limit(40).exec((err, data) => {
        if (err) {
          global.logger.error(err)
          return reject()
        } else {
          message.data = data
          return resolve()
        }
      })
    })
    const task2 = new Promise((resolve, reject) => {
      Message.find({roomid: id}).count().exec((err, data) => {
        if (err) {
          global.logger.error(err)
          return reject()
        } else {
          message.total = data
          return resolve()
        }
      })
    })
    Promise.all([task1, task2]).then(() => {
      res.json({
        data: message
      })
    })
  }),

  // 机器人消息
  app.get('/robotapi', (req, res) => {
    const response = res
    const info = req.query.info
    const userid = req.query.id
    const key = 'fde7f8d0b3c9471cbf787ea0fb0ca043'
    superagent.post('http://www.tuling123.com/openapi/api')
      .send({info, userid, key})
      .end((err, res) => {
        if (err) {
          global.logger.error(err)
        }
        response.json({
          data: res.text
        })
      })
  })
}
