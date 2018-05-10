<template>
    <div class="content">
        <div class="storys" v-for="(val, idx) in storylist" :key="idx">
            <img :src="val.img" alt="他她故事" class="simg">
            <div class="right">
                <h2>{{val.title}}</h2>
                <p>{{val.match}}</p>
                <p>{{val.cont}}</p>
                <div style="background: rebeccapurple;">围观幸福</div>
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
        width: 350px;
        height: 150px;
        display: inline-block;
        margin-right: 10px;
    }

    .simg {
        float: left;
        width: 148px;
    }

    .right {
        float: left;
        width: 150px;
    }
</style>