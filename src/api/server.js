import Axios from './axios'

const Service = {
  // 登录接口
  loginUser: data => Axios.post('/user/signin', data),
  // 注册接口
  RegisterUser: data => Axios.post('/user/signup', data),
  // 获取当前房间历史记录
  RoomHistory: data => Axios.get('/message', {params: data}),
  // 获取当前房间所有历史记录
  RoomHistoryAll: data => Axios.get('/history/message', {
    params: data
  }),
  // 机器人
  getRobotMessage: data => Axios.get('/robotapi', {
    params: data
  }),
  // 上传图片
  postUploadFile: data => Axios.post('/file/uploadimg', data, {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  }),
  //搜索
  searchUser: data => Axios.post('/userinfo', data),
  //注销账户
  deleteUser: data => Axios.post('/deleteuser', data),
  //添加好友
  addFriend: data => Axios.post('/addfriend', data),
  //查看好友
  goodFriend:  data => Axios.post('/sgoodfriend', data),
  //修改用户名
  reName: data => Axios.post('/rename', data),
  //添加活动
  addAct: data => Axios.post('/addactivity', data),
  //查找性别
  sman: data => Axios.post('/sman',data),
  //修改用户信息
  reInfo: data => Axios.post('/reinfo', data),
  //查询上传的图片
  imgInfo: data => Axios.post('/imginfo', data),
  //查询活动
  sActivity: data => Axios.post('/sactivity',data),
  //申请活动
  applyAct: data => Axios.post('/applyact', data),
  //查询申请活动用户
  sApply: data => Axios.post('/sapply',data)
}

export default Service

