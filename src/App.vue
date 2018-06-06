<template>
  <div id="app">
    <!--tab选项卡-->
    <div class="heads">
      <h2 class="logotext" title="logo">刚好遇见你</h2>

      <mu-flat-button label="退出" class="flat-button" icon="home"  @click="logout" color="grey"/>
      <mu-flat-button label="我的" class="flat-button" icon="person" color="orange" to="/home" />
      <p style="display:inline-block; float: right; line-height: 36px; color: red;">欢迎 {{username}} ! </p>
    </div>
    <ul class="nav">
      <li>&nbsp;</li>
      <li><router-link to="/">首页</router-link></li>
      <li><router-link to="/loan">同城聊</router-link></li>
      <li><router-link to="/robot">智能对话</router-link></li>
      <li><router-link to="/activity">门店活动</router-link></li>
      <li><router-link to="/search">搜索</router-link></li>
      <li @click="mendian" style="color: white; line-height: 30px; cursor: pointer;">直营门店</li>
      <li v-if="member"><router-link to="/member">会员信息</router-link></li>
    </ul>

    <router-view></router-view>
  </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {clear, getItem} from './utils/localStorage'

    export default {
        data () {
            return {
                bottomNav: 'index',
                member: '',
                username: ''
            }
        },
        created() {
            var user = getItem('userid');
            this.username = user;
            if(user === 'admin'){
                this.member = true
            } else {
                this.member = false
            }
        },
        methods: {
            handleChange (val) {
                this.bottomNav = val
            },
            userinfo () {
                this.$router.push({path: '/home'})
            },
            logout () {
                clear()
                this.$router.push('/login')
                this.$store.commit('setTab', false)
            },
            mendian () {
                window.open(window.location.origin + '/doorindex')
            }
        },
        computed: {
            ...mapState([
                'istab'
            ])
        }
    }
</script>

<style scope>
  .logotext {
    font-size: 16px;
    line-height: 28px;
    float: left;
    color: red;
    text-shadow: 1px 2px #ec7f7f;
    margin-left: 10px;
  }

  #app{
    width:100%;
    height: 100%;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .heads{
    height: 36px;
    background: #fcfcfa;
  }
  .mu-flat-button {
    color: #ed3f14;
  }
  .flat-button{
    float: right;
  }
  .nav{
    width: 100%;
    height: 30px;
    background: #f44336;
  }
  .nav li{
    padding: 0 2px;
    float: left;
    height: 30px;
    list-style:none;
  }
  .nav li a{
    color:white;
    line-height: 30px;
    padding: 0 10px;
  }
  .router-link-exact-active{
    height:30px;
    display: block;
    background: #dc0909;
    color: white;
  }
</style>