<template>
  <div class="storise">
    <v-header :pageTitle="title"></v-header>
    <!--<swiper :list="swiper_list" auto style="" height="180px" dots-class="custom-bottom" dots-position="center"></swiper>-->
    <swiper auto height="180px" dots-class="custom-bottom" dots-position="center">
      <swiper-item v-for="(item, index) in bannerStore" :key="index">
        <img :src="item.image" alt="img" style="width: 100%;"><!---->
        <p class="banner-title">{{ item.title }}</p>
      </swiper-item>
    </swiper>
    <div class="news-all">
      <div class="news-title">今日要闻</div>
      <div class="news-latest">
        <router-link v-for="item in storeList" :key="item.id" :to="{path: '/news/' + item.id}">
          <div class="latest-item flex-box-row">
            <div class="item-title overflow-moreline">
              {{ item.title }}
            </div>
            <div class="item-image">
              <img :src="item.images[0]" alt="img"><!---->
            </div>
          </div>
        </router-link>
      </div>
    </div>
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
        title: '首页',
        storeList: [],
        store: {},
        bannerStore: [],
        bannerId: []
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
        
        axios({
          url: '/hot',
          withCredentials: true
        }).then(function(res) {
          for (let i=6; i<=10; i++) {
            
            self.bannerId.push(res.data.recent[i]['news_id']);
            axios({
              url: '/news/' + res.data.recent[i]['news_id']
            }).then(function(res) {
              self.bannerStore.push(res.data);
              //console.log(res.data)
            }).catch( function (err) {
              console.log(err)
            })
          }
          //console.log(self.bannerStore)
          //console.log(self.bannerId)
        }).catch(function(err) {
          console.log(err)
        })
      }).catch ( function(err) {
        console.log(err)
      });/**/
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

<style lang="less" scoped>
  @import "../assets/less/index.less";
  //@import "../../static/swiper/swiper-3.4.2.min.css";
  .index-header ~ .vux-slider {
    padding-top: 46px;
  }
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
  }
</style>
