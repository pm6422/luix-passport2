<template>
<!--begin::theme mode switcher-->
  <div
    class="cursor-pointer w-160px h-50px rounded border border-1 border-gray-400 position-fixed bottom-0 end-0 p-3 mb-5 me-5 d-none d-lg-block shadow"
    data-kt-menu-trigger="hover"
    data-kt-menu-attach="parent"
    data-kt-menu-placement="bottom-end"
  >

    <div class="form-check form-check-custom form-check-solid form-switch">
      <label class="form-check-label fw-bold text-dark me-3" v-text="$t('menu.account.dark-mode')"></label>
      <input
        class="form-check-input"
        type="checkbox"
        v-model="darkMode"
      />
    </div>
  </div>
<!--end::theme mode switcher-->
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { getAssetPath } from "@/helpers/assets";
import { useThemeStore } from "@/stores/theme";
import { useConfigStore } from "@/stores/config-store.js";
import { ThemeModeComponent } from "@/assets/ts/layout";

export default defineComponent({
  name: "dark-mode-switcher",
  components: {
  },
  setup() {
    const themeStore = useThemeStore();
    const configStore = useConfigStore();

    const darkMode = computed({
      get() {
        if (themeStore.mode === "system") {
        return "dark" === ThemeModeComponent.getSystemMode();
      }
      return "dark" === themeStore.mode;
      },
      set(value) {
        let mode = "light";
        if(true === value) {
          mode = "dark";
        }
        let configMode = mode;
        configStore.setLayoutConfigProperty("general.mode", configMode);
        themeStore.setThemeMode(configMode as "dark" | "light" | "system");
      },
    });

    const setMode = (mode: "dark" | "light" | "system") => {
      let configMode = mode;
      configStore.setLayoutConfigProperty("general.mode", configMode);
      themeStore.setThemeMode(configMode);
    };
    
    return {
      getAssetPath,
      darkMode
    };
  },
});
</script>