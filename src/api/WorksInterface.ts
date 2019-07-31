import BaseModule from "./BaseModule";

class WorksInterface extends BaseModule {

  private baseUrl: string = process.env.api.common_url;

  constructor() {
    super();
  }

  /*获取作品列表*/
  public getWorksList(data: any) {
    return this.get(`${this.baseUrl}/api/works?current_page=${data.current_page}&page_size=${data.page_size}&keyword=${data.keyword}&tag=${data.tag}&state=${data.state}`);
  }

  /*添加作品*/
  public addWorks(data: any) {
    return this.post(`${this.baseUrl}/api/works`, data);
  }

  /*修改作品*/
  public alterWorks(data: any) {
    return this.patch(`${this.baseUrl}/api/works/${data._id}`, data);
  }

  /*通过作品id来获取作品*/
  public getWorksById(data: any) {
    return this.get(`${this.baseUrl}/api/works/${data._id}`, data);
  }

  /*通过作品id来删除作品*/
  public deleteWorksById(data: any) {
    return this.delete(`${this.baseUrl}/api/works/${data._id}`, data);
  }
}

export default new WorksInterface()
