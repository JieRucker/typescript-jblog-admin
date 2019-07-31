/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/7/31 下午9:58
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/7/31 下午9:58
 */

import Vue from 'vue';
import Vuex from 'vuex';

import app from './app';
import user from './user';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
  }
});

export default store;

