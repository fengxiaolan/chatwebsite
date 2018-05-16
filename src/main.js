import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './styles/default.css'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import './styles/main.styl'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VDistpicker from 'v-distpicker'
import 'swiper/dist/css/swiper.css'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
Vue.use(VDistpicker)
Vue.use(VueAwesomeSwiper)
Vue.use(MuseUI)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
