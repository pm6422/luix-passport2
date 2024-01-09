import { defineStore } from "pinia";

export const useAppInfoStore = defineStore("appInfo", {
  state: () => ({
    apiDocsEnabled: false,
    ribbonProfile: '',
    appVersion: '',
  })
});
