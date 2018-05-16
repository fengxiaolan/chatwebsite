<template>
  <div class="login">
    <div class="content">
      <form action="" name="form2">
        <mu-text-field  hintText="帐号" name="username" />
        <br/>
        <mu-text-field hintText="密码"  type="password" name="password"/>
        <br/>
        <mu-checkbox label="记住密码" iconClass="checkbox" labelClass="remlabel" v-model="remmber"/>
        <br/>
        <div class="btn-radius" @click="submit">登录</div>
      </form>
      <div @click="register" class="tip-user">注册帐号</div>
    </div>
    <vue-particles
            color="#f00"
    >
    </vue-particles>
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
        var reg = /^[\u4e00-\u9fff\\w]{3,16}$/ig;
        if (name !== '' && password !== '') {
          const data = {
            name: name,
            password: password
          }
          // this.loading = 'loading'
          const res = await this.$store.dispatch('loginSubmit', data)
          // if (this.remmber) {
          if(res.status === 'success'){
            setItem('userid', res.data.name)
            setItem('src', res.data.src)
            setItem('sex', res.data.sex)
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
    background-image: url("../assets/bg1.jpg")
    background-size: 100% 100%
    background-position: center center
    .header
    .mu-appbar
      text-align: center
      .mu-flat-button-label
        font-size: 20px
    .content
      width: 360px
      position: absolute
      top: 0
      left: 0
      height: 290px;
      background: white
      right: 0
      bottom: 0
      margin: auto
      padding: 20px
      .mu-text-field
        width: 100%
      .mu-raised-button
        min-width: 80px
        display: block
        width: 100%
        margin: 0 auto
        transition: all 0.375s
      .checkbox
        color: #9e9e9e
      .remlabel
        color: #9e9e9e
        &.loading
          width: 80px
          height: 80px
          border-radius: 50%
</style>
