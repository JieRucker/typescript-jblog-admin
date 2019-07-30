<template>
  <div id="main" class="app-main">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from "vue-property-decorator";

  @Component({
    name: 'App',
  })
  export default class App extends Vue {

  }


  /*export default {
    data() {
      return {
        theme: this.$store.state.app.themeColor
      };
    }
  };*/
</script>

<style lang="scss">
  html, body {
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
  }

  .app-main {
    width: 100%;
    height: 100%;
  }
</style>
