<template>
    <div >
        <div class="wrap">
            <Swiper></Swiper>
        </div>
        <!--<div class="gridlist-container">-->
            <!--<mu-grid-list class="gridlist-inline-demo">-->
                <!--<mu-grid-tile v-for="(tile, index) in list" :key="index">-->
                    <!--<img :src="tile.image"/>-->
                    <!--<span slot="title">{{tile.title}}</span>-->
                    <!--<span slot="subTitle">by <b>{{tile.author}}</b></span>-->
                    <!--<mu-icon-button icon="star_border" slot="action" @click="tosearch"/>-->
                <!--</mu-grid-tile>-->
            <!--</mu-grid-list>-->
        <!--</div>-->

        <div class="gridlist-container">
            <h2 style="font-size: 14px; color: indianred;">每日推荐</h2>
            <ul class="showimg">
                <li v-for="(val, idx) in list" :key="idx">
                    <img :src="val.image"/>
                    <div class="titlebar" @click="chatwindow(val.author)">
                        <span style="color: white; font-size: 16px; ">{{val.age}}</span><br/>
                        <span style="color: white; font-size: 13px;">{{val.author}}</span>
                    </div>
                </li>
            </ul>
            <!--<mu-grid-list class="gridlist">-->
                <!--<mu-sub-header>图片展示</mu-sub-header>-->
                <!--<mu-grid-tile v-for="tile, index in list" :key="index">-->
                    <!--<img :src="tile.image"/>-->
                    <!--<span slot="title">{{tile.title}}</span>-->
                    <!--<span slot="subTitle">by <b>{{tile.author}}</b></span>-->
                    <!--<mu-icon-button icon="star_border" slot="action" @click="chatwindow(tile.author)"/>-->
                <!--</mu-grid-tile>-->
            <!--</mu-grid-list>-->
        </div>

        <!--底部固定提醒-->
        <div class="fixmsg">
            最新消息
        </div>

    </div>
</template>

<script>
    import Swiper from '../components/Swiper'
    import {mapGetters} from 'vuex'
    import io from 'socket.io-client'
    import Confirm from '../components/Confirm'
    import { getItem } from '../utils/localStorage.js'

    export default {
        name: 'show',
        data () {
            return {
                list: [{
                    image: './static/img/1.jpg',
                    title: 'Breakfast',
                    author: 'Myron',
                }, {
                    image: './static/img/1.jpg',
                    title: 'Burger',
                    author: 'Linyu',
                    age: '27/168'
                }, {
                    image: './static/img/1.jpg',
                    title: 'Camera',
                    author: 'ruolin'
                }, {
                    image: './static/img/1.jpg',
                    title: 'Hats',
                    author: 'kakali'
                },  {
                    image: './static/img/1.jpg',
                    title: 'Camera',
                    author: 'ruolin'
                }, {
                    image: './static/img/1.jpg',
                    title: 'Hats',
                    author: 'kakali'
                }, {
                    image: './static/img/1.jpg',
                    title: 'Hats',
                    author: 'kakali'
                },  {
                    image: './static/img/1.jpg',
                    title: 'Camera',
                    author: 'ruolin'
                }, {
                    image: './static/img/1.jpg',
                    title: 'Hats',
                    author: 'kakali'
                }]
            }
        },
        components: {
            Swiper
        },
        mounted () {
            // const uerId = getItem('userid')
            // if (!uerId) {
            //      Confirm({
            //         title: '提示',
            //         content: '请先登录'
            //     })
            //     this.$router.push({ path: 'login' })
            // } else {
            //     this.$store.commit('setTab', true)
            // }
            this.$store.commit('setTab', true)
        },
        created() {
            if (!this.getSocket) {
                this.$store.commit('setGetSocket', io.connect('localhost:9090/'))
            }
        },
        methods: {
            // tosearch: function () {
            //    this.$router.push({path: '/search'})
            // },
            chatwindow(roomID) {
                this.$store.commit('setTab', false)
                this.$router.push({path: '/chat', query: {roomId: roomID}})
            }
        },
        computed: {
            ...mapGetters([
                'getSocket'
            ])
        }

    }
</script>

<style scoped>
    #search {
        width: 100%;
        height: 200px;
        background: #ec7f7f;
    }

    h2{
        color: yellow;
    }
    /*.wrap{*/
        /*width: 100%;*/
        /*height: 200px;*/
        /*overflow: hidden;*/
    /*}*/

    /*.gridlist-container{*/
        /*display: flex;*/
        /*flex-wrap: wrap;*/
        /*justify-content: space-around;*/
    /*}*/

    /*.gridlist-inline-demo{*/
        /*display: flex;*/
        /*flex-wrap: nowrap;*/
        /*overflow-x: auto;*/
    /*}*/

    .gridlist-container{
        width: 100%;
    }

    .mu-grid-list{
        width: 33%;
        display: inline-block;
    }

    .gridlist{
        width: 100%;
    }

    .showimg{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .showimg li{
        width: 20%;
        height: 200px;
        position: relative;
        padding: 2px;
    }

    .showimg li img{
        width: 100%;
        height: 100%;
    }

    .titlebar {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 48px;
        background-color: rgba(0,0,0,.4);
        padding-left: 20px;
        margin: 0 2px;
    }

    .fixmsg{
        position: fixed;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 22px;
        background: yellow;
    }
</style>