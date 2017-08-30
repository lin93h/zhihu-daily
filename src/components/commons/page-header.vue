<template>
  <div class="page-desc-header">
      <XHeader>
        <i class="iconfont" slot="overwrite-left" @click="goBack">&#xe606;</i>
        <div slot="right" class="icon-group flex-box-row">
          <i class="iconfont share">&#xe64f;</i>
          <i class="iconfont collect">&#xe635;</i>
          <router-link to="/">
            <div class="comments">
              <i class="iconfont">&#xe704;</i>
              <span class="num">{{ comments }}</span>
            </div>
          </router-link>
          <div class="Likes">
            <i class="iconfont">&#xe8fd;</i>
            <span class="num">{{ popularity }}</span>
          </div>
        </div>
      </XHeader>
  </div>
</template>

<script>
import { XHeader } from 'vux'
export default {
    name: 'page-desc',
    props: ['comments','popularity'],
    components: {
      XHeader
    },
    methods: {
      goBack () {
        window.history.go(-1)
      }
    }
}
</script>

<style lang="less" scoped>
@import "../../assets/less/index.less";
  .vux-header {
    position: fixed;
    width: 100%;
    top: 0;
  }
  .page-desc-header {
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