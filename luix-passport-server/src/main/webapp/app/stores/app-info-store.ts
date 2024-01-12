import { ref } from "vue";
import { defineStore } from "pinia";
export const useAppInfoStore = defineStore("appInfo", () => {
  const appName = ref<string>('');
  const appVersion = ref<string>('');
  const apiDocsEnabled = ref<boolean>(false);
  const ribbonProfile = ref<string>('');

  function setAppInfo(result: any) {
    ribbonProfile.value = result['ribbonProfile'];
    apiDocsEnabled.value = result['apiDocsEnabled'];
    if(result['build']) {
      appName.value = result['build']['name'];
      appVersion.value = result['build']['version'];
    }
  }

  function getAppName() : string  {
    return appName.value;
  }

  function getAppVersion() : string  {
    return appVersion.value;
  }

  function getApiDocsEnabled() : boolean {
    return apiDocsEnabled.value;
  }

  function getRibbonProfile() : string {
    return ribbonProfile.value;
  }

  return {
    setAppInfo,
    getAppName,
    getAppVersion,
    getApiDocsEnabled,
    getRibbonProfile
  };
});
