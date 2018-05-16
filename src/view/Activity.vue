<template>
    <div>
        <div class="recomd">
            <mu-card>
                <mu-card-header title="Myron Avatar" subTitle="sub title">
                    <mu-avatar src="/static/img/5.jpg" slot="avatar"/>
                </mu-card-header>
                <mu-card-media title="Image Title" subTitle="Image Sub Title">
                    <img src="/static/img/5.jpg" />
                </mu-card-media>
                <mu-card-title title="Content Title" subTitle="散落在指尖的阳光！"/>
                <mu-card-text>
                    散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
                    调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
                    似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
                    找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
                </mu-card-text>
            </mu-card>

           <!-- <div class="plyr">
                <video controls loop width="100%">
                    <source :src="videourl" type="video/mp4">
                    您的浏览器不支持 HTML5 视频,请更换浏览器。比如 Chrome 、 Firefox 等主流浏览器。
                </video>
            </div>-->

        </div>
        <div class="acontent">
            <div class="demo-vsteper-container">
                <h2 style="color: red; font-size: 16px; ">活动流程：</h2>
                <mu-stepper :activeStep="activeStep" orientation="vertical">
                    <mu-step>
                        <mu-step-label>
                            选择活动地点
                        </mu-step-label>
                        <mu-step-content>
                            <p>
                                在附近选择一个活动的地点, 最好靠近地铁站公交站，已方便交通，附近设施应尽量完善，最重要的是有Wifi
                            </p>
                            <mu-raised-button label="下一步" class="demo-step-button" @click="handleNext" primary/>
                        </mu-step-content>
                    </mu-step>
                    <mu-step>
                        <mu-step-label>
                            创建一个群组
                        </mu-step-label>
                        <mu-step-content>
                            <p>
                                创建群组，50人左右，以18-25单身青年为主。。。。。
                            </p>
                            <mu-raised-button label="下一步" class="demo-step-button" @click="handleNext" primary/>
                            <mu-flat-button label="上一步" class="demo-step-button" @click="handlePrev"/>
                        </mu-step-content>
                    </mu-step>
                    <mu-step>
                        <mu-step-label>
                            宣传活动
                        </mu-step-label>
                        <mu-step-content>
                            <p>
                                多在群里发消息宣传宣传，有事没事多在群里唠唠嗑，确定的话就ok拉
                            </p>
                            <mu-raised-button label="完成" class="demo-step-button" @click="handleNext" primary/>
                            <mu-flat-button label="上一步" class="demo-step-button" @click="handlePrev"/>
                        </mu-step-content>
                    </mu-step>
                </mu-stepper>
                <p v-if="finished">
                    都完成啦!<a href="javascript:;" @click="reset">点这里</a>可以重置
                </p>
            </div>
            <div v-if="member" class="markactivity" >
                <h2 style="color: red; font-size: 16px;">活动登记：</h2>
                <mu-text-field hintText="活动名称" v-model="name"/><br/>
                <v-distpicker :province="select.province" :city="select.city" :area="select.area"></v-distpicker>
                <mu-date-picker container="inline" hintText="时间选择" v-model="timepick"/><br/>
                <mu-text-field hintText="群号" v-model="groupno"/><br/>
                <mu-raised-button label="确定" primary @click="actok"/>
            </div>

            <div class="activityinfo">
                <h2 style="color: red; font-size: 16px;">活动展示：</h2>
                <mu-list>
                    <mu-list-item v-for="(val, idx) in actlist" :key="idx" :title="val.name">
                        <!--<span style="color: grey; font-size: 14px;">{{val.name}}</span>&nbsp;&nbsp;-->
                        <!--<span style="color: grey; font-size: 14px;">{{getdate(val.time)}}</span>&nbsp;&nbsp;-->
                        <span style="color: grey; font-size: 14px;">{{val.date}}</span>&nbsp;&nbsp;
                        <!--<span style="color: grey; font-size: 12px;">{{val.province}}-{{val.city}}-{{val.area}}</span>&nbsp;&nbsp;-->
                        <mu-icon slot="right" value="starred" data-id="idx"  @click="applyact(val.name)"/>
                        <!--<mu-icon slot="right" value="starred" data-id="idx"  @click="addstar(idx)"/>-->
                        <span style="color: darkgreen; font-size: 12px;" data-id="idx">{{actlist[idx].starnum?actlist[idx].starnum:0}}</span>
                    </mu-list-item>
                </mu-list>
            </div>
        </div>
    </div>
