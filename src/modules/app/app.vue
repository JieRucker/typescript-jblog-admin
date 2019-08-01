<template>
  <div id="main" class="app-main">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from "vue-property-decorator";
  import {State, Getter, Action, Mutation, namespace} from 'vuex-class';

  const module = namespace('app');

  @Component({
    name: 'app',
  })
  export default class App extends Vue {
    // @module.State(state => state.themeColor) themeColor;
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
