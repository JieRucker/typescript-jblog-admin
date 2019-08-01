/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/7/31 下午9:58
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/7/31 下午9:58
 */

import {otherRouter, appRouter} from '../../router/router';
import * as types from '../mutation-types';
import {GetterTree, ActionTree, MutationTree} from 'vuex';

interface State {
  isFullScreen: boolean;
  openedSubmenuArr: any[];
  menuTheme: string;
  themeColor: string;
  currentPath: any[];
  menuList: any[];
  activeMenuItem: null | string;
  routers: any[]
}

// state
const state: State = {
  isFullScreen: false,
  openedSubmenuArr: [], // 要展开的菜单数组
  menuTheme: 'dark', // 主题
  themeColor: '',
  currentPath: [], // 面包屑数组
  menuList: [],
  activeMenuItem: null, /*活动菜单*/
  routers: [
    otherRouter,
    ...appRouter
  ]
};

// getters
const getters: GetterTree<any, any> = {};

// actions
const actions: ActionTree<any, any> = {};

// mutations
const mutations: MutationTree<any> = {
  [types.UPDATE_MENU_LIST](state: State, payload: null) {
    let menuList: object[] = [];
    appRouter.forEach((item, index) => {
      let len = menuList.push(item);
      if (!item.children) return;
      let childrenArr = item.children.filter(child => child);
      if (childrenArr === undefined || childrenArr.length === 0) {
        menuList.splice(len - 1, 1);
      } else {
        let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]));
        handledItem.children = childrenArr;
        menuList.splice(len - 1, 1, handledItem);
      }
    });
    state.menuList = menuList;
  },
  [types.CHANGE_MENU_THEME](state: State, payload: string) {
    state.menuTheme = payload;
  },
  [types.CHANGE_MAIN_THEME](state: State, payload: string) {
    state.themeColor = payload;
  },
  [types.ADD_OPEN_SUBMENU](state: State, payload: object[]) {
    [...payload].forEach(m => {
      state.openedSubmenuArr.push(m)
    })
  },
  [types.SET_CURRENT_PATH](state: State, payload: any[]) {
    state.currentPath = payload;
  },
  [types.SET_ACTIVE_MENUITEM](state: State, payload: any) {
    state.activeMenuItem = payload.data.node.activeMenuItem || payload.name;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
