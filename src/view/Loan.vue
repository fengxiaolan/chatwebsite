<template>
  <div class="hello">
    <div>
      <mu-list>
        <mu-sub-header>常用聊天记录</mu-sub-header>
        <mu-list-item title="四川" @click="chatwindow('room1')">
          <mu-avatar slot="left" color="deepOrange300" backgroundColor="red">川</mu-avatar>
          <mu-icon value="chat_bubble" slot="right"/>
        </mu-list-item>
        <mu-list-item title="全国" @click="chatwindow('room2')">
          <mu-avatar slot="left" color="deepOrange300" backgroundColor="green">国</mu-avatar>
          <mu-icon value="chat_bubble" slot="right"/>
        </mu-list-item>
        <mu-list-item title="成都" @click="chatwindow('room3')">
          <mu-avatar slot="left" color="deepOrange300" backgroundColor="purple500">都</mu-avatar>
          <mu-icon value="chat_bubble" slot="right"/>
        </mu-list-item>
      </mu-list>
      <mu-divider/>
      <mu-list>
        <mu-sub-header>历史聊天记录</mu-sub-header>
        <mu-list-item title="四川" @click="chatHistory('room1')">
          <mu-avatar slot="left" color="deepOrange300" backgroundColor="red">川</mu-avatar>
          <mu-icon value="chat_bubble" slot="right"/>
        </mu-list-item>
        <mu-list-item title="全国" @click="chatHistory('room2')">
          <mu-avatar slot="left" color="deepOrange300" backgroundColor="green">国</mu-avatar>
          <mu-icon value="chat_bubble" slot="right"/>
        </mu-list-item>
        <mu-list-item title="成都" @click="chatHistory('room3')">
          <mu-avatar slot="left" color="deepOrange300" backgroundColor="purple500">都</mu-avatar>
          <mu-icon value="chat_bubble" slot="right"/>
        </mu-list-item>
      </mu-list>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import io from 'socket.io-client'
  import Confirm from '../components/Confirm'
  import { getItem } from '../utils/localStorage.js'

  export default {
    created() {
      if (!this.getSocket) {
        // if (process.env.NODE_ENV === 'development') {
          this.$store.commit('setGetSocket', io.connect('localhost:9090/'))
        // } else {
        //   this.$store.commit('setGetSocket', io.connect('http://www.qiufengh.com:9090/'))
        // }
      }
    },
    async mounted() {
      const uerId = getItem('userid')
      if (!uerId) {
        await Confirm({
          title: '提示',
          content: '请先登录'
        })
        this.$router.push({ path: 'login' })
      } else {
        this.$store.commit('setTab', true)
      }
    },
    computed: {
      ...mapGetters([
        'getSocket'
      ])
    },
    methods: {
      chatHistory(roomID) {
        this.$store.commit('setTab', false)
        this.$router.push({path: '/chat-history', query: {roomId: roomID}})
      },
      chatwindow(roomID) {
        this.$store.commit('setTab', false)
        this.$router.push({path: '/chat', query: {roomId: roomID}})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
