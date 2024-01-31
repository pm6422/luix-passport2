<template>
  <!--begin::Navbar-->
  <div class="app-navbar flex-shrink-0">
    <!--begin::Search-->
    <!-- <div class="app-navbar-item align-items-stretch ms-1 ms-md-3">
      <KTSearch />
    </div> -->
    <!--end::Search-->
    <!--begin::Notifications-->
    <div class="app-navbar-item ms-1 ms-md-3 me-5">
      <div
        class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-30px h-30px w-md-40px h-md-40px position-relative"
        :class="{'animation-blink': notificationBlink}"
        data-kt-menu-trigger="hover"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
        <KTIcon icon-name="notification-on" icon-class="fs-2 fs-md-1 text-danger" />
        <span class="badge badge-light-danger position-absolute translate-middle top-0 start-100 animation-blink" v-if="notificationBlink">1</span>
      </div>
      <KTNotificationMenu />
    </div>
    <!--end::Notifications-->
    <!--begin::Quick links-->
    <!-- <div class="app-navbar-item ms-1 ms-md-3">
      <div
        class="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-30px h-30px w-md-40px h-md-40px"
        data-kt-menu-trigger="click"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
        <KTIcon icon-name="element-11" icon-class="fs-2 fs-md-1" />
      </div>
      <KTQuickLinksMenu />
    </div> -->
    <!--end::Quick links-->

    <!--begin::Developer menu-->
    <div class="app-navbar-item ms-1 ms-md-3" id="kt_header_dev_menu_toggle">
      <!--begin::Menu wrapper-->
      <div
        class="cursor-pointer symbol symbol-30px symbol-md-40px symbol-circle me-5"
        data-kt-menu-trigger="click"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
        <img :src="getAssetPath('media/avatars/300-31.jpg')" alt="dev" />
      </div>
      <KTDeveloperMenu />
      <!--end::Menu wrapper-->
    </div>
    <!--end::Developer menu-->

    <!--begin::User account menu-->
    <div class="app-navbar-item ms-1 ms-md-3" id="kt_header_user_menu_toggle">
      <!--begin::Menu wrapper-->
      <div
        class="cursor-pointer symbol symbol-30px symbol-md-40px symbol-circle"
        data-kt-menu-trigger="click"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
        <img :src="getAssetPath('media/avatars/300-0.jpg')" alt="user" />
      </div>
      <KTAccountMenu />
      <!--end::Menu wrapper-->
    </div>
    <!--end::User account menu-->

    <!--begin::Header menu toggle-->
    <!-- <div
      class="app-navbar-item d-lg-none ms-2 me-n3"
      v-tooltip
      title="Show header menu"
    >
      <div
        class="btn btn-icon btn-active-color-primary w-30px h-30px w-md-35px h-md-35px"
        id="kt_app_header_menu_toggle"
      >
        <KTIcon icon-name="text-align-left" icon-class="fs-2 fs-md-1" />
      </div>
    </div> -->
    <!--end::Header menu toggle-->
  </div>
  <!--end::Navbar-->
</template>

<script lang="ts">
import { getAssetPath } from "@/helpers/assets";
import { ref, computed, defineComponent } from "vue";
import KTSearch from "@/layouts/main-layout/search/Search.vue";
import KTNotificationMenu from "./NotificationsMenu.vue";
import KTQuickLinksMenu from "@/layouts/main-layout/header/QuickLinksMenu.vue";
import KTDeveloperMenu from "@/layouts/main-layout/header/developer-menu.vue";
import KTAccountMenu from "@/layouts/main-layout/header/account-menu.vue";
import { ThemeModeComponent } from "@/assets/ts/layout";
import { useThemeStore } from "@/stores/theme-store";
import { ElMessage } from 'element-plus';

export default defineComponent({
  name: "header-navbar",
  components: {
    KTSearch,
    KTNotificationMenu,
    KTQuickLinksMenu,
    KTDeveloperMenu,
    KTAccountMenu,
  },
  setup() {
    const store = useThemeStore();
    const notificationBlink = ref(false);

    const themeMode = computed(() => {
      if (store.mode === "system") {
        return ThemeModeComponent.getSystemMode();
      }
      return store.mode;
    });

    return {
      themeMode,
      getAssetPath,
      notificationBlink
    };
  },
});
</script>
