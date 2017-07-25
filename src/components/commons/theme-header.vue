<template>
  <div>
    <XHeader>
      <i class="iconfont" slot="overwrite-left" @click="popShow">&#xe600;</i>
      <span slot="left" class="title">{{ pageTitle }}</span>
      <i slot="right" class="iconfont collect">&#xe8a1;</i>
    </XHeader>
    <popup v-model="showPop" position="left" width="85%">
      <div class="themes">
        <div class="themes-head">
          <router-link to="/" class="user flex-box-row">
            <div class="user-img">
              <img :src="img.userImg" alt="default">
            </div>
            <div class="user-name">请登录</div>
          </router-link>
          <div class="operation flex-box-row">
            <router-link to="/" class="collection operate-item">
              <i class="iconfont">&#xe635;</i>
              <span class="txt">我的收藏</span>
            </router-link>
            <router-link to="/" class="download operate-item">
              <i class="iconfont">&#xe64a;</i>
              <span class="txt">离线下载</span>
            </router-link>
          </div>
        </div>
        <div class="themes-list">
          <ul>
            <li>
              <router-link to="/" class="index-item active"><i class="iconfont">&#xe70e;</i><span class="theme">首页</span></router-link>
            </li>
            <li v-for="item in themesList">
              <router-link :to="{path: '/theme/'+ item.id}" class="themes-item"><span class="theme">{{ item.name }}</span><i class="iconfont">&#xe610;</i></router-link>
            </li>
          </ul>
        </div>
      </div>
    </popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import { XHeader, Popup } from 'vux'
  export default {
    name: 'index-header',
    props: ['pageTitle'],
    components: {
      XHeader,
      Popup
    },
    data () {
      return {
        showPop: false,
        img: {
          userImg: require('@/assets/images/user/default.jpg')
        },
        themesList: {}
      }
    },
    beforeCreate () {
      let self = this;
      this.$ajax({
        url: '/themes',
        method: 'get',
        withCredentials: true
      }).then(function (res) {
        self.themesList = res.data.others;
        //console.log(res.data.others);
      }).catch ( function(err) {
        console.log(err)
      })/**/
      //console.log('end')
    },
    methods: {
      popShow () {
        this.showPop = true;
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/less/index.less";
  .vux-header {
    & .vux-header-left {
      & .title {
        font-size: 0.8rem;
        margin-left: 1rem;
        color: #fff;
      }
      & .iconfont {
        font-size: 0.8rem;
        color: #fff;
      }
    }
    & .vux-header-right {
      & .collect {
        color: #fff;
        font-size: 1rem;
        position: relative;
        top: -2px;
      }
    }
  }

  //主题弹出层样式
  .themes {
    width: 100%;
    background-color: #fff;
    & .themes-head {
      padding: 0.5rem @colspacing;
      padding-bottom: @rowspacing;
      background: @color-theme;
      color: #fff;
      & .user {
        font-size: @fs-middle;
        margin-bottom: 1rem;
        color: #fff;
        & .user-img {
          width: 1.5rem;
          height: 1.5rem;
          overflow: hidden;
          border-radius: 50px;
          margin-right: @colspacing;
          & img {
            width: 100%;
            height: 100%;
          }
        }
      }
      & .operation {
        //justify-content: center;
        & .operate-item {
          color: #fff;
          display: inline-block;
          //text-align: center;
          flex-grow: 1;
          padding-left: 0.35rem;
          & .iconfont {
            font-size: @fs-middle;
            margin-right: 1rem;
          }
          & .txt {
            //margin-left: 1rem;
          }
        }
        & .collection {
          padding-left: 0.35rem;
        }
      }
    }
    & .themes-list {
      & a {
        display: block;
        color: #000;
        font-size: @fs-middle;
        font-weight: bold;
        padding-left: @colspacing;
        padding-right: 2rem;
      }
      & .index-item {
        color: @color-theme;
        & .iconfont {
          padding: 0 1rem 0 0.3rem;
        }
      }
      & .themes-item {
        & .iconfont {
          float: right;
          font-size: @fs-normal;
          color: #aaa;
        }
      }
      & .active {
        //color: @color-theme;
        background: #EEEEEE;
      }
      & ul {

        color: #000;
        & li {
          line-height: 40px;

        }
      }
    }
  }
</style>
