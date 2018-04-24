<template>
  <div id="app">
    <!--tab选项卡-->
    <!--<div class="app-bottom" v-if="istab">-->
      <div class="heads">
        <!--<a href="javascript:void();" @click="userinfo">用户信息</a>-->
        <h2 style="font-size: 14px; line-height: 36px; float: left; color: blue; text-shadow: yellow; ">在这里遇见你</h2>
        <mu-flat-button label="退出" class="flat-button" to="/login"/>
        <mu-flat-button label="我的" class="flat-button" icon="android" primary to="/home"/>

      </div>
      <!--<mu-paper>-->
        <!--<mu-bottom-nav :value="bottomNav" @change="handleChange">-->
          <!--<mu-bottom-nav-item value="index" title="首页"  to="/"/>-->
          <!--<mu-bottom-nav-item value="recents" title="同城聊"  to="/loan"/>-->
          <!--<mu-bottom-nav-item value="favorites" title="无聊"  to="/robot"/>-->
        <!--</mu-bottom-nav>-->
      <!--</mu-paper>-->
      <ul class="nav">
        <li><router-link to="/">首页</router-link></li>
        <li><router-link to="/activity">门店活动</router-link></li>
        <li><router-link to="/search">搜索</router-link></li>
        <li><router-link to="/loan">同城聊</router-link></li>
        <li><router-link to="/robot">无聊</router-link></li>
      </ul>

      <router-view></router-view>
    <!--</div>-->
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        bottomNav: 'index'
      }
    },
    methods: {
      handleChange (val) {
        this.bottomNav = val
      },
      userinfo () {
          this.$router.push({path: '/home'})
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
  /*#app*/
    /*width: 100%*/
    /*height: 100%*/
    /*.head*/
      /*height: 22px*/
      /*background: #ed3f14*/
    /*.app-bottom*/
      /*position: fixed*/
      /*top: 0*/
      /*z-index: 102*/
      /*width: 100%*/
      /*.mu-bottom-nav*/
        /*height: 20px*/
   #app{
     width:100%;
     height: 100%;
   }
  .heads{
    height: 36px;
    background: #ed3f14;
  }
  .flat-button{
    float:right;
  }
  .nav{
    width: 100%;
    height: 30px;
    background: peachpuff;
  }
  .nav li{
    padding: 0 5px;
    float: left;
    height: 30px;
    list-style:none;
  }
  .nav li a{
    color:white;
    line-height: 30px;
  }
  .router-link-exact-active{
    height:30px;
    display: block;
    background:darkred;
  }


</style>
