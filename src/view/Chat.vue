<template>
  <div>
    <div class="container">
      <div class="title">
        <mu-appbar title="Title">
          <mu-icon-button icon="chevron_left" slot="left" @click="goback"/>
          <div class="center">
            聊天({{Object.keys(getUsers).length}})
          </div>
          <!--<mu-icon-button icon="expand_more" slot="right" @click="setLog"/>-->
        </mu-appbar>
      </div>
      <div class="chat-inner">
        <div class="all-chat">
          <!--<div>在线人员</div>-->
          <div v-for="obj in getUsers" class="online">
            <img :src="obj.src" alt="">
          </div>
        </div>
        <div class="chat" v-if="isLoadingAchieve">
          <div v-if="getInfos.length === 0 && getMessHistoryInfos.length === 0" class="chat-no-people">暂无消息,赶紧来抢占沙发～～～</div>
          <div v-for="obj in getMessHistoryInfos">
            <othermsg v-if="obj.username!=useranme" :name="obj.username" :head="obj.src" :msg="obj.msg"
                      :img="obj.img" :mytime="obj.time"></othermsg>
            <mymsg v-if="obj.username==useranme" :name="obj.username" :head="obj.src" :msg="obj.msg"
                  :img="obj.img" :mytime="obj.time"></mymsg>
          </div>
          <div v-for="obj in getInfos">
            <othermsg v-if="obj.username!=useranme" :name="obj.username" :head="obj.src" :msg="obj.msg"
                      :img="obj.img" :mytime="obj.time"></othermsg>
            <mymsg v-if="obj.username==useranme" :name="obj.username" :head="obj.src" :msg="obj.msg"
                  :img="obj.img" :mytime="obj.time"></mymsg>
          </div>
          <div class="clear"></div>
        </div>
      </div>
      <div class="bottom">
        <div class="chat">
          <div class="input" @keyup.enter="submess">
            <input type="text" v-model="chatValue">
          </div>
          <mu-raised-button label="发送" class="demo-raised-button" primary @click="submess"/>
        </div>
        <div class="functions">
          <div class="fun-li" @click="imgupload"></div>
          <div class="fun-li" @click="emoj"></div>
        </div>
        <input id="inputFile" name='inputFile' type='file' multiple='mutiple' accept="image/*;capture=camera"
                style="display: none" @change="fileup">
      </div>
      <div class="emojs" v-show="isemoj">
        <ul>
          <li @click="insertText(item)" v-for="item of emojis">{{item}}</li>
          <!--<li  v-for="(item, index) in emojiList" @click="insertText(item)">-->
            <!--<i :class="'iconfont '+item" :key="index" ></i>-->
          <!--</li>-->
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6" scoped>
  import Mymsg from '../components/Mymsg.vue'
  import Othermsg from '../components/Othermsg.vue'
  import {mapGetters, mapState} from 'vuex'
  import {queryString} from '../utils/queryString'
  import { getItem } from '../utils/localStorage'
  import loading from '../components/loading/loading'
  import Alert from '../components/Alert'
  import '../utils/emoji/iconfont.css'
  // import io from 'socket.io-client'

  export default{
    data() {
      return {
        roomid: '',
        useranme: '',
        isLoadingAchieve: false,
        container: {},
        chatValue: '',
        isemoj: false,
        emojis: ['😂', '😄', '😏', '😇', '😅', '😌', '😘', '😍',
            '😜', '😎', '😊', '😳', '😱', '😒', '😔', '😷', '👿', '😩',
            '😤', '😣', '😰', '😭', '👻', '🙏','👍', '✌️', '👉', '👀', '🐶',
            '🐷', '😹', '⚡️', '🔥', '🌈', '🍏', '⚽️', '❤️', '🇨🇳', '♬',
            '☂', '☀', '♨', '㊨', '㊧', '㊥', '㊤', '㊦', '☚', '☎', '✘'],
        emojiList: [
            'icon-icon_emoji',
            'icon-_ico_emoji',
            'icon-emoji_line',
            'icon-emoji_line1',
            'icon-emoji_line2',
            'icon-emoji_line3',
            'icon-emoji_line4',
            'icon-emoji_line5',
            'icon-emoji_line6',
            'icon-emoji_line7',
            'icon-emoji_line8',
            'icon-emoji_line9',
        ]
      }
    },
    created() {
      const roomId = queryString(window.location.href, 'roomId')
      this.roomid = roomId
      if (!roomId) {
        this.$router.push({path: '/'})
      }
      if (!getItem('userid')) {
        // 防止未登录
        this.$router.push({path: '/login'})
      }
      this.useranme = getItem('userid')
    },
    mounted() {
      this.container = document.querySelector('.container')
      // socket内部，this指针指向问题
      const that = this
      this.$store.commit('setRoomDetailInfos')
      const obj = {
        name: getItem('userid'),
        src: getItem('src'),
        roomid: this.roomid
      }
      this.getSocket.emit('login', obj)
      // 连接websocket地址
      this.getSocket.on('message', function (obj) {
        that.$store.commit('addRoomDetailInfos', obj)
        window.scroll(0, 20000)
      })
      this.getSocket.on('login', function (obj) {
        that.$store.commit('setUsers', obj)
      })
      this.getSocket.on('logout', function (obj) {
        that.$store.commit('setUsers', obj)
      })
      loading.show()
      setTimeout(async () => {
        await this.$store.dispatch('getMessHistory', {roomid: this.roomid})
        loading.hide()
        this.isLoadingAchieve = true
        this.$nextTick(() => {
          this.container.scrollTop = 20000
        })
      }, 1000)
    },
    methods: {
      goback () {
        const obj = {
          name: getItem('userid'),
          roomid: this.roomid
        }
        this.getSocket.emit('logout', obj)
        // 防止事件重复监听,断开连接
        this.$store.commit('setGetSocket', null)
        this.$router.goBack()
        this.$store.commit('setTab', true)
      },
      setLog() {
        // 版本更新日志
      },
      fileup() {
        const that = this
        const file1 = document.getElementById('inputFile').files[0]
        if (file1) {
          const formdata = new window.FormData()
          formdata.append('file', file1)
          formdata.append('username', getItem('userid'))
          formdata.append('src', getItem('src'))
          formdata.append('roomid', that.roomid)
          formdata.append('time', new Date())
          this.$store.dispatch('uploadImg', formdata)
          const fr = new window.FileReader()
          fr.onload = function () {
            const obj = {
              username: getItem('userid'),
              src: getItem('src'),
              img: fr.result,
              msg: '',
              room: that.roomid,
              time: new Date()
            }
            that.getSocket.emit('message', obj)
          }
          fr.readAsDataURL(file1)
          this.$nextTick(() => {
            this.container.scrollTop = 10000
          })
        } else {
          console.log('必须有文件')
        }
      },
      imgupload() {
        const file = document.getElementById('inputFile')
        file.click()
      },
      emoj() {
          this.isemoj = !this.isemoj
      },
      insertText(str) {
          this.chatValue = this.chatValue + str
          this.isemoj = false
      },
      submess() {
        // 判断发送信息是否为空
        if (this.chatValue !== '') {
          if (this.chatValue.length > 100) {
            Alert({
              content: '请输入100字以内'
            })
            return
          }
          const obj = {
            username: getItem('userid'),
            src: getItem('src'),
            img: '',
            msg: this.chatValue,
            room: this.roomid,
            time: new Date()
          }
          // 传递消息信息
          this.getSocket.emit('message', obj)
          this.chatValue = ''
          this.$nextTick(() => {
            this.container.scrollTop = 10000
          })
        } else {
          Alert({
            content: '内容不能为空'
          })
        }
      }
    },
    computed: {
      ...mapGetters([
        'getSocket',
        'getInfos',
        'getUsers',
        'getMessHistoryInfos'
      ]),
      ...mapState([
        'isbind'
      ])
    },
    components: {
      Mymsg,
      Othermsg
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .container
    width: 100%
    height: 100%
    overflow: hidden
    background: #fff
    -webkit-overflow-scrolling: touch
    .chat-inner 
      position: absolute
      width: 100%
      overflow-y: scroll
      top: 56px
      bottom: 80px
    .title
      position: fixed
      top: 0
      left: 0
      width: 100%
      z-index: 1
      .center
        -webkit-box-flex: 1
        -webkit-flex: 1
        -ms-flex: 1
        flex: 1
        padding-left: 8px
        padding-right: 8px
        white-space: nowrap
        text-overflow: ellipsis
        overflow: hidden
        font-size: 20px
        font-weight: 400
        line-height: 56px
        text-align: center
    .chat
      .chat-no-people
        width: 100%
        height: 300px;
        line-height: 300px;
        text-align: center
        color: #D1CFD2
    .all-chat
      .online
        display: inline-block
        margin: 5px
        img
          width: 40px
          height: 40px
          border-radius: 100%
    .bottom
      position: fixed
      width: 100%
      height: 80px
      bottom: 0
      left: 0
      z-index: 1
      background: #eeeff3
      .chat
        width: 100%
        display: flex
        .input
          flex: 1
          background: #eeeff3
          padding: 4px
          input
            width: 100%
            height: 42px
            box-sizing: border-box
            border: 1px solid #8c8c96
            color: #333333
            font-size: 18px
            padding-left: 5px
          .mu-text-field
            width: 100%
        .demo-raised-button
          flex-basis: 88px
          margin-top: 4px
          height: 40px
          background: #2b85e4
          color: #fff
      .functions
        width: 100%
        .fun-li
          width: 40px
          height: 30px
          display: inline-block
        .fun-li:nth-child(1)
          background-image: url(../assets/images.png)
          background-repeat: no-repeat
          background-size: 25px 25px
          background-position: center center
        .fun-li:nth-child(2)
          background-image: url(../assets/happy.png)
          background-repeat: no-repeat
          background-size: 25px 25px
          background-position: center center
     .emojs
       position: absolute
       width: 100%
       height: 50px
       background-color: white
       bottom: 150px
       left: 0
       overflow-x: auto
       ul
        height: 50px
        display: flex
        flex-wrap: wrap
        li
         padding: 2px 3px
         font-size: 2.2rem
</style>
