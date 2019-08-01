import axios from 'axios'
import qs from 'query-string'
import store from '@/modules/app/vuex';
import {router} from '@/modules/app/router';

class BaseModule {

  private instance = axios.create();

  private dataMethodDefaults = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    withCredentials: true,
    transformRequest: [function (data: any) {
      return qs.stringify(data)
    }]
  };

  constructor() {
    this.init();
  }

  init() {
    axios.interceptors.request.use = this.instance.interceptors.request.use;

    // request拦截器
    this.instance.interceptors.request.use(config => {
        // 每次发送请求，检查 vuex 中是否有token,如果有放在headers中

        let token = window.sessionStorage.getItem('token');

        if (token) {
          config.headers.Authorization = token;
        }

        return config;
      }, err => {
        return Promise.reject(err);
      }
    );

    // respone拦截器
    this.instance.interceptors.response.use(response => {
        return response;
      }, err => {
        let {response} = err;
        if (response.status == 401) {
          store.commit("logout");  // token过期,清除
          router.replace({ //跳转到登录页面
            path: '/login'
          });
          return Promise.reject(err.response);
        }
      }
    )
  }

  get(url: string, config = {}) {
    return this.instance.get(url, config)
  }

  post(url: string, data: undefined, config?: object) {
    return this.instance.post(url, data, Object.assign({}, this.dataMethodDefaults, config))
  }

  patch(url: string, data: undefined, config?: object) {
    return this.instance.patch(url, data, Object.assign({}, this.dataMethodDefaults, config))
  }

  put(url: string, data: undefined, config?: object) {
    return this.instance.put(url, data, Object.assign({}, this.dataMethodDefaults, config))
  }

  delete(url: string, config?: object) {
    return this.instance.delete(url, config)
  }
}

export default BaseModule
