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
        <img class="avatar" v-for="item in theme.editors" :src="item.avatar" alt="item.name">
      </div>
    </div>
    <div class="stories">
      <div class="store flex-box-row" v-for="item in theme.stories" @click="showPop(item.id)">
        <div class="title">{{ item.title }}</div>
        <img :src="item.images" :alt="item.title" v-if="item.images">
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
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import axios from 'axios'
  import header from '@/components/commons/theme-header'
  import { Swiper, SwiperItem, Popup, XHeader } from 'vux'
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
      /*let self = this;
      this.$ajax({
        url: '/theme/'+ id,
        method: 'get',
        withCredentials: true
      }).then(function (res) {
        self.theme = res.data;
        console.log(self.theme);
        console.log('created');
      }).catch ( function(err) {
        console.log(err)
      })*/
    },
    components: {
      'v-header': header,
      Swiper,
      SwiperItem,
      Popup,
      XHeader
    },
    methods: {
      closePop () {
        this.popValue = false;
      },
      showPop (arg) {
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
        //console.log(arg);
      },
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
