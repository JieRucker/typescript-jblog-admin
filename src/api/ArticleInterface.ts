import BaseModule from "./BaseModule";

class ArticleInterface extends BaseModule {

  private baseUrl: string = process.env.api.common_url;

  constructor() {
    super();
  }

  /*获取文章列表*/
  public getArticleList(data: any) {
    return this.get(`${this.baseUrl}/api/article?current_page=${data.current_page}&page_size=${data.page_size}&keyword=${data.keyword}&tag=${data.tag}&state=${data.state}`);
  }

  /*添加文章*/
  public addArticle(data: any) {
    return this.post(`${this.baseUrl}/api/article`, data);
  }

  /*修改文章*/
  public alterArticle(data: any) {
    return this.patch(`${this.baseUrl}/api/article/${data._id}`, data);
  }

  /*通过文章id来获取文章*/
  public getArticleById(data: any) {
    return this.get(`${this.baseUrl}/api/article/${data._id}`, data);
  }

  /*通过文章id来删除文章*/
  public deleteArticleById(data: any) {
    return this.delete(`${this.baseUrl}/api/article/${data._id}`, data);
  }
}

export default new ArticleInterface()
