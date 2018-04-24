<template>
  <div class="register">
    <div class="content">
      <h2 class="apptitle">注册</h2>
      <form action="" name="form1">
        <mu-text-field label="帐号" labelFloat name="username"/>
        <br/>
        <mu-text-field label="密码" type="password" labelFloat name="password"/>
        <br/>
        <div class="btn-radius" @click="submit">注册</div>
      </form>
      <div @click="login" class="tip-user">
        我已有帐号
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6" scoped>
  // import SvgModal from '../components/svg-modal'
  import { mapState } from 'vuex'
  import Alert from '../components/Alert'
  export default {
    methods: {
      async submit() {
        const name = document.form1.username.value.trim()
        const password = document.form1.password.value.trim()
        let src
        if (name === 'xiaolan') {
          src = './static/img/xiaolan.jpg'
        }
        src = './static/img/' + Math.ceil(Math.random() * 10) + '.jpg'
        if (name !== '' && password !== '') {
          const data = {
            name: name,
            password: password,
            src: src
          }
          const res = await this.$store.dispatch('registerSubmit', data)
          if (res.status === 'success') {
            await Alert({
              content: res.data.data
            })
            this.$router.push({path: '/login'})
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
      },
      login() {
        this.$router.push({path: 'login'})
      }
    },
    mounted() {
      // if (!this.svgmodal) {
      //   const svg = SvgModal()
      //   this.$store.commit('setSvgModal', svg)
      // }
    },
    computed: {
      ...mapState([
        'svgmodal'
      ])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .btn-radius
    width: 100%
    height: 40px
    margin-top: 30px
    border : 1px solid rgba(255, 255, 255, 0.38)
    background: rgba(255,255,255 ,0.02)
    color: #fff;
    line-height: 40px
    text-align : center
    border-radius: 5px
  .header
    .mu-appbar
      background-color: transparent
  .content
    margin: auto
    .mu-text-field-input
      color: #fff
    .mu-text-field.has-label .mu-text-field-label.float
      color: rgba(255, 255, 255, 0.38)
    .mu-text-field-label
      color: #fff
    .mu-text-field-line
      background-color: rgba(255, 255, 255, 0.38)
    .mu-text-field-focus-line
      background-color: #fff
    .tip-user
      width:100%
      text-align: center
      margin-top 20px
      color:#fff
  .register
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    background-image: url("https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3390114244,1903577621&fm=200&gp=0.jpg")
    background-size: 100% 100%
    background-position : center center
    .mu-appbar
      text-align: center
      .mu-flat-button-label
        font-size: 20px
    .apptitle
      text-align: center
      color: #ed3f14
      font-size: 20px
    .content
      width: 400px
      height: 280px
      position: absolute
      left: 0
      top: 0
      right: 0
      bottom: 0
      margin: auto
      .mu-text-field
        width: 100%
</style>
