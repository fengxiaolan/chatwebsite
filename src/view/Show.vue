<template>
    <div >
        <div class="wrap">
            <Swiper></Swiper>
        </div>
        <div class="gridlist-demo-container">
            <mu-grid-list class="gridlist-inline-demo">
                <mu-grid-tile v-for="tile, index in list" :key="index">
                    <img :src="tile.image"/>
                    <span slot="title">{{tile.title}}</span>
                    <span slot="subTitle">by <b>{{tile.author}}</b></span>
                    <mu-icon-button icon="star_border" slot="action" @click="tosearch"/>
                </mu-grid-tile>
            </mu-grid-list>
        </div>

        <div class="gridlist--container">
            <mu-grid-list class="gridlist">
                <mu-sub-header>图片展示</mu-sub-header>
                <mu-grid-tile v-for="tile, index in list" :key="index">
                    <img :src="tile.image"/>
                    <span slot="title">{{tile.title}}</span>
                    <span slot="subTitle">by <b>{{tile.author}}</b></span>
                    <mu-icon-button icon="star_border" slot="action" @click="chatwindow(tile.author)"/>
                </mu-grid-tile>
            </mu-grid-list>
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
                    featured: true
                }, {
                    image: './static/img/1.jpg',
                    title: 'Burger',
                    author: 'Linyu'
                }, {
                    image: './static/img/1.jpg',
                    title: 'Camera',
                    author: 'ruolin'
                }, {
                    image: './static/img/1.jpg',
                    title: 'Hats',
                    author: 'kakali'
                }, {
                    image: './static/img/1.jpg',
                    title: 'Honey',
                    author: 'yuyang'
                }, {
                    image: './static/img/1.jpg',
                    title: 'Morning',
                    author: 'mokayi',
                    featured: true
                }, {
                    image: './static/img/1.jpg',
                    title: 'Vegetables',
                    author: 'NUyyyyyyy'
                }, {
                    image: './static/img/1.jpg',
                    title: 'water',
                    author: 'TDDyyyyyyy'
                }]
            }
        },
        components: {
            Swiper
        },
        mounted () {
            //const uerId = getItem('userid')
            // if (!uerId) {
            //     await Confirm({
            //         title: '提示',
            //         content: '请先登录'
            //     })
            //     this.$router.push({ path: 'login' })
            // } else {
            //     this.$store.commit('setTab', true)
            // }
            //this.$store.commit('setTab', true)
            const uerId = getItem('userid')
            if (!uerId) {
                 Confirm({
                    title: '提示',
                    content: '请先登录'
                })
                this.$router.push({ path: 'login' })
            } else {
                this.$store.commit('setTab', true)
            }
        },
        created() {
            if (!this.getSocket) {
                // if (process.env.NODE_ENV === 'development') {
                this.$store.commit('setGetSocket', io.connect('localhost:9090/'))
                // } else {
                //   this.$store.commit('setGetSocket', io.connect('http://www.qiufengh.com:9090/'))
                // }
            }
        },
        methods: {
            tosearch: function () {
               //this.$router.push({path: '/search'})
            },
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
    h2{
        color: yellow;
    }
    /*.wrap{*/
        /*width: 100%;*/
        /*height: 200px;*/
        /*overflow: hidden;*/
    /*}*/

    .gridlist-demo-container{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .gridlist-inline-demo{
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
    }

    .gridlist-container{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .gridlist{
        width: 100%;
        height: 450px;
        overflow-y: auto;
    }
</style>