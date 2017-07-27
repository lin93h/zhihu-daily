<template>
  <div class="storise">
    <v-header :pageTitle="title"></v-header>
    <!--<swiper :list="swiper_list" auto style="" height="180px" dots-class="custom-bottom" dots-position="center"></swiper>-->
    <swiper auto style="" height="180px" dots-class="custom-bottom" dots-position="center">
      <swiper-item v-for="(item, index) in bannerStore" :key="index" style="background: url('http://pic3.zhimg.com/2d41a1d1ebf37fb699795e78db76b5c2.jpg') no-repeat;background-size: 100%;">
        <!--<img src="http://pic3.zhimg.com/2d41a1d1ebf37fb699795e78db76b5c2.jpg" alt="img" style="width: 100%;height: 100%;">-->
        <p class="banner-title">{{ item.title }}</p>
      </swiper-item>
    </swiper>
    <div class="news-all">
      <div class="news-title">今日要闻</div>
      <div class="news-latest">
        <div class="latest-item flex-box-row" v-for="item in storeList" @click="fetchStore (item.id)">
          <div class="item-title overflow-moreline">
            {{ item.title }}
          </div>
          <div class="item-image">
            <img :src="item.images[0]" alt="img"><!---->
          </div>
        </div>
      </div>
    </div>
    <popup v-model="popValue" position="right" width="100%">
      <XHeader>
        <i class="iconfont" slot="overwrite-left" @click="closePop">&#xe606;</i>
        <div slot="right" class="icon-group flex-box-row">
          <i class="iconfont share">&#xe64f;</i>
          <i class="iconfont collect">&#xe635;</i>
          <div class="comments">
            <i class="iconfont">&#xe704;</i>
            <span class="num">41</span>
          </div>
          <div class="Likes">
            <i class="iconfont">&#xe8fd;</i>
            <span class="num">1.2k</span>
          </div>
        </div>
      </XHeader>
      <link rel="stylesheet" :href="store.css"><!--可能会覆盖原先有样式-->
      <div v-html="store.body"></div>
    </popup>
    <!--<img src="http://pic3.zhimg.com/2d41a1d1ebf37fb699795e78db76b5c2.jpg" alt="img">-->
    <button @click="getdata">ajax</button>
    <button @click="getdd">ajax</button>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import axios from 'axios'
  import { mapState } from 'vuex'
  import header from '@/components/commons/index-header'
  //import Swiper from '../../static/swiper/swiper-3.4.2.jquery.min'
  //import Swiper from 'swiper'
  import { Swiper, SwiperItem, Popup, XHeader } from 'vux'

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
      SwiperItem,
      Popup,
      XHeader
    },
    data () {
      return {
        popValue: false,
        title: '首页',
        storeList: [],
        store: {},
        bannerStore: [],
        swiper_list: demoList
      }
    },
    beforeCreate () {
      let self = this;
      this.$ajax({
        url: '/news/latest',
        method: 'get',
        withCredentials: true
      }).then(function (res) {
        self.storeList = res.data.stories;
        for (let i=0; i<5; i++) {
          self.bannerStore.push(self.storeList[i]);
        }
        //console.log(self.bannerStore);
        //self.swiper_list.push(data.data.stories[0]['images'][0])
        //console.log(self.storeList);
      }).catch ( function(err) {
        console.log(err)
      })/**/
      //console.log('end')
    },
    methods: {
      fetchStore (arg) {
        this.popValue = true;
        let self = this;
        axios({
          method: 'get',
          url: '/news/'+ arg
        }).then(function (res) {
          self.store = res.data;
          //console.log(self.store);
        }).catch(function (err) {
          console.log(err);
        })
      },
      closePop () {
        this.popValue = false;
      },
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

<style lang="less" scoped>
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
        justify-content: space-between;
        & .item-title {
          font-size: 0.8rem;
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
    & .icon-group {
      & .iconfont {
        margin-left: @colspacing;
        line-height: 22px;
      }
      & .num {
        color: #fff;
        display: inline-block;
        vertical-align: top;
        line-height: 22px;
      }
      & .collect {
        margin: 0 0.6rem 0 1.2rem;
      }
      & .comments {
        & .iconfont {
          display: inline-block;
          font-size: 0.9rem;
          line-height: 22px;
        }
      }
      & .Likes {
        & .iconfont {
          display: inline-block;
          font-size: 0.9rem;
        }
      }
    }
  }
</style>
