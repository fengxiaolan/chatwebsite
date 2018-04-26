<template>
  <div class="login">
    <!--<div class="header">-->
      <!--<mu-appbar title="Title">-->
        <!--<mu-flat-button label="登录" slot="default"/>-->
      <!--</mu-appbar>-->
    <!--</div>-->
    <div class="content">
      <h2 class="apptitle">登录</h2>
      <form action="" name="form2">
        <mu-text-field label="帐号" labelFloat name="username"/>
        <br/>
        <mu-text-field label="密码" type="password" labelFloat name="password"/>
        <br/>
        <mu-checkbox label="记住密码" iconClass="checkbox" labelClass="remlabel" v-model="remmber"/>
        <br/>
        <div class="btn-radius" @click="submit">登录</div>
      </form>
      <div @click="register" class="tip-user">注册帐号</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
//  import {mapGetters} from 'vuex'
//   import SvgModal from '../components/svg-modal'
  import Alert from '../components/Alert'
  import { setItem } from '../utils/localStorage.js'
  import axios from 'axios'
//  import Loading from '../components/loading/loading'

  export default{
    data() {
      return {
        loading: '',
        remmber: false
      }
    },
    methods: {
      async submit() {
        const name = document.form2.username.value.trim()
        const password = document.form2.password.value.trim()
        if (name !== '' && password !== '') {
          const data = {
            name: name,
            password: password
          }
          // this.loading = 'loading'
          const res = await this.$store.dispatch('loginSubmit', data)
          // if (res.status === 'success') {
          if(this.remmber){
            setItem('userid', res.data.name)
            setItem('src', res.data.src)
            await Alert({
              content: res.data.data
            })
            // this.getSvgModal.$root.$options.clear()
            this.$store.commit('setSvgModal', null)
            this.$router.push({path: '/'})
          } else {
            Alert({
              content: res.data.data
            })
          }
          document.form2.reset()
        } else {
          Alert({
            content: '用户名和密码不能为空'
          })
        }
      },
      register() {
        this.$router.push({path: 'register'})
      }
    },
    mounted() {
      // if (!this.getSvgModal) {
      //   const svg = SvgModal()
      //   this.$store.commit('setSvgModal', svg)
      // }
      //Loading.show()
    },
    created() {
        // axios.get('https://zhaoplus.com/api/ip')
        //     .then(result => {
        //         if (result.data.content.address) {
        //             //localStorage.addr = result.data.content.address;
        //             setItem('addr', result.data.content.address)
        //         }else{
        //             setItem('addr', '未知区域')
        //         }
        //     })
    },
    computed: {
      // getSvgModal() {
      //   return this.$store.state.svgmodal
      // }
    },
    watch: {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .login
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    background-image: url("https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3390114244,1903577621&fm=200&gp=0.jpg")
    background-size: 100% 100%
    background-position: center center
    .header
    .mu-appbar
      text-align: center
      .mu-flat-button-label
        font-size: 20px
    .apptitle
      text-align: center
      color: #ed3f14
      font-size: 20px
    .content
      width: 360px
      height: 340px
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      margin: auto
      background: rgba(0,0,0,0.3)
      .mu-text-field
        width: 100%
      .mu-raised-button
        min-width: 80px
        display: block
        width: 100%
        margin: 0 auto
        transition: all 0.375s
      .checkbox
        color: grey
      .remlabel
        color: grey
        &.loading
          width: 80px
          height: 80px
          border-radius: 50%
</style>
