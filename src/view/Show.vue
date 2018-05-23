<template>
    <div >
        <div class="wrap">
            <Swiper></Swiper>
        </div>

        <div class="gridlist-container">
            <h2 style="font-size: 14px; color: white; background: #f00; text-align: center; width: 100px;">每日推荐</h2>
            <ul class="showimg">
                <li v-for="(val, idx) in list" :key="idx">
                    <img :src="val.image"/>
                    <div class="titlebar" >
                        <span style="color: white; font-size: 16px; ">{{val.title}}</span><br/>
                        <span style="color: white; font-size: 13px;">{{val.author}}</span>
                        <p style="width: 50px; height: 20px; background: red; position: absolute; right: 10px;right: 10px;cursor: pointer;
                               bottom: 15px;color: white;text-align: center;font-size: 12px;line-height: 20px;border-radius: 1px 15px 15px 1px;"
                           @click="chatwindow(val.author)">打招呼</p>
                    </div>
                </li>
            </ul>
        </div>

        <div class="containright">
            <img :src="src" style="width: 80px; height: 80px; border-radius: 50%; margin-left: 80px;" @click="tomy"/>
            <mu-menu>
                <mu-menu-item title="上传形象照">
                    <mu-badge content="style" slot="after"/>
                </mu-menu-item>
                <mu-menu-item title="填写资料">
                    <mu-badge content="old" primary slot="after"/>
                </mu-menu-item>
                <mu-menu-item title="认证身份">
                    <mu-badge content="news" secondary slot="after"/>
                </mu-menu-item>
            </mu-menu>

            <div class="prolove">
                <h2 style="font-size: 14px; color: white; background: #f00; text-align: center; width: 100px; display: inline-block;">推荐情缘</h2>
                <h2 style="font-size: 14px; color: grey;  text-align: center; width: 100px; display: inline-block; cursor: pointer;"  @click="ssex">换一批</h2>

                <ul class="show">
                    <li v-for="(val, idx) in lovelist" :key="idx" @click="chatwindow(val.name)">
                        <img :src="val.src" style="width: 70px; height: 70px; border-radius: 50%;"/><br>
                        <span style="color: grey; font-size: 16px;">{{val.name}}</span>
                    </li>
                </ul>
            </div>
            <div class="litimg">
                <img src="static/img/b1.jpg" alt=""/>
                <img src="static/img/b2.jpg" alt=""/>
                <img src="static/img/b3.jpg" alt=""/>
            </div>
        </div>

        <div class="fiximg">
        </div>
        <!--底部固定提醒-->
        <div class="fixmsg">
            <mu-icon value="flight_takeoff" color="red"/>
            <span style="color: red; line-height: 26px; display: inline-block; height: 36px;position: absolute;bottom: -12px;margin-left: 6px;">查看最新消息</span>
        </div>
        <!--侧边栏固定扫码-->
        <div class="asides" @mouseover="overShow" @mouseleave="overhide">
            扫我咨询
            <div :class="{erma: showerma}"></div>
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
                src: '',
                sex: '',
                age: '',
                showerma: false,
                lovelist: [
                    {
                        age: 24,
                        name: 'alicke',
                        src: '/static/img/a20.jpg'
                    },
                    {
                        age: 24,
                        name: 'fdagg',
                        src: '/static/img/a18.jpg'
                    },
                    {
                        age: 24,
                        name: 'yrewtre',
                        src: '/static/img/a28.jpg'
                    },
                    {
                        age: 24,
                        name: 'feryy',
                        src: '/static/img/a26.jpg'
                    },
                    {
                        age: 24,
                        name: 'dfre',
                        src: '/static/img/a21.jpg'
                    },
                    {
                        age: 24,
                        name: 'retr',
                        src: '/static/img/a22.jpg'
                    }
                ],
                list: [{
                    image: './static/img/a1.jpg',
                    title: '快来撩我啊！',
                    author: 'Myron',
                }, {
                    image: './static/img/a3.jpg',
                    title: '等你',
                    author: 'ruolin'
                }, {
                    image: './static/img/a4.jpg',
                    title: '呵呵呵哒',
                    author: 'kakali'
                },  {
                    image: './static/img/a5.jpg',
                    title: '么么哒',
                    author: 'Bob'
                }, {
                    image: './static/img/a6.jpg',
                    title: '嘻嘻',
                    author: 'kakali'
                }, {
                    image: './static/img/a7.jpg',
                    title: '这里等你',
                    author: 'alic'
                },  {
                    image: './static/img/a8.jpg',
                    title: '人生无处不相逢',
                    author: 'ruolin'
                },  {
                    image: './static/img/a9.jpg',
                    title: 'Camera',
                    author: 'ruolin'
                },  {
                    image: './static/img/a10.jpg',
                    title: 'Camera',
                    author: 'ruolin'
                },  {
                    image: './static/img/a12.jpg',
                    title: 'Camera',
                    author: 'ruolin'
                },  {
                    image: './static/img/a13.jpg',
                    title: 'Camera',
                    author: 'ruolin'
                },  {
                    image: './static/img/a14.jpg',
                    title: 'Camera',
                    author: 'ruolin'
                },  {
                    image: './static/img/a15.jpg',
                    title: 'Camera',
                    author: 'ruolin'
                }, {
                    image: './static/img/a16.jpg',
                    title: 'Hats',
                    author: 'kakali'
                }, {
                    image: './static/img/a18.jpg',
                    title: 'Hats',
                    author: 'kakali'
                },  {
                    image: './static/img/a19.jpg',
                    title: 'Camera',
                    author: 'ruolin'
                },  {
                    image: './static/img/a20.jpg',
                    title: 'Camera',
                    author: 'ruolin'
                },  {
                    image: './static/img/a21.jpg',
                    title: 'Camera',
                    author: 'ruolin'
                }, {
                    image: './static/img/a22.jpg',
                    title: 'Hats',
                    author: 'kakali'
                }, {
                    image: './static/img/a23.jpg',
                    title: 'Hats',
                    author: 'kakali'
                }]
            }
        },
        components: {
            Swiper
        },
        mounted () {
            const uerId = getItem('userid')
            this.src = getItem('src')
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
                this.$store.commit('setGetSocket', io.connect('http://172.16.0.68:9090/'))
            }
        },
        methods: {
            chatwindow(roomID) {
                this.$store.commit('setTab', false)
                this.$router.push({path: '/chat', query: {roomId: roomID}})
            },
            overShow() {
                this.showerma = true
            },
            overhide() {
                this.showerma = false
            },
            tomy() {
                this.$router.push({path: '/home'})
            },
            async ssex() {
                /*//查看性别
                this.sex = getItem('sex')
                if(this.sex === '男'){
                    this.sex = '女'
                } else {
                    this.sex = '男'
                }
                const data = {
                    sex : this.sex
                }
                const res = await this.$store.dispatch('sMan', data);
                if (res.status === 'success') {
                    this.lovelist = res.data
                } else {
                    console.error("你可能喜欢");
                }*/
                this.sex = getItem('sex')
                this.age = getItem('age')
                if(this.sex === '男'){
                    this.sex = '女'
                } else {
                    this.sex = '男'
                }
                const data = {
                    sex : this.sex,
                    age : this.age
                }
                const res = await this.$store.dispatch('sAges', data);
                if (res.status === 'success') {
                    this.lovelist = res.data
                } else {
                    console.error("你可能喜欢");
                }
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
   .containright {
       float: right;
       width: 22%;
       margin-left: 3px;
       padding-top: 25px;
   }
   .litimg img {
      width: 100%;
      height: 100%;
   }

    .gridlist-container{
        width: 77%;
        float: left;
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
        width: 150px;
        height: 26px;
        background: #f3b93f;
        line-height: 26px;
    }

    .asides{
        position: fixed;
        right: 10px;
        bottom: 100px;
        background: #e2544c;
        color: white;
        width: 20px;
        height: 80px;
        text-align: center;
    }
    /*鼠标移动才显示*/
    .erma{
        width: 100px;
        height: 100px;
        position: fixed;
        right: 20px;
        bottom: 100px;
        background-image: url("../assets/erma.jpg");
        background-size: 100% 100%;
        background-position : center center;
    }

    .prolove {
        height: 250px;
    }

    .show {
        height: 250px;
        overflow-y: auto;
        width: 100%;
    }

    .show li {
        float: left;
        margin: 10px 10px;
        text-align: center;
    }
</style>