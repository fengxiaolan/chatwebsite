<template>
    <div class="swiper-container">
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(banner,index) in banners" :key="index">
                    <img :src="banner.img" :alt="banner.aurl">
            </swiper-slide>
            <!--<div class="swiper-button-prev" slot="button-prev" ></div>
            <div class="swiper-button-next" slot="button-next" ></div>-->
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script type="text/javascript">
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    export default {
        data(){
            return {
                banners:[
                    {img:'static/img/banner1.jpg',aurl:"http://www.baidu.com"},
                    {img:'static/img/banner2.jpg',aurl:"http://www.baidu.com"},
                    {img:'static/img/banner3.jpg',aurl:"http://www.baidu.com"},
                    {img:'static/img/banner4.jpg',aurl:"http://www.baidu.com"}
                ],
                swiperOption: {
                    autoplay: {stopOnLastSlide: true},
                    disableOnInteraction: true,
                    speed: 3000,
                    initialSlide: 0,
                    loop: true,
                    direction: 'horizontal',
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    // pagination: {
                    //     el: '.swiper-pagination',
                    //     clickable: true
                    // },
                    // navigation: {
                    //     nextEl: '.swiper-button-next',
                    //     prevEl: '.swiper-button-prev',
                    //     hideOnClick: true
                    // },
                    centeredSlides: true
                }
            }
        },
        components: {
            swiper,
            swiperSlide
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        mounted() {
            // 初始化轮播图
           // this.swiper.slideTo(1, 1000, false)
        }

    }
</script>

<style type="text/css">
    .swiper{
        height: 200px;
        width: 100%;
    }
    .swiper-slide {
        width: 100%;
        height: 200px;
    }
    .swiper-slide img{
        height: 200px;
        width: 100%;
    }
    /*.swiper-pagination-bullet{
        width: 8px;
        height: 8px;
        background: rgba(0,0,0,0.3);
    }
    .swiper-pagination-bullet-active{
        width: 20px;
        border-radius: 5px;
        background: rgba(255,255,255,0.9);
    }*/

</style>