/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/7/31 下午9:58
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/7/31 下午9:58
 */

import {GetterTree, ActionTree, MutationTree} from 'vuex';
import {State} from "vuex-class";

const types = {
  SAVE_ADMIN_INFO: 'SAVE_ADMIN_INFO',
  LOGOUT: 'LOGOUT'
};

interface adminInfo {
  token: string;
  admin_name: string;
  admin_id: string;
  avatar: string;
}

interface State {
  adminInfo: adminInfo
}

// state
const state: State = {
  adminInfo: {
    token: window.sessionStorage.getItem('token') || '',
    admin_name: window.sessionStorage.getItem('admin_name') || '',
    admin_id: window.sessionStorage.getItem('admin_id') || '',
    avatar: '/static/images/logo/avatar.jpg'
  }
};

// getters
const getters: GetterTree<State, any> = {
  getAdminInfo: (state: State) => state.adminInfo,
};

// actions
const actions: ActionTree<any, any> = {};

// mutations
const mutations: MutationTree<State> = {
  [types.SAVE_ADMIN_INFO](state: State, payload: adminInfo) {
    state.adminInfo.token = payload.token;
    state.adminInfo.admin_name = payload.admin_name;
    state.adminInfo.admin_id = payload.admin_id;

    window.sessionStorage.setItem('token', payload.token);
    window.sessionStorage.setItem('admin_name', payload.admin_name);
    window.sessionStorage.setItem('admin_id', payload.admin_id);
  },
  [types.LOGOUT](state: State, payload: any) {
    state.adminInfo.token = '';
    state.adminInfo.admin_name = '';
    state.adminInfo.admin_id = '';

    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('admin_name');
    window.sessionStorage.removeItem('admin_id');

    // 恢复默认样式
    let themeLink = <HTMLElement> document.querySelector('link[name="theme"]');
    themeLink.setAttribute('href', '');
    // 清空打开的页面等数据，但是保存主题数据
    let theme = '';
    if (localStorage.theme) {
      theme = localStorage.theme;
    }
    localStorage.clear();
    if (theme) {
      localStorage.theme = theme;
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
