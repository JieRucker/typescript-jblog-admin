<style lang="scss" scoped>
  .tags-toolbar {
    margin-bottom: 10px;
  }
</style>

<template>
  <div>
    <div class="tags-toolbar">
      <Button type="primary" @click="tagsHandler">添加标签</Button>
    </div>

    <Table :columns="columns" :data="list"></Table>
    <!--<div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="total_count"
              :current="current_page"
              :page-size="page_size"
              show-total @on-change="changePage"></Page>
      </div>
    </div>-->
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';
  import mTagsMdl from './modal/m-tags-mdl.vue';

  @Component({
    name: 'tags-list'
  })
  export default class TagsList extends Vue {

    current_page: number = 1;
    page_size: number = 10;
    total_count: number = 0;

    list: Array<object> = [];

    columns = [
      {
        title: '名称',
        key: 'tags_name'
      },
      {
        title: '描述',
        key: 'tags_desc'
      },
      {
        title: '文章数',
        key: 'tags_article_num'
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
                  this.$jDynamic.show({
                    component: 'mTagsMdl',
                    data: {
                      modalType: 1,
                      modalTitle: '修改标签',
                      tags: {
                        _id: params.row._id,
                        name: params.row.tags_name,
                        desc: params.row.tags_desc,
                      },
                      confirmfunc: async () => {
                        await this.getTagsList()
                      }
                    },
                    render: (h: any) => {
                      return h(mTagsMdl)
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
                      let res = await this.$api.tagsInterface.deleteTagsById({_id: params.row._id});
                      let {msg} = res.data;
                      await this.getTagsList();
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

    async created() {
      await this.getTagsList();
    }

    async getTagsList() {
      let res = await this.$api.tagsInterface.getTagsList();
      let {article_num_list = [], tags_list = []} = res.data.data;
      tags_list.forEach((item: any) => {
        let temp = article_num_list.find((i: any) => i._id === item._id);
        item.tags_article_num = temp == null ? 0 : temp.count;
      });

      this.list = tags_list.sort((a: any, b: any): boolean => {
        return a.tags_article_num < b.tags_article_num;
      });

      this.list = tags_list;
    }

    async changePage(targetPage: number) {
      this.current_page = targetPage;
      await this.getTagsList();
    }

    tagsHandler() {
      this.$jDynamic.show({
        component: 'mTagsMdl',
        data: {
          modalType: 0,
          modalTitle: '新建标签',
          confirmfunc: async () => {
            await this.getTagsList()
          }
        },
        render: (h: any) => {
          return h(mTagsMdl)
        }
      })
    }
  }
</script>
