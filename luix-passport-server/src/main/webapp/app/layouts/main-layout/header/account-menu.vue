<template>
  <!--begin::Menu-->
  <div
    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold py-4 fs-6 w-250px"
    data-kt-menu="true"
  >
    <!--begin::Menu item-->
    <div class="menu-item px-3">
      <div class="menu-content d-flex align-items-center px-3">
        <!--begin::Avatar-->
        <div class="symbol symbol-circle symbol-50px me-5">
          <img alt="Logo" :src="getAssetPath('media/avatars/300-0.jpg')" />
        </div>
        <!--end::Avatar-->
        <!--begin::Username-->
        <div class="d-flex flex-column">
          <div class="fw-bold d-flex align-items-center fs-5">
            Louis Lau
            <KTIcon icon-name="verify" icon-class="fs-1 text-danger px-2"/>
          </div>
          <span class="fw-semobold text-muted text-hover-primary fs-7 mt-1">louis@gmail.com</span>
          <span class="d-flex mt-2">
            <span class="badge badge-light-success fw-bold fs-9 px-2 py-1">Developer</span>
            <span class="badge badge-light-warning fw-bold fs-9 px-2 py-1 ms-2">Admin</span>
          </span>
        </div>
        <!--end::Username-->
      </div>
    </div>
    <!--end::Menu item-->
    <!--begin::Menu separator-->
    <div class="separator my-2"></div>
    <!--end::Menu separator-->
    <!--begin::Menu item-->
    <div class="menu-item px-3">
      <router-link to="/account/profile" class="menu-link px-5">
        <KTIcon icon-name="user" icon-class="fs-2 fs-md-1 px-2" />
        <span v-text="$t('menu.account.profile')"></span>
      </router-link>
    </div>
    <!--end::Menu item-->
    <!--begin::Menu item-->
    <!-- <div class="menu-item px-3">
      <router-link to="/pages/profile/overview" class="menu-link px-5">
        <KTIcon icon-name="message-question" icon-class="fs-2 fs-md-1 px-2" />
        <span v-text="$t('menu.account.help')"></span>
      </router-link>
    </div> -->
    <!--end::Menu item-->
    <!--begin::Menu item-->
    <div
      class="menu-item px-3"
      data-kt-menu-trigger="hover"
      data-kt-menu-placement="left-start"
      data-kt-menu-flip="center, top"
    >
      <span class="position-relative menu-link px-5">
        <KTIcon icon-name="text" icon-class="fs-2 fs-md-1 px-2" />
        <span v-text="$t('menu.account.language')"></span>
        <span class="rounded bg-light fs-8 px-3 py-2 translate-middle-y top-50 position-absolute end-0">
          {{ currentLanguageLocale.name }}
          <img
            class="w-15px h-15px rounded-1 ms-2"
            :src="currentLanguageLocale.flag"
            alt="language"
          />
        </span>
      </span>
      <!--begin::Menu sub-->
      <div class="menu-sub menu-sub-dropdown w-175px py-4">
        <!--begin::Menu item-->
        <div class="menu-item px-3">
          <a
            @click="setLanguage('zh')"
            class="menu-link d-flex px-5"
            :class="{ active: currentLanguage === 'zh' }"
          >
            <span class="symbol symbol-20px me-4">
              <img
                class="rounded-1"
                :src="getAssetPath('media/flags/china.svg')"
              />
            </span>
            简体中文
          </a>
        </div>
        <!--end::Menu item-->
        <!--begin::Menu item-->
        <div class="menu-item px-3">
          <a
            @click="setLanguage('en')"
            class="menu-link d-flex px-5"
            :class="{ active: currentLanguage === 'en' }"
          >
            <span class="symbol symbol-20px me-4">
              <img
                class="rounded-1"
                :src="getAssetPath('media/flags/united-states.svg')"
              />
            </span>
            English
          </a>
        </div>
        <!--end::Menu item-->
      </div>
      <!--end::Menu sub-->
    </div>
    <!--end::Menu item-->
    <!--begin:: Dark mode menu item-->
    <div
      class="menu-item px-3"
      data-kt-menu-trigger="hover"
      data-kt-menu-placement="left-start"
      data-kt-menu-flip="center, top"
    >
      <span class="position-relative menu-link px-5">
        <KTIcon icon-name="night-day" icon-class="fs-2 fs-md-1 px-2" />
        <span v-text="$t('menu.account.theme-mode')"></span>
        <span class="d-flex rounded bg-light fs-8 px-3 py-2 translate-middle-y top-50 position-absolute end-0" v-if="themeMode === 'dark'">
          <span v-text="$t('menu.account.dark')"></span>
          <KTIcon icon-name="moon" icon-class="fs-2" class="ms-2"/>
        </span>
        <span class="d-flex rounded bg-light fs-8 px-3 py-2 translate-middle-y top-50 position-absolute end-0" v-if="themeMode === 'light'">
          <span v-text="$t('menu.account.light')"></span>
          <KTIcon icon-name="sun" icon-class="fs-2" class="ms-2"/>
        </span>
        <span class="d-flex rounded bg-light fs-8 px-3 py-2 translate-middle-y top-50 position-absolute end-0" v-if="themeMode === 'system'">
          <span v-text="$t('menu.account.system')"></span>
          <KTIcon icon-name="screen" icon-class="fs-2" class="ms-2"/>
        </span>
      </span>
      <!--begin::Menu sub-->
      <div class="menu-sub menu-sub-dropdown w-175px py-4">
        <!--begin::Menu item-->
        <div class="menu-item px-3">
          <router-link
            :to="path"
            :class="{ active: themeMode === 'dark' }"
            class="menu-link px-3 py-2"
            @click="setMode('dark')"
          >
            <span class="menu-icon" data-kt-element="icon">
              <KTIcon icon-name="moon" icon-class="fs-2" />
            </span>
            <span class="menu-title" v-text="$t('menu.account.dark')"></span>
          </router-link>
        </div>
        <!--end::Menu item-->
        <!--begin::Menu item-->
        <div class="menu-item px-3">
          <router-link
            :to="path"
            :class="{ active: themeMode === 'light' }"
            class="menu-link px-3 py-2"
            @click="setMode('light')"
          >
            <span class="menu-icon" data-kt-element="icon">
              <KTIcon icon-name="sun" icon-class="fs-2" />
            </span>
            <span class="menu-title" v-text="$t('menu.account.light')"></span>
          </router-link>
        </div>
        <!--end::Menu item-->
        <!--begin::Menu item-->
        <div class="menu-item px-3">
          <router-link
            :to="path"
            :class="{ active: themeMode === 'system' }"
            class="menu-link px-3 py-2"
            @click="setMode('system')"
          >
            <span class="menu-icon" data-kt-element="icon">
              <KTIcon icon-name="screen" icon-class="fs-2" />
            </span>
            <span class="menu-title" v-text="$t('menu.account.system')"></span>
          </router-link>
        </div>
        <!--end::Menu item-->
      </div>
      <!--end::Menu sub-->
    </div>
    <!--end::Dark mode menu item-->
    <!--begin::Layout menu item-->
    <div class="menu-item px-3">
      <router-link to="/account/layout-setting" class="menu-link px-5">
        <KTIcon icon-name="switch" icon-class="fs-2 fs-md-1 px-2" />
        <span v-text="$t('menu.account.layout-settings')"></span>
      </router-link>
    </div>
    <!--end::Layout menu item-->
    <!--begin::Menu item-->
    <div class="menu-item px-3">
      <a @click="signOut()" class="menu-link px-5">
        <KTIcon icon-name="entrance-left" icon-class="fs-2 fs-md-1 px-2" />
        <span v-text="$t('menu.account.logout')"></span>
      </a>
    </div>
    <!--end::Menu item-->
  </div>
  <!--end::Menu-->
</template>
<script lang="ts">
import { getAssetPath } from "@/helpers/assets";
import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth-store";
import { useThemeStore } from "@/stores/theme-store";
import { useConfigStore } from "@/stores/config-store.js";
import { useRouter, useRoute } from "vue-router";
import { LanguageHelper } from "@/helpers/LanguageHelper";
export default defineComponent({
  name: "account-menu",
  components: {},
  setup() {
    const themeStore = useThemeStore();
    const configStore = useConfigStore();
    const authStore = useAuthStore();
    const route = useRoute();
    const router = useRouter();
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
    const themeMode = computed(() => {
      return themeStore.mode;
    });
    const path = computed(() => route.path);
    const setMode = (mode: "dark" | "light" | "system") => {
      let configMode = mode;
      configStore.setLayoutConfigProperty("general.mode", configMode);
      themeStore.setThemeMode(configMode);
    };
    const signOut = () => {
      authStore.logout();
    };
    return {
      signOut,
      setLanguage,
      currentLanguage,
      currentLanguageLocale,
      getAssetPath,
      themeMode,
      setMode,
      path
    };
  },
});
</script>