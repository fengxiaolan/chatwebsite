<!--<template>-->
  <!--<div class="webview">-->
    <!--&lt;!&ndash;<transition :name="transitionName">&ndash;&gt;-->
      <!--<router-view class="child-view"></router-view>-->
    <!--&lt;!&ndash;</transition>&ndash;&gt;-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--export default {-->
    <!--data () {-->
      <!--return {-->
        <!--transitionName: 'slide-left'-->
      <!--}-->
    <!--},-->
    <!--beforeRouteUpdate (to, from, next) {-->
      <!--let isBack = this.$router.isBack-->
      <!--if (isBack) {-->
        <!--this.transitionName = 'slide-right'-->
      <!--} else {-->
        <!--this.transitionName = 'slide-left'-->
      <!--}-->
      <!--this.$router.isBack = false-->
      <!--next()-->
    <!--}-->
  <!--}-->
<!--</script>-->

<!--<style>-->
  <!--.webview {-->
    <!--width: 100%;-->
    <!--height: 100%;-->
    <!--position: relative;-->
    <!--top: 0;-->
    <!--left: 0;-->
    <!--right: 0;-->
    <!--bottom: 0;-->
    <!--background: #fff;-->
    <!--overflow: hidden;-->

  <!--}-->
  <!--.child-view {-->
    <!--position: absolute;-->
    <!--z-index: 100;-->
    <!--height: 100%;-->
    <!--width: 100%;-->
    <!--overflow: hidden;-->
    <!--transition: all .4s cubic-bezier(.55,0,.1,1);-->
  <!--}-->
  <!--.slide-left-enter{-->
    <!-- -webkit-transform: translate(100%, 0);-->
    <!--transform: translate(100%, 0);-->
  <!--}-->
  <!--.slide-left-leave-active {-->
    <!-- -webkit-transform: translate(-100px, 0);-->
    <!--transform: translate(-100px, 0);-->
  <!--}-->
  <!--.slide-right-enter {-->
    <!-- -webkit-transform: translate(-100%, 0);-->
    <!--transform: translate(-100%, 0);-->
  <!--}-->
  <!--.slide-right-leave-active {-->
    <!-- -webkit-transform: translate(100%, 0);-->
    <!--transform: translate(100%, 0);-->
  <!--}-->
<!--</style>-->
