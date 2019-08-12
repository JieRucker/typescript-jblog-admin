<template>
  <div>
    <Form :label-width="60" inline>
      <FormItem label="标签：">
        <Select v-model="search.tag" style="width: 150px">
          <Option :value="item._id" :key="item._id" v-for="item in tagList">{{item.tags_name}}</Option>
        </Select>
      </FormItem>

      <FormItem label="状态：">
        <Select v-model="search.state" style="width: 150px">
          <Option :value="item.value" :key="item.value" v-for="item in stateOptions">{{item.name}}</Option>
        </Select>
      </FormItem>

      <FormItem label="搜索">
        <Input v-model="search.keyword" placeholder="请输入关键词"></Input>
      </FormItem>
      <Button type="primary" @click="handleSearch">搜索</Button>
      <Button type="default" style="margin-left: 10px" @click="handleArticle">写文章</Button>
    </Form>

    <Table :columns="columns" :data="list"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="table.args.total_count"
              :current="table.args.current_page"
              :page-size="table.args.page_size"
              show-total @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from "vue-property-decorator";

  interface Search {
    keyword: string;
    tag: number;
    state: number;
  }

  @Component({
    name: 'article-list'
  })
  export default class ArticleList extends Vue {
    // 非空断言
    /*$refs!:{
      chars: HTMLDivElement;
      content: HTMLDivElement;
    };*/
    search: Search = {
      keyword: '',
      tag: -1,
      state: -1
    };

    current_page: number = 1;
    page_size: number = 10;
    total_count: number = 0;

    stateOptions: Array<object> = [
      {
        name: '所有',
        value: -1
      },
      {
        name: '发布',
        value: 1
      },
      {
        name: '草稿',
        value: 0
      }
    ];

    tagList: Array<object> = [];

    list: Array<object> = [];

    columns = [
      {
        title: '文章标题',
        key: 'article_title'
      },
      {
        title: '创建日期',
        key: 'article_create_time',
        render: (h: any, params: any) => {
          return h('div', [
            h('Span', {}, params.row.article_create_time)
          ]);
        }
      },
      {
        title: '修改日期',
        key: 'article_update_time',
        render: (h: any, params: any) => {
          return h('div', [
            h('Span', {}, params.row.article_update_time)
          ]);
        }
      },
      {
        title: '标签',
        key: 'article_tags',
        render: (h: any, params: any) => {
          let a = null;
          if (params.row.article_tags.length) {
            a = h('ul', params.row.article_tags.map((item: any, key: any) => {
              return h('li', {
                style: {
                  float: 'left'
                },
                attrs: {
                  title: item.tags_desc
                }
              }, key === params.row.article_tags.length - 1 ? item.tags_name : `${item.tags_name},`)
            }))
          } else {
            a = h('Span', '无')
          }

          return a;
        }
      },
      {
        title: '状态',
        key: 'article_state',
        render: (h: any, params: any) => {
          return h('div', [
            h('Span', {}, ArticleList.formatState(params.row.article_state))
          ]);
        }
      },
      {
        title: '操作',
        render: (h: any, params: any) => {
          return h('div', [
            h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  let prefix = 'https://www.jrucker.cn';
                  window.open(`${prefix}/detail/${params.row._id}`, '_blank')
                }
              }
            }, '查看'),
            h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.$router.push({
                    name: 'create-article',
                    query: {
                      _id: params.row._id
                    }
                  })
                }
              }
            }, '修改'),
            h('Button', {
              props: {
                type: 'error',
                size: 'small'
              },
              on: {
                click: () => {
                  this.$Modal.confirm({
                    title: '提示',
                    content: '<p>确定删除？</p>',
                    onOk: async () => {
                      let res = await this.$api.articleInterface.deleteArticleById({_id: params.row._id});
                      let {msg} = res.data;
                      this.getArticleList();
                      return this.$Message.info(msg)
                    }
                  });
                }
              }
            }, '删除')
          ]);
        }
      },
    ];

    async created(): Promise<void> {
      await this.init()
    }

    async init() {
      let res = await this.$api.tagsInterface.getTagsList();
      let {article_num_list = [], tags_list = []} = res.data.data;
      tags_list.forEach((item: any) => {
        let temp = article_num_list.find((i: any): boolean => i._id === item._id);
        item.tags_article_num = temp == null ? 0 : temp.count;
      });

      this.tagList = tags_list.sort((a: any, b: any): boolean => {
        return a.tags_article_num < b.tags_article_num;
      });

      this.tagList = tags_list;
      this.tagList.unshift({
        tags_name: '所有',
        _id: -1
      });

      await this.getArticleList();
    }

    async getArticleList() {
      let obj = {
        keyword: this.search.keyword,
        tag: this.search.tag === -1 ? '' : this.search.tag,
        state: this.search.state === -1 ? '' : this.search.state,
        current_page: this.current_page,
        page_size: this.page_size,
        total_count: this.total_count
      };

      let res = await this.$api.articleInterface.getArticleList(obj);
      let {code, data = {}} = res.data;
      if (code === 200) {
        this.list = data.list;
        this.total_count = data.total;
      }
    }

    handleArticle() {
      this.$router.push({
        name: 'create-article'
      })
    }

    async handleSearch() {
      this.current_page = 1;
      await this.getArticleList();
    }

    async changePage(targetPage: number) {
      this.current_page = targetPage;
      await this.getArticleList();
    }

    static formatState(val: number): string {
      return val === 0 ? "草稿" : "发布";
    }

  }
</script>
