<template>
  <div class="register">
    <div class="content">
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
    data () {
        return {
            sexval: '',
            marval: '',
            ageval: '',
            salaryval: '',
            loveval: []
        }
    },
    methods: {
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
    border : 1px solid #9e9e9e
    background: rgba(255,255,255 ,0.1)
    line-height: 40px
    text-align : center
    border-radius: 5px
    color: #e45038
  .header
    .mu-appbar
      background-color: transparent
  .content
    margin: auto
    .tip-user
      width:100%
      text-align: center
      margin-top 20px
      color:#9e9e9e
      cursor: pointer
  .register
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    background-image: url("../assets/bg2.jpg")
    background-size: 100% 100%
    background-position : center center
    .mu-appbar
      text-align: center
      .mu-flat-button-label
        font-size: 20px
    .content
      width: 360px
      height: 320px
      position: absolute
      left: 100px
      top: 50px
      .mu-text-field
        width: 100%
</style>
