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
import ApiService from "@/services/api-service";
import { initApexCharts } from "@/plugins/apexcharts";
import { initInlineSvg } from "@/plugins/inline-svg";
import { initVeeValidate } from "@/plugins/vee-validate";
import { initKtIcon } from "@/plugins/keenthemes";
import { AppInfoService, AuthService } from '@/services/services';
import { useAppInfoStore } from "@/stores/app-info-store";
import { useBodyStore } from "@/stores/body-store";
import { useAuthStore } from "@/stores/auth-store";
import { LanguageHelper } from "@/helpers/LanguageHelper";
import { ElMessage } from 'element-plus';
import axios from 'axios';
import DayjsConfig from '@/config/dayjs-config';
import "@/plugins/prismjs";

AppInfoService.load().then(appInfo => {
  if (appInfo === null) {
    alert('Failed to connect to server. Please check your server status and try again.');
    return;
  }

  // get logged user
  AuthService.getAccount().then(user => {
    const app = createApp(App);
    // Init services
    ApiService.init(app);

    app.use(createPinia());

    if(!user) {
      AuthService.login();
      return;
    }
    useAppInfoStore().setAppInfo(appInfo);
    useAuthStore().setAuth(user);

    DayjsConfig.init();
    app.use(createVueI18n());
    app.use(ElementPlus);
    app.use(router);

    initApexCharts(app);
    initInlineSvg(app);
    initKtIcon(app);
    initVeeValidate();

    setAxiosInterceptors();

    app.directive("tooltip", (el) => {
      new Tooltip(el);
    });

    app.mount("#app");
  })
  .catch(({errors}) => {
    alert('Failed to get account.');
  });
});

function createVueI18n() {
  return createI18n({
    legacy: false,
    locale: LanguageHelper.defaultLanguage,
    globalInjection: true,
    messages: { zh, en }
  });
}

function setAxiosInterceptors() {
  axios.interceptors.request.use(function (config) {
    // spinning start to show
    useBodyStore().addBodyClassname("page-loading");
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

    const url = error.response?.config?.url;
    const status = error.status || error.response.status;
    if (status === 401) {
      // Store logged out state.
      // store.logout();
      if (!url.endsWith('open-api/accounts/user')) {
        // go to login page if failed to authenticate
        AuthService.login();
        return;
      }
    }

    if(error.response.data.message) {
      // show form validation error
      ElMessage.error({ message: error.response.data.message, showClose: true, duration: 6000 });
    }
    return Promise.reject(error);
  });
}

