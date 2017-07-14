<template>
  <div>
    <XHeader>
      <i class="iconfont" slot="overwrite-left" @click="popShow">&#xe600;</i>
      <span slot="left" class="title">{{ pageTitle }}</span>
      <span slot="right">
      <i class="iconfont bell">&#xe649;</i>
      <i class="iconfont more">&#xe616;</i>
    </span>
    </XHeader>
    <popup v-model="showPop" position="left" width="85%"></popup>
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
        showPop: false
      }
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
      & .bell {
        color: #fff;
        font-size: 1.2rem;
        margin-right: 1rem;
      }
      & .more {
        color: #fff;
        font-size: 0.8rem;
        position: relative;
        top: -5px;
      }
    }
  }
</style>
