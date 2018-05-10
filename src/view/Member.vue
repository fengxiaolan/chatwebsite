<template>
    <div>
        <div class="userlist clear" >
        <h2 style="color: white; background: red; width: 100px; text-align: center;">会员列表</h2>
        <mu-list>
            <mu-sub-header>男会员列表</mu-sub-header>
            <mu-list-item v-for="(val, idx) in memlist" :key="idx">
                <mu-avatar :src="val.src" slot="leftAvatar"/>&nbsp;&nbsp;{{val.name}}&nbsp;&nbsp;{{val.sex}}&nbsp;&nbsp;{{val.age}}
                &nbsp;&nbsp;{{val.marry}} &nbsp;&nbsp;{{val.love}}
                <mu-icon slot="right" value="info" @click="remove(val.name)"/>
            </mu-list-item>
        </mu-list>
        <mu-list>
            <mu-sub-header>女会员列表</mu-sub-header>
            <mu-list-item v-for="(val, idx) in wmemlist" :key="idx">
                <mu-avatar :src="val.src" slot="leftAvatar"/>&nbsp;&nbsp;{{val.name}}&nbsp;&nbsp;{{val.sex}}&nbsp;&nbsp;{{val.age}}
                &nbsp;&nbsp;{{val.marry}} &nbsp;&nbsp;{{val.love}}
                <mu-icon slot="right" value="info" @click="remove(val.name)"/>
            </mu-list-item>
        </mu-list>
        </div>

        <div class="actlist clear">
            <h2 style="color: white; background: red; width: 100px; text-align: center;">活动列表</h2>
            <mu-list>
                <mu-list-item v-for="(val, idx) in actlist" :key="idx" :title="val.name">
                    {{val.username}}
                </mu-list-item>
            </mu-list>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Alert from '../components/Alert'
    export default {
        name: "member",
        data() {
            return {
                sex: 0,
                memlist: [],
                wmemlist: [],
                actlist: [],
                actlistuser: []
            }
        },
        async mounted() {
            const data = {
                sex : '男'
            }
            const res = await this.$store.dispatch('sMan', data);
            if (res.status === 'success') {
                this.memlist = res.data
            } else {
                console.error("更多会员");
            }
        },
        async created() {
            const data = {
                sex : '女'
            }
            const res = await this.$store.dispatch('sMan', data);
            if (res.status === 'success') {
                this.wmemlist = res.data
            } else {
                console.error("更多会员");
            }

            const data1 = {};
            const res1 = await this.$store.dispatch('sApplys', data1)
            if (res1.status === 'success') {
                this.actlist = res1.data
            } else {
                console.error("更多详情");
            }
        },
        // async beforemount() {
        //     const data = {};
        //     const res = await this.$store.dispatch('sApplys', data)
        //     if (res.status === 'success') {
        //         this.actlist = res.data
        //     } else {
        //         console.error("更多详情");
        //     }
        // },
        methods: {
            async remove(name){
                const data = {
                    name: name
                }
                const res = await this.$store.dispatch('deleteUserinfo', data);
                if (res.status === 'success') {
                    console.log(res)
                    await Alert({
                        content: res.data.data
                    });
                    window.location.reload()
                } else {
                    console.error("没有找到");
                }
            }
        }

    }
</script>

<style scoped>
    .userlist {
        width: 100%;
    }
    .mu-list{
        width: 45%;
        margin-right: 40px;
        float: left;
        height: 300px;
        overflow-y: auto;
    }
    .actlist {
        width: 100%;
        margin: 20px 0 20px 0;
    }
</style>