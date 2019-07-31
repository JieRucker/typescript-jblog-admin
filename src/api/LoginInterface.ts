import BaseModule from './BaseModule';

class LoginInterface extends BaseModule {

  private baseUrl: string = process.env.api.common_url;

  constructor() {
    super();
  }

  /*获取验证码*/
  public getCheckcode() {
    return this.get(`${this.baseUrl}/api/setting/checkcode`)
  }

  /*登陆*/
  public login(data: any) {
    return this.post(`${this.baseUrl}/api/admin/login`, data);
  }

  /*注册*/
  public register(data: any) {
    return this.post(`${this.baseUrl}/api/admin/register`, data)
  }

  // 修改密码
  public resetPassword(data: any) {
    return this.patch(`${this.baseUrl}/api/admin/master`, data)
  }

  // 用户是否注册
  public isRegisted(data: any) {
    return this.post(`${this.baseUrl}/login/isRegisted`, data)
  }

  // 获取公钥
  public getPublicKey() {
    return this.get(`${this.baseUrl}/api/admin/key`)
  }
}

export default new LoginInterface()
