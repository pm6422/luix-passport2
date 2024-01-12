import { defineStore } from "pinia";

export const useAppInfoStore = defineStore("appInfo", {
  state: () => ({
    appName: '',
    appVersion: '',
    apiDocsEnabled: false,
    ribbonProfile: ''
  })
});
