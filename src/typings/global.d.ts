// 声明全局的 window ，不然使用 window.XX 时会报错
declare var window: Window;
declare var document: Document;

declare module "iview";
declare module "vue-i18n";
declare module "jsencrypt";
declare module "query-string";

declare var process: {
  env: {
    api: {
      static_url: string;
      common_url: string;
    }
  }
};

