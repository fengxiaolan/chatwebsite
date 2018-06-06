<template>
    <div class="content">
        <div class="storys" v-for="(val, idx) in storylist" :key="idx">
            <img :src="val.img" alt="他她故事" class="simg">
            <div class="right">
                <h2>{{val.title}}</h2>
                <p>{{val.match}}</p>
                <p>{{val.cont}}</p>
                <br>
                <div style="background: #ec7f7f; border-radius: 5px; text-align: center;">围观幸福</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "story",
        data() {
            return {
                storylist: [
                    {
                        img:'static/img/1.jpg',
                        title: '啦啦',
                        match: '小明&小红',
                        cont: 'xxxxxxxxxx'
                    },
                    {
                        img:'static/img/1.jpg',
                        title: '啦啦',
                        match: '小明&小红',
                        cont: 'xxxxxxxxxx'
                    },
                    {
                        img:'static/img/1.jpg',
                        title: '啦啦',
                        match: '小明&小红',
                        cont: 'xxxxxxxxxx'
                    },
                    {
                        img:'static/img/1.jpg',
                        title: '啦啦',
                        match: '小明&小红',
                        cont: 'xxxxxxxxxx'
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .content {
        width: 100%;
        height: 540px;
        background: white;
    }
    .storys{
        width: 32%;
        height: 150px;
        display: inline-block;
        margin-right: 10px;
        border: 1px solid #ed3f14;
    }

    .simg {
        float: left;
        width: 148px;
    }

    .right {
        float: left;
        width: 150px;
        padding-left: 20px;
    }
</style>