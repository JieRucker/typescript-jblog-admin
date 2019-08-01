<template>
  <div id="main" class="app-main">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from "vue-property-decorator";
  import {State, Getter, Action, Mutation, namespace} from 'vuex-class';

  const Module = namespace('app/');

  @Component({
    name: 'app',
  })
  export default class App extends Vue {
    @Module.State('themeColor') private ModuleStateThemeColor!: string;
    // @Module.Getter('oath') public ModuleGetterOath!: string;
    // @Module.Action('addHobby') public ModuleActionAddHobby!: (hobby: string) => void;
    // @Module.Mutation('ADD_HOBBY') public ModuleMutationAddHobby!: (hobby: string) => void;

    mounted(): void {
      this.init()
    }

    public init(): void {
      // state
      // console.log('themeColor', this.ModuleStateThemeColor);

      // 使用getter
      // console.log(this.ModuleAGetterOath);

      // 使用dispath
      // this.ModuleActionAddHobby('123');

      // 使用commit
      // this.ModuleMutationAddHobby('456');
    }
  }
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
