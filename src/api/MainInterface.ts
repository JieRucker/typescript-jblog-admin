import BaseModule from "./BaseModule";

class MainInterface extends BaseModule {

  private baseUrl: string = process.env.api.common_url;

  constructor() {
    super();
  }

  // 登出
  public loginOut(data: any) {
    return this.post(`${this.baseUrl}/loginOut`, data)
  }
}

export default new MainInterface()
