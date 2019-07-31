import BaseModule from "./BaseModule";

class SettingInterface extends BaseModule {

  private baseUrl: string = process.env.api.common_url;

  constructor() {
    super();
  }

  /*获取七牛云上传图片token*/
  public getQiniuToken() {
    return this.get(`${this.baseUrl}/api/setting/token`);
  }

  /*获取全局设置*/
  public getSetting() {
    return this.get(`${this.baseUrl}/api/setting`);
  }

  /*修改全局设置*/
  public alterSetting(data: any) {
    return this.patch(`${this.baseUrl}/api/setting`, data);
  }

  /*腾讯云上传*/
  public pic(data: any) {
    return this.post(`${this.baseUrl}/api/upload/pic`, data);
  }
}

export default new SettingInterface()
