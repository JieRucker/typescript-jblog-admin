<style lang="scss" scoped>
  @include b(register) {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    position: relative;
    @include b(content) {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 305px;
      z-index: 100;
      @include b(form) {
        padding: 10px 0 0;
      }
    }

    @include b(footer) {
      text-align: right;
      display: inherit;
      .tip {
        font-size: 10px;
        color: #c3c3c3;
        margin-right: 10px;
      }
    }
  }

  #indexLizi {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    overflow: hidden;
  }

  .register /deep/ {
    .ivu-input-group-append {
      padding: 0;
    }
  }
</style>

<template>
  <div class="register" @keydown.enter="handleSubmit" :style="loginStyle">
    <div class="content">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          注册
        </p>
        <div class="form">
          <Form ref="registerForm" :model="form" :rules="rules">
            <FormItem prop="phoneNum">
              <Input v-model="form.phoneNum" placeholder="请输入用户名">
              <span slot="prepend">
                <Icon :size="16" type="person"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem prop="passwd">
              <Input type="password" v-model="form.passwd" placeholder="必须包含英文、数字且8-16位">
              <span slot="prepend">
                <Icon :size="14" type="locked"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem prop="passwdCheck">
              <Input type="password" v-model="form.passwdCheck" placeholder="确认密码">
              <span slot="prepend">
                <Icon :size="14" type="locked"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long>确定注册</Button>
            </FormItem>
          </Form>
          <div class="footer">
            <a href="javascript:;" class="tip" @click="handleLogin">登录</a>
          </div>
        </div>
      </Card>
    </div>

    <div id="indexLizi">
    </div>
  </div>
</template>

<script lang="ts">
  import {Vue, Component} from 'vue-property-decorator';

  let passReg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z!@#$%^&*()_+~,.|{}?><\-\]\\[\/]+$)[0-9A-Za-z!@#$%^&*()_+~,.|{}?><\-\]\\[\/]{8,16}$/);

  function validatePass(rule: any, value: any, callback: any) {
    if (this.$Global.isBlank(value)) {
      callback(new Error('请输入密码'));
    } else if (!passReg.test(value)) {
      callback(new Error('必须包含英文、数字且8-16位'));
    } else {
      if (!this.$Global.isBlank(this.form.passwdCheck)) {
        // 对第二个密码框单独验证
        this.$refs.registerForm.validateField('passwdCheck');
      }
      callback();
    }
  }

  function validatePassCheck(rule: any, value: any, callback: any) {
    if (this.$Global.isBlank(value)) {
      callback(new Error('请再一次输入密码'));
    } else if (value.length < 8) {
      callback(new Error('密码需要8-16位'));
    } else if (value !== this.form.passwd) {
      callback(new Error('两次密码输入不一致'));
    } else {
      callback();
    }
  }

  interface Form {
    phoneNum: string;
    passwd: string;
    passwdCheck: string;
  }

  interface RulePhoneNum {
    required: boolean;
    message: string;
    trigger: string;
  }

  interface RulePasswd {
    validator: any;
    trigger: string;
  }

  interface RulePasswdCheck {
    validator: any;
    trigger: string;
  }

  interface Rules {
    phoneNum: RulePhoneNum[];
    passwd: RulePasswd[];
    passwdCheck: RulePasswdCheck[]
  }

  @Component({
    name: 'register'
  })
  export default class Register extends Vue {
    form: Form = {
      phoneNum: '',
      passwd: '',
      passwdCheck: ''
    };

    rules: Rules = {
      phoneNum: [
        {required: true, message: '用户名不能为空', trigger: 'blur'}
      ],
      passwd: [
        {validator: validatePass, trigger: 'blur'}
      ],
      passwdCheck: [
        {validator: validatePassCheck, trigger: 'blur'}
      ]
    };

    get loginStyle() {
      return {
        backgroundImage: `url(${process.env.api.static_url}static/images/login/login-bg.jpg)`,
      }
    }

    handleSubmit() {
      (this.$refs.registerForm as any).validate(async (valid: boolean) => {
        if (valid) {
          let params = {
            admin_name: this.form.phoneNum,
            admin_id: this.form.phoneNum,
            admin_pwd: this.form.passwdCheck,
          };

          let res = await this.$api.loginInterface.register(params);
          let {code, data, msg} = res.data;
          if (code === 200) {
            this.$Message.info('注册成功！');
            this.$router.push({
              name: 'login'
            });
            return false;
          }

          this.$Message.info(msg);
        }
      });
    }

    handleLogin() {
      this.$router.push({
        name: 'login'
      });
    }
  }


</script>
