<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import "assets/less/reset.css";
@import "assets/less/index.less";

#app {
  //background-color: @color-theme;
}
</style>
