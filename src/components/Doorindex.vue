<template>
    <div>
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
        name: "doorindex"
    }
</script>

<style scoped>
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