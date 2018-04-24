<template>
    <div class="swiper">
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(banner,index) in banners" :key="index">
                <a :href="banner.aurl" >
                    <img :src="banner.img" alt="">
                </a>
            </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-pagination"  slot="pagination"></div>
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
                    // autoplay: 3000,
                    // speed: 500,
                    // initialSlide: 0,
                    // loop: true,
                    // direction: 'vertical',
                    // pagination: '.swiper-pagination',
                    // prevButton:'.swiper-button-prev',
                    // nextButton:'.swiper-button-next',
                    // paginationClickable :true,
                    // preventClicks : false,
                    // slidesPerView: 'auto',
                    // centeredSlides: true
                    // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
                    // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
                    loop: true,
                    notNextTick: true,
                    autoplay: 3000,
                    direction : 'horizontal',
                    effect:"coverflow",
                    grabCursor : true,
                    setWrapperSize :true,
                    autoHeight: true,
                    paginationType:"bullets",
                    paginationClickable :true,
                    prevButton:'.swiper-button-prev',
                    nextButton:'.swiper-button-next',
                    observeParents:true,
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
    .swiper-wrapper{
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
    .swiper-container .swiper-pagination-bullet{
        width: 8px;
        height: 8px;
        background: #fff;
    }
    .swiper-container .swiper-pagination-bullet-active{
        width: 20px;
        border-radius: 5px;
        background: rgba(255,255,255,0.9);
    }
</style>