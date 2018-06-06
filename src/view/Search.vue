<template>
    <div class="search">
        <div class="mark">
            <span class="labelstyle">热门标签：</span>
            <mu-chip class="demo-chip">
                <mu-avatar color="white" backgroundColor="red" :size="32">学</mu-avatar>高学历
            </mu-chip>
            <mu-chip class="demo-chip" >
                <mu-avatar color="white" backgroundColor="pink" :size="32">收</mu-avatar>高收入
            </mu-chip>
            <mu-chip class="demo-chip">
                <mu-avatar color="white" backgroundColor="yellow" :size="32">魅</mu-avatar>魅力
            </mu-chip>
            <mu-chip class="demo-chip">
                <mu-avatar color="white" backgroundColor="blue" :size="32">公</mu-avatar>公务员
            </mu-chip>
            <mu-chip class="demo-chip">
                <mu-avatar color="white" backgroundColor="purple" :size="32">房</mu-avatar>有房
            </mu-chip>
            <mu-chip class="demo-chip">
                <mu-avatar color="white" backgroundColor="orange" :size="32">车</mu-avatar>有车
            </mu-chip>
            <mu-chip class="demo-chip">
                <mu-avatar color="white" backgroundColor="lightgreen" :size="32">独</mu-avatar>独生子女
            </mu-chip>
        </div>

        <div class="searchbox">
            <mu-auto-complete hintText="按昵称搜索"
                              @input="handleInput"
                              :dataSource="dataSource"
                              icon="search"
                              :underlineShow="false"
                              v-model="searchValue"
                              @change="handleChange"
            />
            <div v-if="searchsource.length === 0" >赶快来搜索你的好友吧！</div>
            <mu-list>
                <mu-list-item v-for="(val, index) in searchsource" :key="index" title="">
                    <mu-avatar color="white" :src="val.src" backgroundColor="lightgreen" :size="32" @click="chatwindow(val.name)"></mu-avatar>&nbsp;&nbsp; {{val.name}}
                    &nbsp;&nbsp;{{val.age}}岁&nbsp;&nbsp; {{val.sex}}
                    <div style="position: absolute; right: 20px; top: 25px; background: #0582cd; color: white;" @click="addfriend(val.name)">添加好友</div>
                </mu-list-item>
            </mu-list>
        </div>
        <!--推荐-->
        <div class="recomd">
            <h2 class="loverecomd">可能喜欢</h2>
            <div class="gridlist-container">
                <mu-grid-list class="gridlist-inline-demo">
                    <mu-grid-tile v-for="(tile, index) in list" :key="index">
                        <img :src="tile.image"/>
                        <span slot="title">{{tile.title}}</span>
                        <span slot="subTitle">by <b>{{tile.author}}</b></span>
                        <mu-icon-button icon="star_border" slot="action" @click="chatwindow(tile.author)"/>
                    </mu-grid-tile>
                </mu-grid-list>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {clear, getItem, setItem} from '../utils/localStorage'
    import Alert from '../components/Alert'

    export default {
        name: "search",
        data () {
            return {
                value: '1',
                age: 1,
                heigth: 1,
                gram: 1,
                salay: 1,
                mager: 1,
                other: ['1'],
                dataSource: [],
                searchValue:'',
                searchsource: [],
                list: [{
                    image: './static/img/a28.jpg',
                    title: 'Breakfast',
                    author: 'Myron',
                    featured: true
                }, {
                    image: './static/img/a27.jpg',
                    title: 'Burger',
                    author: 'Linyu'
                }, {
                    image: './static/img/a26.jpg',
                    title: 'Camera',
                    author: 'ruolin'
                }, {
                    image: './static/img/a25.jpg',
                    title: 'Hats',
                    author: 'kakali'
                }, {
                    image: './static/img/a24.jpg',
                    title: 'Honey',
                    author: 'yuyang'
                }, {
                    image: './static/img/a23.jpg',
                    title: 'Morning',
                    author: 'mokayi',
                    featured: true
                }, {
                    image: './static/img/a22.jpg',
                    title: 'Vegetables',
                    author: 'NUyyyyyyy'
                }, {
                    image: './static/img/a21.jpg',
                    title: 'Vegetables',
                    author: 'NUyyyyyyy'
                }, {
                    image: './static/img/a20.jpg',
                    title: 'Vegetables',
                    author: 'NUyyyyyyy'
                }, {
                    image: './static/img/a19.jpg',
                    title: 'Vegetables',
                    author: 'NUyyyyyyy'
                }, {
                    image: './static/img/a18.jpg',
                    title: 'water',
                    author: 'TDDyyyyyyy'
                }]
            }
        },
        methods: {
            handleChange(value) {
                this.value = value
            },
            async handleInput (val) {
                this.dataSource = [val];
            },
            async handleChange () {
                const name = this.searchValue;
                const data = {
                    name: name
                };
                const res = await this.$store.dispatch('searchUserinfo', data)
                if (res.status === 'success') {
                    this.searchsource = res.data
                } else {
                    console.error("没有找到");
                }
            },
            tosearch: function () {
               this.$router.push({path: '/search'})
            },
            chatwindow(roomID) {
                this.$store.commit('setTab', false)
                this.$router.push({path: '/chat', query: {roomId: roomID}})
            },
            async addfriend (user) {
                var name = getItem('userid')
                const data = {
                    name: name,
                    newname: user
                };
                const res = await this.$store.dispatch('addFriends', data);
                if (res.status === 'success') {
                    await Alert({
                        content: res.data.data
                    })
                } else {
                    await  Alert({
                        content: res.data.data
                    })
                }
            }

        }
    }
</script>

<style scoped>
    .search {
       padding: 20px;
    }
    .labelstyle {
       color: #ec7f7f;
    }

    .gridlist-container{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin-top: 10px;
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
        height: 150px;
        overflow-y: auto;
    }

    .loverecomd{
        font-size: 14px;
        color: red;
    }
    .searchbox{
       margin: 20px 0;
    }

    .mu-auto-complete{
        border: 1px solid cornflowerblue;
        height: 46px;
        border-radius: 5px;
    }

    .mu-text-field-icon {
        position: absolute;
        left: 15px;
        top: 5px;
    }
    .mu-list {
        border-bottom: 2px solid #2b85e4;
    }

</style>


