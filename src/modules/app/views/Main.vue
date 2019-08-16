<style lang="scss">
  @import "./main.scss";
</style>
<template>
  <div class="main-container" :class="{'main-hide-text': shrink}">
    <div class="main-container__sidebar" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
      <shrinkable-menu
        :shrink="shrink"
        :theme="getMenuTheme"
        :open-names="openedSubmenuArr"
        :menu-list="getMenuList">
        <div slot="top" class="main-container__logo">
                    <span class="main-container__logo--shrink" v-show="!shrink">
                        <!--<img src="../assets/images/logo/logo-min.png" key="max-logo"/>-->
                        <h3>J.Rucker的博客</h3>
                    </span>
          <span class="main-container__logo--shrink-min" v-show="shrink">
                        <!--<img v-show="shrink" src="../assets/images/logo/logo-min.png" key="min-logo"/>-->
                    </span>
        </div>
      </shrinkable-menu>
    </div>
    <div class="main-container__shrink" :style="{paddingLeft: shrink?'60px':'200px'}">
      <div class="main-container__header">
        <div class="navicon-con">
          <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text"
                  @click="shrink = !shrink;">
            <Icon type="navicon" size="32"></Icon>
          </Button>
        </div>
        <div class="header-middle-con">
          <div class="main-container__breadcrumb">
            <breadcrumb-nav :currentPath="getCurrentPath"></breadcrumb-nav>
          </div>
        </div>
        <div class="header-avator-con">
          <full-screen v-model="isFullScreen"></full-screen>
          <theme-switch></theme-switch>

          <div class="user-dropdown-menu-con">
            <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
              <Dropdown transfer trigger="click">
                <a href="javascript:;">
                  <span class="main-user-name">{{getAdminInfo.admin_name}}</span>
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="loginout" @click.native="loginOut">退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Avatar :src="getAdminInfo.avatar" icon="person" style="background: #619fe7;margin-left: 10px;"></Avatar>
            </Row>
          </div>
        </div>
      </div>
    </div>
    <div class="main-container__single" :style="{left: shrink?'60px':'200px'}">
      <div class="main-container__single-page">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
  import {State, Getter, Action, Mutation, namespace} from 'vuex-class';
  import shrinkableMenu from '../../../components/shrinkable-menu/shrinkable-menu.vue';
  import breadcrumbNav from '../../../components/breadcrumb/breadcrumb-nav.vue';
  import fullScreen from '../../../components/fullscreen/fullscreen.vue';
  import themeSwitch from '../../../components/theme-switch/theme-switch.vue';
  import {setCurrentPath} from '../../../libs/util';

  const ModuleApp = namespace('app/');
  const ModuleUser = namespace('user/');

  interface AdminInfo {
    admin_name: string;
    avatar: string;
  }

  @Component({
    name: 'Main',
    components: {
      shrinkableMenu,
      breadcrumbNav,
      fullScreen,
      themeSwitch
    }
  })
  export default class Main extends Vue {

    @ModuleApp.State('openedSubmenuArr') private openedSubmenuArr!: Array<any>;
    @ModuleApp.Getter('getMenuList') public getMenuList!: Array<any>;
    @ModuleApp.Getter('getCurrentPath') public getCurrentPath!: Array<any>;
    @ModuleApp.Getter('getMenuTheme') public getMenuTheme!: string;
    @ModuleApp.Mutation('ADD_OPEN_SUBMENU') public addOpenSubmenu!: (payload: any) => void;

    @ModuleApp.Mutation('LOGOUT') public logout!: () => void;
    @ModuleUser.Getter('getAdminInfo') public getAdminInfo!: AdminInfo;

    @Watch('$route', {immediate: true, deep: true})
    public onRoute(val: any, oldVal: any) {
      // setCurrentPath(this, val.name);
    }

    shrink: boolean = false;
    isFullScreen: boolean = false;

    mounted() {
      this.onLoad()
    }

    onLoad() {
      // setCurrentPath(this, this.$route.name);
      let openedSubmenuArr = this.$Global.VueDB().getItem('openedSubmenuArr').toJson();
      if (openedSubmenuArr) {
        this.addOpenSubmenu(openedSubmenuArr)
      }
    }

    loginOut() {
      this.logout();
      this.$router.push({
        name: 'login'
      });
    }

  }
</script>
