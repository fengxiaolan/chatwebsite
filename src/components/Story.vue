<template>
    <div>
        他们的故事
        <div class="storys" v-for="(val, idx) in storylist" :key="idx">
            <img :src="val.img" alt="他她故事" class="simg">
            <div class="right">
                <h2>{{val.title}}</h2>
                <p>{{val.cont}}</p>
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
                        cont: 'xxxxxxxxxx'
                    }
                ]
            }
        }
    }
</script>

<style scoped>
    .storys{
        width: 300px;
        height: 200px;
        display: inline-block;
        margin-right: 10px;
    }

    .simg {
        display: inline-block;
        width: 150px;
    }

    .right {
        display: inline-block;
        width: 150px;
    }
</style>