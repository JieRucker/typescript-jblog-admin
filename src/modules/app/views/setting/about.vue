<template>
  <Card style="width:80%" class="about">
    <p slot="title">
      关于
    </p>
    <Form :label-width="80">
      <FormItem label="贴图">
        <Input v-model="picture" placeholder="请输入贴图地址"></Input>
      </FormItem>
      <FormItem label="描述">
        <Input v-model="description" type="textarea" :autosize="{minRows: 2}"
               placeholder="请输入描述"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="save">保存</Button>
      </FormItem>
    </Form>
  </Card>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from "vue-property-decorator";

  @Component({
    name: 'about'
  })
  export default class About extends Vue {

    picture: string = '';
    description: string = '';

    async created() {
      await this.onLoad()
    }

    async onLoad() {
      let res = await this.$api.settingInterface.getSetting();
      let {code, msg, data = {}} = res.data;
      let info = data.info;
      let about = info.about;
      if (about) {
        let {picture, description} = about;
        this.picture = picture;
        this.description = description;
      }
    }

    async save() {
      let about = JSON.stringify({
        picture: '',
        description: ''
      });

      let params = {
        about
      };
      let res = await this.$api.settingInterface.alterSetting(params);
      let {code, msg, data = []} = res.data;
      return this.$Message.info(msg)
    }

  }
</script>
