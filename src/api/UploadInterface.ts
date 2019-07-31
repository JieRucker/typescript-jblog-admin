import BaseModule from "./BaseModule";

class UploadInterface extends BaseModule {

  private baseUrl: string = process.env.api.common_url;

  constructor() {
    super();
  }

  /*获取上传列表*/
  public getUploadList(data: any) {
    return this.get(`${this.baseUrl}/api/upload/list?current_page=${data.current_page}&page_size=${data.page_size}&id=${data.id}`);
  }

  /*通过上传id来删除*/
  public deleteUploadById(data: any) {
    return this.delete(`${this.baseUrl}/api/upload/list/${data._id}`, data);
  }

  /*修改列表*/
  public alterUpload(data: any) {
    return this.patch(`${this.baseUrl}/api/upload/${data._id}`, data);
  }

  /*获取目录*/
  public getFold() {
    return this.get(`${this.baseUrl}/api/fold`);
  }

  /*添加目录*/
  public addFold(data: any) {
    return this.post(`${this.baseUrl}/api/fold`, data);
  }

  /*删除目录*/
  public deleteFold(data: any) {
    return this.delete(`${this.baseUrl}/api/fold/${data._id}`);
  }

  /*修改目录*/
  public alterFold(data: any) {
    return this.patch(`${this.baseUrl}/api/fold/${data._id}`, data);
  }

  public moveFold(data: any) {
    return this.post(`${this.baseUrl}/api/fold/move`, data);
  }

}

export default new UploadInterface()
