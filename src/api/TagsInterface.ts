import BaseModule from "./BaseModule";

class TagsInterface extends BaseModule {

  private baseUrl: string = process.env.api.common_url;

  constructor() {
    super();
  }

  /*获取标签列表*/
  public getTagsList() {
    return this.get(`${this.baseUrl}/api/tags`);
  }

  /*添加标签*/
  public addTags(data: any) {
    return this.post(`${this.baseUrl}/api/tags`, data);
  }

  /*修改标签*/
  public alterTags(data: any) {
    return this.patch(`${this.baseUrl}/api/tags/${data._id}`, data);
  }

  /*通过标签id来删除*/
  public deleteTagsById(data: any) {
    return this.delete(`${this.baseUrl}/api/tags/${data._id}`, data);
  }
}

export default new TagsInterface()
