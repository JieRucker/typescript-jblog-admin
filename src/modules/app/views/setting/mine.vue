<template>
  <Card style="width:80%" class="mine">
    <p slot="title">
      个人信息
    </p>
    <Form :label-width="80">
      <FormItem label="头像">
        <Input v-model="person_info.avatar" placeholder="请输入头像地址"></Input>
      </FormItem>
      <FormItem label="封面">
        <Input v-model="person_info.cover" placeholder="请输入封面地址"></Input>
      </FormItem>
      <FormItem label="描述">
        <Input v-model="person_info.description" type="textarea" :autosize="{minRows: 2}"
               placeholder="请输入个人描述"></Input>
      </FormItem>
      <FormItem label="github">
        <Input v-model="person_info.github" placeholder="请输入github地址"></Input>
      </FormItem>
      <FormItem label="twitter">
        <Input v-model="person_info.twitter" placeholder="请输入推特地址"></Input>
      </FormItem>
      <FormItem label="juejin">
        <Input v-model="person_info.juejin" placeholder="请输入掘金地址"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="save">保存</Button>
      </FormItem>
    </Form>
  </Card>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from "vue-property-decorator";

  interface PersonInfo {
    avatar: string,
    /*头像*/
    cover: string,
    /*封面*/
    description: string,
    /*描述*/
    github: string,
    twitter: string,
    juejin: string,
  }

  @Component({
    name: 'mine'
  })
  export default class Mine extends Vue {

    person_info: PersonInfo = {
      avatar: '',
      cover: '',
      description: '',
      github: '',
      twitter: '',
      juejin: '',
    };

    async created() {
      await this.onLoad()
    }

    async onLoad() {
      let res = await this.$api.settingInterface.getSetting();
      let {code, msg, data = {}} = res.data;
      let info = data.info;
      let person_info = info.person_info;
      if (person_info) this.person_info = person_info
    }

    async save() {
      let params = {
        person_info: JSON.stringify(this.person_info)
      };
      let res = await this.$api.settingInterface.alterSetting(params);
      let {code, msg, data = []} = res.data;
      return this.$Message.info(msg)
    }

  }
</script>
