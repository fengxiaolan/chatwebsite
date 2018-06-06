<template>
  <div>
    <div class="header">
      <div class="head">
        <img :src="src" :alt="username" :title="username">
      </div>
      <div class="name">
        {{username}}
      </div>
      <div class="background">
        <img :src="src" alt="">
      </div>
    </div>
    <div class="content">
     <!-- <mu-grid-list class="gridlist-inline-demo">
        <mu-grid-tile v-for="(tile, index) in upimg" :key="index">
        <mu-grid-tile>
          <img :src="src"/>
        </mu-grid-tile>
      </mu-grid-list>-->
      <!---->
      <h2 v-if="this.friend" >好友列表项</h2>
      <mu-chip v-for="(val, index) in goodlist" :key="index">
        {{val.newname}}
      </mu-chip>

      <mu-list>
        <!--<mu-list-item title="上传图片" @click="imgupload">
          <mu-icon slot="left" value="inbox"/>
          <input id="inputFile" name='inputFile' type='file' multiple='mutiple' accept="image/*;capture=camera"
                 style="display: none" @change="fileup">
        </mu-list-item>-->
        <mu-list-item title="我的好友" @click="searchgood">
          <mu-icon slot="left" value="grade"/>
        </mu-list-item>
        <mu-list-item title="退出" @click="logout">
          <mu-icon slot="left" value="drafts"/>
        </mu-list-item>
        <mu-list-item title="注销" @click="deleteuser">
          <mu-icon slot="left" value="home"/>
        </mu-list-item>
        <mu-list-item title="重置密码" @click="renamebtn">
          <mu-icon slot="left" value="send"/>
        </mu-list-item>
        <mu-list-item title="修改信息" @click="ainfo">
          <mu-icon slot="left" value="update"/>
        </mu-list-item>
      </mu-list>
    </div>
    <template v-if="reinfo">
      <mu-text-field  hintText="用户名" name="uname" v-model="uname" disabled/>
      <mu-text-field  hintText="密码" name="pwd" v-model="pwd"/>
      <mu-raised-button label="提交修改" @click="clickinfo"/>
    </template>
    <vue-particles
            color="#dedede"
    >
    </vue-particles>
    <div style="height:80px"></div>
  </div>
</template>

<script>
  import {clear, getItem, setItem} from '../utils/localStorage'
  import axios from 'axios'
  import Alert from '../components/Alert'

  export default{
    data() {
      return {
        username: '',
        src: '',
        rename: '',
        list: [],
        goodlist: [],
        upimg: '1524735336809',
        reinfo: false,
        uname: '',
        pwd: '',
        friend: false
      }
    },
    mounted() {
      if (!getItem('userid')) {
        this.$router.push('/login')
      }
      this.username = getItem('userid')
      this.src = getItem('src')

      this.uname = getItem('userid')
    },
    async created() {
        //查看图片
        var name = getItem('userid')
        var data = {
            name: name
        }
        const res = await this.$store.dispatch('imgInfos', data);

        if (res.status === 'success') {
            this.goodlist = res.data
        } else {
            console.error("没有找到");
        }
    },
    methods: {
      logout() {
        clear()
        this.$router.push('/login')
        this.$store.commit('setTab', false)
      },
      async searchgood() {
            //查看好友
            var name = getItem('userid')
            var data = {
                name: name
            }
            const res = await this.$store.dispatch('sgoodFriend', data);

            if (res.status === 'success') {
                this.goodlist = res.data
            } else {
                console.error("没有找到");
            }
            this.friend = true
      },
      async deleteuser() {
        var name = getItem('userid')
        const data = {
            name: name
        };
        const res = await this.$store.dispatch('deleteUserinfo', data);
          if (res.status === 'success') {
              console.log(res)
              await Alert({
                  content: res.data.data
              });
              this.$router.push({path: '/login'})
          } else {
              console.error("没有找到");
          }
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
               this.upimg = obj.time
               console.info('kasdfja', obj.time.getTime())
              }
              fr.readAsDataURL(file1)
          } else {
              console.log('必须有文件')
          }
      },
      imgupload() {
          const file = document.getElementById('inputFile')
          file.click()
      },
      async renamebtn() {
          var name = getItem('userid')
          const data = {
              name: name
          }
          const res = await this.$store.dispatch('reNames', data);
          if (res.status === 'success') {
              await Alert({
                  content: res.data.data
              });
          } else {
              await Alert({
                  content: res.data.data
              });
          }
      },
      ainfo() {
        this.reinfo = !this.reinfo
      },
      async clickinfo(){
        const data = {
            name: this.uname,
            password: this.pwd
        }
        const res = await this.$store.dispatch('reInfos', data);
          if (res.status === 'success') {
              await Alert({
                  content: res.data.data
              });
              this.$router.push({path: '/login'})
          } else {
              await Alert({
                  content: res.data.data
              });
          }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .header
    position: relative
    width: 100%
    height: 200px
    .head
      width: 80px
      margin: 20px auto 0
      img
        width: 80px
        height: 80px
        border-radius: 50%
    .name
      height: 50px
      line-height: 50px
      color: #ffffff
      font-size: 18px
      text-align: center
    .background
      position absolute
      top: 0
      left 0
      width 100%
      height: 200px
      z-index -1
      filter blur(10px)
      img
        width: 100%
        height: 100%

  .logout
    width: 200px
    margin: 0 auto
    .mu-raised-button
      background: #ff4081
      color: #fff
</style>
