<template>
  <div class="storise">
    <v-header :pageTitle="title"></v-header>
    <!--<swiper :list="swiper_list" auto style="" height="180px" dots-class="custom-bottom" dots-position="center"></swiper>-->
    <swiper auto style="" height="180px" dots-class="custom-bottom" dots-position="center">
      <swiper-item v-for="{n, index} in 5" :key="index" style="background: url('http://pic3.zhimg.com/2d41a1d1ebf37fb699795e78db76b5c2.jpg') no-repeat;background-size: 100%;">
        <!--<img src="http://pic3.zhimg.com/2d41a1d1ebf37fb699795e78db76b5c2.jpg" alt="img" style="width: 100%;height: 100%;">-->
        <p class="banner-title">义务爱了 完成传奇世界H5-王者归来任务 获得20金币</p>
      </swiper-item>
    </swiper>
    <div class="news-all">
      <div class="news-title">今日要闻</div>
      <div class="news-latest">
        <div class="latest-item flex-box-row" v-for="n in 3">
          <div class="item-title overflow-moreline">
            <div>这是标题这是标题内容这是标题是标题内这是标题这是标题内容这是标题这</div>
          </div>
          <div class="item-image">
            <img src="https://pic3.zhimg.com/v2-205718fd4539071ece06c125629a81ea.jpg" alt="img"><!---->
          </div>
        </div>
      </div>
    </div>

    <!--<img src="http://pic3.zhimg.com/2d41a1d1ebf37fb699795e78db76b5c2.jpg" alt="img">-->
    <button @click="getdata">ajax</button>
    <button @click="getdd">ajax</button>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import axios from 'axios'
  import header from '@/components/commons/index-header'
  //import Swiper from '../../static/swiper/swiper-3.4.2.jquery.min'
  //import Swiper from 'swiper'
  import { Swiper, SwiperItem } from 'vux'

  Vue.prototype.$ajax = axios

  const imgList = [
    'http://pic1.zhimg.com/84dadf360399e0de406c133153fc4ab8_t.jpg',
    'http://pic3.zhimg.com/2d41a1d1ebf37fb699795e78db76b5c2.jpg',
    'https://pic4.zhimg.com/v2-bf95d345848aa5ae07e0d1d172b16573.jpg',
    'http://pic3.zhimg.com/2d41a1d1ebf37fb699795e78db76b5c2.jpg',
    'https://pic4.zhimg.com/v2-bf95d345848aa5ae07e0d1d172b16573.jpg'
  ]
  const demoList = imgList.map((one, index) => ({
    url: 'javascript:',
    img: one,
    title: '送你一张图'
  }))
  export default {
    name: 'storise',
    components: {
      'v-header': header,
      Swiper,
      SwiperItem
    },
    data () {
      return {
        title: '首页',
        swiper_list: demoList
      }
    },
    created () {
      let self = this;
      this.$ajax({
        url: '/news/latest',
        method: 'get',
        withCredentials: true
      }).then(function (data) {
        //self.swiper_list.push(data.data.stories[0]['images'][0])
        console.log(data);
      }).catch ( function(err) {
        console.log(err)
      })
    },
    methods: {
      getdata () {
        this.$ajax({
          url: '/news/latest',
          method: 'get',
          withCredentials: true
        }).then(function (data) {
          console.log(data);
        }).catch ( function(err) {
          console.log(err)
        })
      },
      getdd () {
        this.$ajax({
          url: '/news/before/20131119',
          method: 'get',
          withCredentials: true,
        }).then(function (data) {
          console.log(data);
        }).catch ( function(err) {
          console.log(err)
        })
      }
    }
    /*mounted () {
      let swiper = new Swiper('.swiper-container', {
        autoplay: 1000,
        initialSlide :2
      })
    }*/
  }
</script>

<style lang="less">
  @import "../assets/less/index.less";
  //@import "../../static/swiper/swiper-3.4.2.min.css";

  .storise {
    & .banner-title {
      position: absolute;
      color: #fff;
      width: 90%;
      left: 5%;
      bottom: 35px;
      font-size: 1rem;
      line-height: 1rem;
    }
    & .news-all {
      padding: 0 0.5rem;
      & .news-title {
        padding: 0.6rem 0.5rem;
      }
      & .latest-item {
        padding: 0.7rem;
        margin-bottom: 0.5rem;
        background-color: #fff;
        align-items: flex-start;
        border-radius: 5px;
        & .item-title {
          font-size: 0.9rem;
          color: #000;
          -webkit-line-clamp: 3;
          margin-right: 0.7rem;
          line-height: 1.2rem;
        }
        & .item-image {
          width: 4.5rem;
          height: 3.5rem;
          overflow: hidden;
          flex-shrink: 0;
          & img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
