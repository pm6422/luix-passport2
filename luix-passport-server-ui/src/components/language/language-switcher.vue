<template>
  <div>
    <!--begin::Toggle-->
    <button 
      class="btn btn-flex btn-link btn-color-gray-700 btn-active-color-primary rotate fs-base" 
      data-kt-menu-trigger="hover" 
      data-kt-menu-placement="bottom"
    >
      <img data-kt-element="current-lang-flag" class="w-20px rounded me-3" :src="currentLanguageLocale.flag" />
      <span data-kt-element="current-lang-name" class="me-3 w-60px">{{ currentLanguageLocale.name }}</span>
      <KTIcon icon-name="down" icon-class="fs-5 text-muted rotate-180 m-0" />
    </button>
    <!--end::Toggle-->
    <!--begin::Menu-->
    <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-150px py-4 fs-7" data-kt-menu="true">
      <!--begin::Menu item-->
      <div class="menu-item px-3">
        <a @click="setLanguage('zh')" :class="{ active: currentLanguage === 'zh' }" class="menu-link d-flex px-5">
          <span class="symbol symbol-20px me-4">
            <img data-kt-element="lang-flag" class="rounded-1" :src="getAssetPath('media/flags/china.svg')" />
          </span>
          <span data-kt-element="lang-name">简体中文</span>
        </a>
      </div>
      <!--end::Menu item-->
      <!--begin::Menu item-->
      <div class="menu-item px-3">
        <a @click="setLanguage('en')" :class="{ active: currentLanguage === 'en' }" class="menu-link d-flex px-5">
          <span class="symbol symbol-20px me-4">
            <img data-kt-element="lang-flag" class="rounded-1" :src="getAssetPath('media/flags/united-states.svg')" />
          </span>
          <span data-kt-element="lang-name">English</span>
        </a>
      </div>
      <!--end::Menu item-->
    </div>
    <!--end::Menu-->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { getAssetPath } from "@/helpers/assets";
import { useI18n } from "vue-i18n";
import { LanguageHelper } from "@/helpers/LanguageHelper";

export default defineComponent({
  name: "language-switcher",
  components: {
  },
  setup(props) {
    const i18n = useI18n();
    i18n.locale.value = LanguageHelper.getCurrentLanguage();
    
    const setLanguage = (lang: string) => {
      LanguageHelper.setLanguage(i18n, lang);
    };

    const currentLanguage = computed(() => {
      return i18n.locale.value;
    });

    const currentLanguageLocale = computed(() => {
      return LanguageHelper.countries[i18n.locale.value as keyof typeof LanguageHelper.countries];
    });

    return {
      getAssetPath,
      props,
      setLanguage,
      currentLanguage,
      currentLanguageLocale
    };
  },
});
</script>