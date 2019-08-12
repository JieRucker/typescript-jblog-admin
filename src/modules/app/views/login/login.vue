<style lang="scss" scoped>
  @include b(login) {
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
        .code {
          cursor: pointer;
        }
      }
    }
    @include b(footer) {
      text-align: right;
      display: inherit;
      .register-btn {
        font-size: 10px;
        color: #c3c3c3;
        margin-right: 10px;
      }
      .reset-btn {
        font-size: 10px;
        color: #c3c3c3;
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

  .login /deep/ {
    .ivu-input-group-append {
      padding: 0;
    }
  }
</style>

<template>
  <div class="login" @keydown.enter="handleSubmit" :style="loginStyle">
    <div class="content">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          登录
        </p>
        <div class="form">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="phoneNum">
              <Input v-model="form.phoneNum" placeholder="请输入用户名">
              <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="form.password" placeholder="必须包含英文、数字且8-16位">
              <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
              </Input>
            </FormItem>
            <FormItem prop="code">
              <Input v-model="form.code" placeholder="请输入验证码">
              <span slot="append">
                 <img class="code" @click="getCode" :src="checkCodeImg"
                      style="width: 60px;height: 31px;vertical-align: middle;" alt="验证码"/>
                                </span>
              </Input>
            </FormItem>

            <FormItem>
              <Button @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
          <div class="footer">
            <a href="javascript:;" class="register-btn" @click="handleRegister">注册</a>
          </div>
        </div>
      </Card>
    </div>

    <div id="indexLizi">
    </div>
  </div>
</template>

<script lang="ts">
  import {Vue, Component, Prop} from "vue-property-decorator";
  import JSEncrypt from 'jsencrypt';
  import THREE from "@/libs/three/three";

  interface Form {
    phoneNum: string;
    password: string;
    code: string;
  }

  interface RulePhoneNum {
    required: boolean;
    message: string;
    trigger: string;
  }

  interface RulePassword {
    required: boolean;
    message: string;
    trigger: string;
  }

  interface RuleCode {
    required: boolean;
    message: string;
    trigger: string;
  }

  interface Rules {
    phoneNum: RulePhoneNum[];
    password: RulePassword[];
    code: RuleCode[]
  }

  @Component({
    name: 'login'
  })
  export default class Login extends Vue {
    form: Form = {
      phoneNum: '',
      password: '',
      code: ''
    };

    rules: Rules = {
      phoneNum: [
        {required: true, message: '用户名不能为空', trigger: 'blur'}
      ],
      password: [
        {required: true, message: '密码不能为空', trigger: 'blur'}
      ],
      code: [
        {required: true, message: '验证码不能为空', trigger: 'blur'}
      ]
    };
    checkCodeToken: string = '';
    checkCodeImg: string = '';
    interval: any = null;

    get loginStyle(): object {
      return {
        backgroundImage: `url(${process.env.api.static_url}static/images/login/login-bg.jpg)`,
      }
    }

    created(): void {
      this.getCode();
    }

    async getCode() {
      let res = await this.$api.loginInterface.getCheckcode();
      let {code, data} = res.data;
      if (code === 200) {
        let {token, img} = data;
        this.checkCodeToken = token;
        this.checkCodeImg = img;
      }
    }

    handleSubmit() {
      (this.$refs.loginForm as any).validate(async (valid: boolean) => {
        if (valid) {
          let res = await this.$api.loginInterface.getPublicKey();
          let {code, data} = res.data;

          if (code === 200) {

            let publicKey = data;
            let encrypt = (new JSEncrypt as any).JSEncrypt();
            encrypt.setPublicKey(publicKey);

            let params = {
              admin_id: this.form.phoneNum,
              admin_pwd: encrypt.encrypt(this.form.password),
              code: this.form.code,
              token: this.checkCodeToken
            };

            this.loginInterface(params);
          }
        }
      });
    }

    async loginInterface(params: any) {
      let res = await this.$api.loginInterface.login(params);

      let {code, data, msg} = res.data;
      if (code === 200) {
        this.$Message.info('登录成功！');

        this.$store.commit("saveAdminInfo", {
          admin_id: data.admin_id || '',
          admin_name: data.admin_name || '',
          token: data.token || ''
        });

        // let redirectUrl = decodeURIComponent(this.$route.query.redirect || '/article/article-list');
        //跳转到指定的路由
        this.$router.push({
          path: '/article/article-list'
        });
        return false;
      }

      this.form.code = '';
      this.getCode();
      this.$Message.info(msg);

    }

    handleRegister() {
      this.$router.push({
        name: 'register'
      });
    }

    liziInit() {
      let SCREEN_WIDTH = window.innerWidth;
      let SCREEN_HEIGHT = window.innerHeight;
      let SEPARATION = 90;
      let AMOUNTX = 50;
      let AMOUNTY = 50;
      let container;
      let particles: any, particle: any;
      let count: number;
      let camera: any;
      let scene: any;
      let renderer: any;
      let mouseX = 0;
      let mouseY = 0;
      let windowHalfX = window.innerWidth / 2;
      let windowHalfY = window.innerHeight / 2;
      init();
      this.interval = setInterval(loop, 1000 / 40);

      function init() {
        container = document.createElement("div");
        container.style.position = "relative";
        container.style.top = "200px";
        (document.getElementById("indexLizi") as any).appendChild(container);
        camera = new THREE.Camera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
        camera.position.z = 1000;
        scene = new THREE.Scene();
        renderer = new THREE.CanvasRenderer();
        renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        particles = [];
        let i = 0;
        let material = new THREE.ParticleCircleMaterial(0x097bdb, 1);
        for (let ix = 0; ix < AMOUNTX; ix++) {
          for (let iy = 0; iy < AMOUNTY; iy++) {
            particle = particles[i++] = new THREE.Particle(material);
            particle.position.x = ix * SEPARATION - AMOUNTX * SEPARATION / 2;
            particle.position.z = iy * SEPARATION - AMOUNTY * SEPARATION / 2;
            scene.add(particle);
          }
        }
        count = 0;
        container.appendChild(renderer.domElement);
        document.addEventListener("mousemove", onDocumentMouseMove, false);
        document.addEventListener("touchmove", onDocumentTouchMove, false);
      }

      let mousemovetimer: any = null;

      function onMouseMove(event: MouseEvent) {
        window.clearTimeout(mousemovetimer);
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
        mousemovetimer = null;
      }

      function onDocumentMouseMove(event: MouseEvent) {
        if (!mousemovetimer)
          mousemovetimer = window.setTimeout(onMouseMove, 50, event);
      }

      function onDocumentTouchMove(event: TouchEvent) {
        if (event.touches.length == 1) {
          event.preventDefault();
          mouseX = event.touches[0].pageX - windowHalfX;
          mouseY = event.touches[0].pageY - windowHalfY;
        }
      }

      function loop() {
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y = 364;
        let i = 0;
        for (let ix = 0; ix < AMOUNTX; ix++) {
          for (let iy = 0; iy < AMOUNTY; iy++) {
            particle = particles[i++];
            particle.position.y =
              Math.sin((ix + count) * 0.3) * 50 +
              Math.sin((iy + count) * 0.5) * 50;
            particle.scale.x = particle.scale.y =
              (Math.sin((ix + count) * 0.3) + 1) * 2 +
              (Math.sin((iy + count) * 0.5) + 1) * 2;
          }
        }
        renderer.render(scene, camera);
        count += 0.1;
      }
    }
  }
</script>
