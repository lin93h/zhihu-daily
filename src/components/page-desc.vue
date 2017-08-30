<template>
  <div class="page-desc">
      <v-header :comments="comments" :popularity="popularity"></v-header>
      <link rel="stylesheet" :href="store.css"><!--可能会覆盖原先有样式-->
      <div v-html="store.body" class="con-body"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from 'axios'
  import header from '@/components/commons/page-header'
  export default {
      name: 'page-desc',
      data () {
        return {
            store: {},
            comments: '...',
            popularity: '...'
        }
      },
      components: {
        'v-header': header
      },
      beforeCreate () {
        let self = this;
        let id = this.$route.params.id;
        axios({
          url: '/news/'+id,
          method: 'get'
        }).then(function (res) {
          self.store = res.data;
          //console.log(res.data);
        }).catch ( function(err) {
          console.log(err)
        })
      },
      mounted () {
        let self = this;
        let id = this.$route.params.id;console.log(id)
        axios({
          url: '/story-extra/'+id
        }).then( function (res) {
          self.comments = res.data['comments']
          self.popularity = res.data['popularity']
          console.log(self.commonts)
        }).catch( function (err) {
          console.log(err)
        })
      }
  }
</script>

<style lang="less" scoped>
//@import "../assets/less/index.less";
  .page-desc-header ~ .con-body {
    margin-top: 46px;
  }
</style>