<template>
    <div>
        <div class="recomd">
            <mu-card>
                <!--<mu-card-header title="Myron Avatar" subTitle="sub title">-->
                    <!--<mu-avatar src="/static/img/5.jpg" slot="avatar"/>-->
                <!--</mu-card-header>-->
                <!--<mu-card-media title="Image Title" subTitle="Image Sub Title">-->
                    <!--<img src="/static/img/5.jpg" />-->
                <!--</mu-card-media>-->
                <mu-card-title title="Content Title" subTitle="散落在指尖的阳光！"/>
                <mu-card-text>
                    散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
                    调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
                    似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
                    找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
                </mu-card-text>
                <!--<img src="/static/img/5.jpg" style="height: 200px; width: 100%;" />-->
            </mu-card>
        </div>
        <div class="acontent">
            <div class="demo-vsteper-container">
                <h2 style="color: red; font-size: 14px; background: pink;">活动流程：</h2>
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
            <div class="markactivity">
                <h2 style="color: red; font-size: 14px;">活动登记：</h2>
                <v-distpicker></v-distpicker>
                <mu-date-picker container="inline" hintText="时间选择"/><br/>
                <mu-text-field hintText="群号"/><br/>
                <mu-raised-button label="确定" class="demo-raised-button" primary/>
            </div>
        </div>
    </div>
</template>

<script>
    import VDistpicker from 'v-distpicker'
    export default {
        name: "activity",
        data() {
            return {
                activeStep: 0
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
                        message = 'fuck! 又 TM 出错了！！！'
                        break
                }
                return message
            },
            finished () {
                return this.activeStep > 2
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

    .mu-card-media>img {
        width: 100%;
        display: block;
        vertical-align: top;
        height: 200px;
    }


    .demo-vsteper-container{
        max-width: 380px;
        max-height: 400px;
        padding-right: 50px;
        border-right: 1px solid #7e8c8d;
        /*display: inline-block;*/
        float: left;
    }

    .demo-step-button {
        margin-top: 12px;
        margin-right: 12px;
    }

    .markactivity {
        padding-left: 50px;
        /*display: inline-block;*/
        float: right;
    }

    .acontent {
        margin: auto;
        padding: 0 50px;
    }
</style>