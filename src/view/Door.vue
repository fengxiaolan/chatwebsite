<template>
   <div id="door">
       <div class="topcon">
           <h2 class="toplogo">刚好遇见你</h2>
           <ul class="topitem">
               <li><router-link to="/doorindex">首页</router-link></li>
               <li><router-link to="/service">服务介绍</router-link></li>
               <li><router-link to="/story">成功故事</router-link></li>
               <li><router-link to="/beatatc">精彩活动</router-link></li>
               <li><router-link to="/addr">门店地址</router-link></li>
           </ul>
       </div>

       <router-view></router-view>
   </div>
</template>

<script>
    export default {
        name: "door"
    }
</script>

<style scoped>
    #door {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
    }
    .topcon{
        height: 30px;
        background: #fff;
    }
    .toplogo {
        font-size: 16px;
        line-height: 28px;
        float: left;
        color: red;
        text-shadow: 1px 2px #ec7f7f;
        margin-left: 10px;
    }
    .topitem {
        float:right;
        margin-right: 30px;
    }
    .topitem li{
        padding: 0 2px;
        float: left;
        height: 30px;
        list-style:none;
    }
    .topitem li a{
        color:grey;
        line-height: 30px;
        padding: 0 10px;
    }
    .topitem > .router-link-exact-active{
        height:30px;
        display: block;
        color : red;
    }


</style>