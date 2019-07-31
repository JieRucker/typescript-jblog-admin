/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/7/31 下午9:58
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/7/31 下午9:58
 */

import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import {routers} from './router';
// import store from '../vuex';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
  // mode: 'history',
  routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  //获取store里面的token
  let token = window.sessionStorage.getItem('token');
  // let token = store.state.user.adminInfo.token;

  //判断要去的路由有没有requiresAuth
  if (to.meta.requiresAuth) {
    if (token) {
      iView.LoadingBar.start();
      next();
    } else {
      next({
        path: '/login',
      });
    }
  } else {
    next();
  }
});

router.afterEach((to) => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});
