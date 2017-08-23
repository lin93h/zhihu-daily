<template>
  <div id="app">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  
}
</script>

<style lang="less">
@import "assets/less/reset.css";
@import "assets/less/index.less";


</style>
