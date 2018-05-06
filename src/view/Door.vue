<template>
   <div id="door">
       <div class="topcon">
           <h2 class="toplogo">刚好遇见你</h2>
           <ul class="topitem">
               <li><router-link to="/door">首页</router-link></li>
               <li><router-link to="/service">服务介绍</router-link></li>
               <li><router-link to="/story">成功故事</router-link></li>
               <li><router-link to="/beatatc">精彩活动</router-link></li>
               <li><router-link to="/addr">门店地址</router-link></li>
           </ul>
       </div>
       <div class="content">
           <div class="contact">
               <p style="color:red; text-align: center;">热线电话： 028-8888-8888</p>
               <h2 class="speak">马上联系</h2>
           </div>
       </div>

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
        line-height: 36px;
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
    .content {
         width: 100%;
         height: 540px;
         background-image:url(http://images.zastatic.com/zhenai3/images/offline/banner02_2.jpg);
         background-size: 100% 100%;
         position: relative;
     }
    .contact {
        width: 300px;
        height: 120px;
        border-radius: 5px;
        padding: 10px 0;
        background: #fff;
        position: absolute;
        left: 50%;
        margin-left: -100px;
        bottom: 100px;
    }
     .speak {
         color: white;
         font-size: 20px;
         font-weight: 700;
         width: 150px;
         height: 40px;
         line-height: 40px;
         border-radius: 5px;
         margin-top: 20px;
         margin-left: 75px;
         text-align: center;
         background: linear-gradient(to right, red, rosybrown);
         animation: jump 1s infinite;
     }
    
    @keyframes jump {
       0% {transform: scale(1); opacity: 0.6;}
       50% {transform: scale(1.2); opacity: 1;}
       0% {transform: scale(1); opacity: 0.6;}
    }

</style>