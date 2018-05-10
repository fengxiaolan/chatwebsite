<template>
    <div>
        <div class="content">
            <mu-stepper :activeStep="activeStep" :linear="false">
                <mu-step :completed="visited.indexOf(0) !== -1">
                    <mu-step-button @click="changeStep(0)">
                       到店验证建档
                    </mu-step-button>
                </mu-step>
                <mu-step :completed="visited.indexOf(1) !== -1">
                    <mu-step-button @click="changeStep(1)">
                       选择相亲对象
                    </mu-step-button>
                </mu-step>
                <mu-step :completed="visited.indexOf(2) !== -1">
                    <mu-step-button @click="changeStep(2)">
                        专业红娘
                    </mu-step-button>
                </mu-step>
                <mu-step :completed="visited.indexOf(3) !== -1">
                    <mu-step-button @click="changeStep(3)">
                        浪漫约见，红娘搭桥
                    </mu-step-button>
                </mu-step>
            </mu-stepper>
        </div>
    </div>
</template>

<script>
    export default {
        name: "service",
        data () {
            return {
                activeStep: -1,
                visited: []
            }
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
                    case 3:
                        message = 'fdafe'
                        break
                    default:
                        message = '点击一个步骤开始'
                        break
                }
                return message
            }
        },
        methods: {
            changeStep (index) {
                this.activeStep = index
                this.visited.push(this.activeStep)
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
</style>