<template>
  <div class="theme-page">
    <v-header :pageTitle="theme.name" @regetdata="themeID"></v-header>
    <swiper auto style="" height="180px" :show-dots=false>
      <swiper-item :style="'background: url('+theme.image+') no-repeat;background-size: 100%;'">
        <!--<img src="http://pic3.zhimg.com/2d41a1d1ebf37fb699795e78db76b5c2.jpg" alt="img" style="width: 100%;height: 100%;">-->
        <p class="banner-title">{{ theme.description }}</p>
      </swiper-item>
    </swiper>
    <div class="theme-editors flex-box-row">
      <div class="txt">主编</div>
      <div class="editors">
        <img class="avatar" v-for="item in theme.editors" :src="item.avatar" :key="item.id" alt="item.name">
      </div>
    </div>
    <div class="stories">
      <router-link v-for="item in theme.stories" :key="item.id" :to="{path: '/news/' + item.id}">
        <div class="store flex-box-row">
          <div class="title">{{ item.title }}</div>
          <img :src="item.images" :alt="item.title" v-if="item.images">
        </div>
      </router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import axios from 'axios'
  import header from '@/components/commons/theme-header'
  import { Swiper, SwiperItem, XHeader } from 'vux'
  export default {
    name: 'theme-page',
    data () {
      return {
        popValue: false, //遮罩控制变量
        theme:{},//当前主题的全部消息概括信息
        store: {} //特定消息的详细信息
      }
    },
    created () {
      let id = this.$route.params.id;
      this.themeID(id);
    },
    components: {
      'v-header': header,
      Swiper,
      SwiperItem,
      XHeader
    },
    methods: {
      themeID (arg) {
        let self = this;
        this.$ajax({
          url: '/theme/'+ arg,
          method: 'get',
          withCredentials: true
        }).then(function (res) {
          self.theme = res.data;
          //Vue.set(Vue.theme, res.data);
          //console.log(self.theme);
          //console.log('watch');
        }).catch ( function(err) {
          console.log(err)
        });
        //console.log(arg + 'themeId');
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../assets/less/index.less";
  .theme-header ~ .vux-slider {
    padding-top: 46px;
  }
  .theme-page {
    & .banner-title {
      position: absolute;
      color: #fff;
      width: 90%;
      left: 5%;
      bottom: 35px;
      font-size: 1rem;
      line-height: 1rem;
    }
    & .txt {
      padding: @rowspacing 0.5rem;
      color: #666;
    }
    & .avatar {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50px;
      margin: 0 0.2rem;
    }
    & .stories {
      padding: 0 0.5rem;
      & .store {
        align-items: flex-start;
        justify-content: space-between;
        background: #fff;
        margin-top: 0.5rem;
        padding: 0.5rem;
        min-height: 3.4rem;
        border-radius: 5px;
      }
      & .title {
        font-size: @fs-big;
        color: #000;
      }
      & img {
        //margin-left: 0.5rem;
        width: 4rem;
        height: 3.5rem;
      }
    }
  }
</style>
