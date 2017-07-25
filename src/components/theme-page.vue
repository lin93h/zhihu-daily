<template>
  <div class="theme-page">
    <v-header :pageTitle="theme.name"></v-header>
    <swiper auto style="" height="180px" :show-dots=false>
      <swiper-item :style="'background: url('+theme.image+') no-repeat;background-size: 100%;'">
        <!--<img src="http://pic3.zhimg.com/2d41a1d1ebf37fb699795e78db76b5c2.jpg" alt="img" style="width: 100%;height: 100%;">-->
        <p class="banner-title">{{ theme.description }}</p>
      </swiper-item>
    </swiper>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from '@/components/commons/theme-header'
  import { Swiper, SwiperItem } from 'vux'
  export default {
    name: 'theme-page',
    data () {
      return {
        theme:{}
      }
    },
    mounted () {
      let id = this.$route.params.id;
      let self = this;
      this.$ajax({
        url: '/theme/'+ id,
        method: 'get',
        withCredentials: true
      }).then(function (res) {
        self.theme = res.data;
        console.log(self.theme);
      }).catch ( function(err) {
        console.log(err)
      })
      console.log(this.$route.params.id);
    },
    components: {
      'v-header': header,
      Swiper,
      SwiperItem
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
  }
</style>
