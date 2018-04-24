<template>
    <div>
        <div class="mark">
            <span>热门标签：</span>
            <mu-chip class="demo-chip">
                <mu-avatar color="blue300" backgroundColor="indigo900" :size="32">学</mu-avatar>高学历
            </mu-chip>
            <mu-chip class="demo-chip" backgroundColor="blue300">
                <mu-avatar color="blue300" backgroundColor="indigo900" :size="32">收</mu-avatar>高收入
            </mu-chip>
            <mu-chip class="demo-chip" backgroundColor="blue300">
                <mu-avatar color="blue300" backgroundColor="indigo900" :size="32">魅</mu-avatar>魅力
            </mu-chip>
            <mu-chip class="demo-chip" backgroundColor="blue300">
                <mu-avatar color="blue300" backgroundColor="indigo900" :size="32">公</mu-avatar>公务员
            </mu-chip>
        </div>
        <div class="term">
            <span>条件：</span>
            性别： <mu-dropDown-menu :value="value" @change="handleChange">
                    <mu-menu-item value="1" title="男"/>
                    <mu-menu-item value="2" title="女"/>
                  </mu-dropDown-menu><br/>
            年龄范围：<mu-select-field v-model="age">
                        <mu-menu-item value="1" title="20-25"/>
                        <mu-menu-item value="2" title="25-30"/>
                        <mu-menu-item value="3" title="30-35"/>
                        <mu-menu-item value="4" title="35-40"/>
                    </mu-select-field>
            <br/>
            身高范围：<mu-select-field v-model="heigth">
                        <mu-menu-item value="1" title="150-160cm"/>
                        <mu-menu-item value="2" title="160-170cm"/>
                        <mu-menu-item value="3" title="170-180cm"/>
                        <mu-menu-item value="4" title="更高"/>
                    </mu-select-field>
            <br/>
            学历：<mu-select-field v-model="gram">
                    <mu-menu-item value="1" title="专科"/>
                    <mu-menu-item value="2" title="本科"/>
                    <mu-menu-item value="3" title="更高"/>
                    <mu-menu-item value="4" title="其他"/>
                </mu-select-field>
            <br/>
            薪资：<mu-select-field v-model="salay">
                    <mu-menu-item value="1" title="2000以内"/>
                    <mu-menu-item value="2" title="3000以内"/>
                    <mu-menu-item value="3" title="4000以内"/>
                    <mu-menu-item value="4" title="5000以内"/>
                    <mu-menu-item value="5" title="5000以上"/>
                </mu-select-field>
            <br/>
            出生年月：<mu-date-picker mode="landscape" hintText="请选择" /><br/>
            婚姻：<mu-select-field v-model="mager">
                    <mu-menu-item value="1" title="已婚"/>
                    <mu-menu-item value="2" title="未婚"/>
                    <mu-menu-item value="3" title="离异"/>
                </mu-select-field>
            <br/>
            更多：<mu-select-field v-model="other" multiple label="其他（可多选）">
                    <mu-menu-item value="1" title="魅力"/>
                    <mu-menu-item value="2" title="高收入"/>
                    <mu-menu-item value="3" title="高学历"/>
                    <mu-menu-item value="4" title="有车"/>
                    <mu-menu-item value="5" title="有房"/>
                    <mu-menu-item value="6" title="国家单位"/>
                </mu-select-field>
            <br/>
        </div>
        <div class="recomd">
            <mu-card>
                <mu-card-header title="Myron Avatar" subTitle="sub title">
                    <mu-avatar color="blue300" backgroundColor="indigo900" :size="32">MB</mu-avatar>推荐
                </mu-card-header>
                <mu-card-media title="Image Title" subTitle="Image Sub Title">
                    <img src="/static/img/5.jpg" />
                </mu-card-media>
                <mu-card-title title="Content Title" subTitle="Content Title"/>
                <mu-card-text>
                    散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
                    调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
                    似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
                    找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
                </mu-card-text>
                <mu-card-actions>
                    <mu-flat-button label="Action 1"/>
                    <mu-flat-button label="Action 2"/>
                </mu-card-actions>
            </mu-card>
        </div>
    </div>
</template>

<script>
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
                other: ['1']
            }
        },
        methods: {
            handleChange(value) {
                this.value = value
            }
        }
    }
</script>

<style scoped>

</style>