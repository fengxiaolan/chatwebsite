<template>
    <div>
        <div class="userlist clear" >
        <h2 style="color: white; background: red; width: 100px; text-align: center;">会员列表</h2>
        <mu-list>
            <mu-sub-header>男会员列表</mu-sub-header>
            <mu-list-item v-for="(val, idx) in memlist" :key="idx">
                <mu-avatar :src="val.src" slot="leftAvatar"/>&nbsp;&nbsp;{{val.name}}&nbsp;&nbsp;{{val.sex}}&nbsp;&nbsp;{{val.age}}
                &nbsp;&nbsp;{{val.marry}} &nbsp;&nbsp;{{val.love}}
                <div style="position: absolute; right: 10px; top: 28px; color: red; font-size: 13px;" @click="remove(val.name)">删除</div>
                <!--<div style="position: absolute; right: 40px; top: 28px; color: red; font-size: 13px;" @click="updateuser">修改</div>-->
            </mu-list-item>
        </mu-list>
        <mu-list>
            <mu-sub-header>女会员列表</mu-sub-header>
            <mu-list-item v-for="(val, idx) in wmemlist" :key="idx">
                <mu-avatar :src="val.src" slot="leftAvatar"/>&nbsp;&nbsp;{{val.name}}&nbsp;&nbsp;{{val.sex}}&nbsp;&nbsp;{{val.age}}
                &nbsp;&nbsp;{{val.marry}} &nbsp;&nbsp;{{val.love}}
                <div style="position: absolute; right: 10px; top: 26px; color: red; font-size: 12px;" @click="remove(val.name)">删除</div>
                <!--<div style="position: absolute; right: 40px; top: 28px; color: red; font-size: 13px;" @click="updateuser">修改</div>-->
            </mu-list-item>
        </mu-list>
        </div>
        <br>
       <div style="color: red; font-size: 14px; background: #2b85e4; border-radius: 5px; width: 100px; text-align: center;" @click="updateuser">新增用户</div>
        <br>
        <div class="actlist clear">
            <h2 style="color: white; background: blueviolet; width: 100px; text-align: center;">活动列表</h2>
            <mu-list>
                <mu-list-item v-for="(val, idx) in actlist" :key="idx" :title="val.name">
                    {{val.username}}
                </mu-list-item>
            </mu-list>
        </div>

        <template v-if="isupdate">
            <div style="position: absolute; width: 400px; height: 400px; top: 0; left: 0; right: 0; bottom：0; margin: auto; background: lightblue; padding: 10px; z-index: 20;">
            <form action="" name="form1">
                <mu-text-field hintText="帐号" name="username"/>
                <br/>
                <mu-text-field hintText="密码" type="password" name="password"/>
                <br/>

                <mu-text-field hintText="年龄" v-model="ageval"/><br/>
                <mu-text-field hintText="薪资信息" v-model="salaryval"/><br/>

                <mu-radio label="男" name="sexgroup" nativeValue="男" v-model="sexval" />
                <mu-radio label="女" name="sexgroup" nativeValue="女" v-model="sexval" /><br/>

                <mu-radio label="未婚" nativeValue="未婚" name="margroup" v-model="marval"/>
                <mu-radio label="离异" nativeValue="离异" name="margroup" v-model="marval"/>
                <mu-radio label="丧偶" nativeValue="丧偶" name="margroup" v-model="marval"/><br/>

                <mu-checkbox name="check" nativeValue="旅游" label="旅游" v-model="loveval"/>
                <mu-checkbox name="check" nativeValue="看书" label="看书" v-model="loveval"/> <br/>
                <div class="btn-radius" @click="submit">确认修改</div>
            </form>
            </div>
        </template>
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
                actlistuser: [],
                sexval: '',
                marval: '',
                ageval: '',
                salaryval: '',
                loveval: [],
                isupdate: false
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
            },
            async submit() {
                const name = document.form1.username.value.trim()
                const password = document.form1.password.value.trim()
                let src
                if (name === 'xiaolan') {
                    src = './static/img/xiaolan.jpg'
                }
                src = './static/img/' + Math.ceil(Math.random() * 40) + '.jpg'
                if (name !== '' && password !== '') {
                    const data = {
                        name: name,
                        password: password,
                        src: src,
                        sex: this.sexval,
                        marry: this.marval,
                        age: this.ageval,
                        love: this.loveval,
                        salary:this.salary
                    }
                    const res = await this.$store.dispatch('registerSubmit', data)
                    if (res.status === 'success') {
                        await Alert({
                            content: res.data.data
                        })
                    } else {
                        await Alert({
                            content: res.data.data
                        })
                    }
                } else {
                    Alert({
                        content: '账号密码不能为空'
                    })
                }

                this.isupdate = false
            },
            login() {
                this.$router.push({path: 'login'})
            },
            updateuser() {
                this.isupdate = !this.isupdate
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