<template>
  <div style="display:inline-block;padding:0 6px;">
    <Dropdown trigger="click" @on-click="setTheme">
      <a href="javascript:void(0)">
        <Icon :style="{marginTop: '-2px', verticalAlign: 'middle'}" color="#495060" :size="18"
              type="paintbucket"></Icon>
        <Icon type="arrow-down-b"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem v-for="(item, index) in themeList" :key="index" :name="item.name">
          <Row type="flex" justify="center" align="middle">
            <span style="margin-right:10px;">
              <Icon :size="20" :type="item.name.substr(0, 1) !== 'b' ? 'happy-outline' : 'happy'"
                    :color="item.menu"/></span>
            <span><Icon :size="22" type="record" :color="item.element"/></span>
          </Row>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop, Watch} from 'vue-property-decorator';
  import {State, Getter, Action, Mutation, namespace} from 'vuex-class';
  import Cookies from 'js-cookie';

  const ModuleApp = namespace('app/');

  interface ThemeList {
    name: string;
    menu: string;
    element: string;
  }

  @Component({
    name: 'themeSwitch'
  })
  export default class ThemeSwitch extends Vue {

    @ModuleApp.State('themeColor') private themeColor!: string;
    @ModuleApp.Mutation('CHANGE_MENU_THEME') public changeMenuTheme!: (payload: string) => void;
    @ModuleApp.Mutation('CHANGE_MAIN_THEME') public changeMainTheme!: (payload: string) => void;

    themeList: Array<ThemeList> = [
      {
        name: 'black_b',
        menu: '#495060',
        element: '#2d8cf0'
      },
      {
        name: 'black_g',
        menu: '#495060',
        element: '#00a854'
      },
      {
        name: 'black_y',
        menu: '#495060',
        element: '#e96500'
      },
      {
        name: 'black_r',
        menu: '#495060',
        element: '#e43e31'
      },
      {
        name: 'light_b',
        menu: '#495060',
        element: '#2d8cf0'
      },
      {
        name: 'light_g',
        menu: '#495060',
        element: '#00a854'
      },
      {
        name: 'light_y',
        menu: '#495060',
        element: '#e96500'
      },
      {
        name: 'light_r',
        menu: '#495060',
        element: '#e43e31'
      }
    ];

    created() {
      this.onLoad();
    }

    onLoad() {
      let path = '/static/css/';

      let name = Cookies.get('user');
      if (localStorage.theme) {
        let hasThisUser = JSON.parse(localStorage.theme).some((item: any) => {
          if (item.userName === name) {
            this.changeMenuTheme(item.menuTheme);
            this.changeMainTheme(item.mainTheme);
            return true;
          } else {
            return false;
          }
        });
        if (!hasThisUser) {
          this.changeMenuTheme('dark');
          this.changeMainTheme('b');
        }
      } else {
        this.changeMenuTheme('dark');
        this.changeMainTheme('b');
      }
      // 根据用户设置主题
      if (this.themeColor !== 'b') {
        let stylesheetPath = path + this.themeColor + '.css';
        let themeLink = <HTMLInputElement>document.querySelector('link[name="theme"]');
        themeLink.setAttribute('href', stylesheetPath);
      }
    }

    setTheme(themeFile: string) {
      let menuTheme = themeFile.substr(0, 1);
      let mainTheme = themeFile.substr(-1, 1);
      if (menuTheme === 'b') {
        // 黑色菜单
        this.changeMenuTheme('dark');
        menuTheme = 'dark';
      } else {
        this.changeMenuTheme('light');
        menuTheme = 'light';
      }
      let path = '';
      let themeLink = <HTMLInputElement>document.querySelector('link[name="theme"]');
      let userName = Cookies.get('user');
      if (localStorage.theme) {
        let themeList = JSON.parse(localStorage.theme);
        let index = 0;
        let hasThisUser = themeList.some((item: any, i: any) => {
          if (item.userName === userName) {
            index = i;
            return true;
          } else {
            return false;
          }
        });
        if (hasThisUser) {
          themeList[index].mainTheme = mainTheme;
          themeList[index].menuTheme = menuTheme;
        } else {
          themeList.push({
            userName: userName,
            mainTheme: mainTheme,
            menuTheme: menuTheme
          });
        }
        localStorage.theme = JSON.stringify(themeList);
      } else {
        localStorage.theme = JSON.stringify([{
          userName: userName,
          mainTheme: mainTheme,
          menuTheme: menuTheme
        }]);
      }
      let stylePath = '/static/css/';

      if (mainTheme !== 'b') {
        path = stylePath + mainTheme + '.css';
      } else {
        path = '';
      }

      themeLink.setAttribute('href', path);
    }

  }
</script>
