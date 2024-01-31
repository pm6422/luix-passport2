<template>
  <div class="d-none d-lg-block ms-3">
    <!--begin::Toggle-->
    <button 
      class="btn btn-flex btn-link btn-color-gray-700 btn-active-color-primary rotate fs-base" 
      data-kt-menu-trigger="hover" 
      data-kt-menu-placement="bottom"
    >
      <KTIcon icon-name="night-day" icon-class="w-20px rounded me-3 fs-1" />
      <span class="me-3 w-90px" v-text="$t('menu.account.theme-mode')"></span>
      <KTIcon icon-name="down" icon-class="fs-5 text-muted rotate-180 m-0" />
    </button>
    <!--end::Toggle-->
    <!--begin::Menu-->
    <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-150px py-4 fs-7" data-kt-menu="true">
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
    <!--end::Menu-->
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/helpers/assets";
import { computed, defineComponent } from "vue";
import { useThemeStore } from "@/stores/theme-store";
import { useConfigStore } from "@/stores/config-store.js";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "theme-mode-switcher",
  component: {},
  setup() {
    const themeStore = useThemeStore();
    const configStore = useConfigStore();
    const route = useRoute();

    const themeMode = computed(() => {
      return themeStore.mode;
    });

    const path = computed(() => route.path);

    const setMode = (mode: "dark" | "light" | "system") => {
      let configMode = mode;
      configStore.setLayoutConfigProperty("general.mode", configMode);
      themeStore.setThemeMode(configMode);
    };

    return {
      themeMode,
      setMode,
      path,
      getAssetPath,
    };
  },
});
</script>