</template>

<script>
    import VDistpicker from 'v-distpicker'
    import Confirm from '../components/Confirm'
    import Alert from '../components/Alert'
    import dateFormat from '../utils/date'
    import {getItem} from '../utils/localStorage'

    export default {
        name: "activity",
        data() {
            return {
                activeStep: 0,
                name: '',
                select: {province: '四川省', city: '成都市', area: '武侯区'},
                timepick: '',
                groupno: '',
                actlist: [],
                starnum: 1,
                member: false,
                videourl: 'http://61.160.205.108/6572AB8060B4C8310129AD2BEC/030020010058955F14D6CF00000001C3D77E05-AA80-4A8B-8017-3D302C5C2AD1.mp4?ccode=050F&duration=64&expire=18000&psid=cf711da83968a3d6b3562ceaa7c77a4f&sp=&ups_client_netip=b695a103&ups_ts=1525617084&ups_userid=&utid=xU30EXRBtRsCATyrdU3Aj33u&vid=XMjM4MDgwMzYxNg%3D%3D&vkey=Bc91396d3bc332a4bef30a3325cfd4b35'
            }
        },
        components: {
            VDistpicker
        },
        computed: {
            content () {
                let message = ''
                switch (this.activeStep) {
                    case 0:
                        message = '选择一个活动的地点'
                        break
                    case 1:
                        message = '创建群组，50人左右'
                        break
                    case 2:
                        message = '多在群里发消息宣传宣传'
                        break
                    default:
                        message = '出错了！！！'
                        break
                }
                return message
            },
            finished () {
                return this.activeStep > 2
            }

        },
       async mounted() {
            const data = {};
            const res = await this.$store.dispatch('sActivitys', data)
            if (res.status === 'success') {
                this.actlist = res.data
            } else {
                console.error("更多活动");
            }
        },
        created() {
            var user = getItem('userid');
            this.username = user;
            if(user === 'admin'){
                this.member = true
            } else {
                this.member = false
            }
        },
        methods: {
            handleNext () {
                this.activeStep++
            },
            handlePrev () {
                this.activeStep--
            },
            reset () {
                this.activeStep = 0
            },
            async actok() {
                if (this.name !== '') {
                const data = {
                    name: this.name,
                    province: this.select.province,
                    city: this.select.city,
                    area: this.select.area,
                    groupno: this.groupno,
                    date: this.timepick
                }
                const res = await this.$store.dispatch('addActivity', data)
                    if (res.status === 'success') {
                        await Alert({
                            content: res.data.data
                        })
                        window.location.reload()
                    } else {
                        await Alert({
                            content: res.data.data
                        })
                    }
                } else {
                    Alert({
                        content: '活动名称不能为空！'
                    })
                }

            },
            getdate(time) {
                return dateFormat(new Date(time), 'yyyy-MM-dd HH:mm:ss')
            },
            addstar(index) {
                let data = this.actlist[index]
                if(data.starnum){
                    data.starnum = data.starnum + 1
                }else{
                    data.starnum = 1
                }
                this.actlist.splice(index,1,data)
            },
            async applyact(name) {
                var username = getItem('userid')
                const data = {
                    name: name,
                    username: username
                }
                const res = await this.$store.dispatch('applyActs', data)
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
    .demo-step-container {
        width: 100%;
        max-width: 700px;
    }

    .demo-step-content {
        margin: 0  16px;
    }

    .demo-step-button {
        margin-top: 12px;
        margin-right: 12px;
    }

    .mu-card-media > img {
        width: 100%;
        display: block;
        vertical-align: top;
        height: 400px;
    }


    .demo-vsteper-container{
        max-width: 380px;
        max-height: 400px;
        padding: 0 30px 0 0px;
        float: left;
    }

    .demo-step-button {
        margin-top: 12px;
        margin-right: 12px;
    }

    .markactivity {
        padding: 0 40px;
        float: left;
    }

    .acontent {
        margin: auto;
        padding: 0 30px;
    }

    .activityinfo{
        padding: 0 0 0 3px;
        float: left;
        width: 340px;
    }
    .mu-list{
        width: 100%;
    }
</style>