import { createApp } from "vue";
import { createPinia } from "pinia";
import { Tooltip } from "bootstrap";
import App from "./App.vue";

import ElementPlus from "element-plus";
import { createI18n } from "vue-i18n";
import en from "@/i18n/en.json";
import zh from "@/i18n/zh.json";
import router from "@/config/router";

//imports for app initialization
import ApiService from "@/services/ApiService";
import { initApexCharts } from "@/plugins/apexcharts";
import { initInlineSvg } from "@/plugins/inline-svg";
import { initVeeValidate } from "@/plugins/vee-validate";
import { initKtIcon } from "@/plugins/keenthemes";
import { AppInfoService } from '@/services/services';
import { useAppInfoStore } from "@/stores/app-info-store";
import { LanguageHelper } from "@/helpers/LanguageHelper";
import { ElMessage } from 'element-plus';
import axios from 'axios';
import { useBodyStore } from "@/stores/body";

import "@/plugins/prismjs";

import DayjsConfig from '@/config/dayjs-config';

AppInfoService.load().then(result => {
  if (result === null) {
    alert('Failed to connect to server. Please check your server status and try again.');
    return;
  }

  const app = createApp(App);

  DayjsConfig.init();

  app.use(createVueI18n());
  app.use(createPinia());
  app.use(router);
  app.use(ElementPlus);

  // It must be put behind createPinia()
  setAppInfoStore(result);

  // Init services
  ApiService.init(app);

  initApexCharts(app);
  initInlineSvg(app);
  initKtIcon(app);
  initVeeValidate();

  setAxiosInterceptors();

  app.directive("tooltip", (el) => {
    new Tooltip(el);
  });

  app.mount("#app");
});

function createVueI18n() {
  return createI18n({
    legacy: false,
    locale: LanguageHelper.defaultLanguage,
    globalInjection: true,
    messages: { zh, en }
  });
}

function setAppInfoStore(result) {
  const appInfoStore = useAppInfoStore();

  appInfoStore.ribbonProfile = result['ribbonProfile'];
  appInfoStore.apiDocsEnabled = result['apiDocsEnabled'];
  if(result['build']) {
    appInfoStore.appVersion = result['build']['version'];
  }
}

function setAxiosInterceptors() {
  axios.interceptors.request.use(function (config) {
    // spinning start to show
    useBodyStore().addBodyClassname("page-loading");
  
    const token = window.localStorage.token;
    if (token) {
       config.headers.Authorization = `token ${token}`
    }
    return config
  }, function (error) {
    return Promise.reject(error);
  });
  
  axios.interceptors.response.use(function (response) {
    // hide spinning after response completion
    useBodyStore().removeBodyClassName("page-loading");
  
    return response;
  }, function (error) {
    // hide spinning when error occurred
    useBodyStore().removeBodyClassName("page-loading");

  //     const url = error.response?.config?.url;
  //     const status = error.status || error.response.status;
  //     if (status === 401) {
  //       // Store logged out state.
  //       // store.logout();
  //       if (!url.endsWith('api/account') && !url.endsWith('api/authenticate')) {
  //         // Ask for a new authentication
  //         // loginService.openLogin();
  //         return;
  //       }
  //     }

    if(error.response.data.message) {
      // show form validation error
      ElMessage.error({message: error.response.data.message, showClose: true, duration: 6000});
    }

    return Promise.reject(error);
  });
}

