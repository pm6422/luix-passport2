<template>
  <!--begin::Header-->
  <div id="kt_app_header" v-if="headerDisplay" class="app-header">
    <!--begin::Header container-->
    <div
      class="app-container d-flex align-items-stretch justify-content-between"
      :class="{
        'container-fluid': headerWidthFluid,
        'container-xxl': !headerWidthFluid,
      }"
    >
      <div
        v-if="layout === 'light-header' || layout === 'dark-header'"
        class="d-flex align-items-center flex-grow-1 flex-lg-grow-0 me-lg-15"
      >
        <img
          alt="Logo"
          :src="getAssetPath('assets/media/logos/logo.svg')"
          class="h-35px"
        />
        <router-link to="/">
          <span class="app-sidebar-logo-default ms-10 fs-2 -intro-x">
            <img
            :src="getAssetPath('assets/media/logos/logo-text.svg')"
            class="h-20px"
          />
    </span>
        </router-link>
      </div>
      <template v-else>
        <!--begin::sidebar mobile toggle-->
        <div
          class="d-flex align-items-center d-lg-none ms-n3 me-1 me-md-2"
          v-tooltip
          title="Show sidebar menu"
        >
          <div
            class="btn btn-icon btn-active-color-primary w-35px h-35px"
            id="kt_app_sidebar_mobile_toggle"
          >
            <KTIcon icon-name="abstract-14" icon-class="fs-2 fs-md-1" />
          </div>
        </div>
        <!--end::sidebar mobile toggle-->
        <!--begin::Mobile logo-->
        <div class="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
          <router-link to="/" class="d-lg-none">
            <img
              alt="Logo"
              :src="getAssetPath('media/logos/logo.svg')"
              class="h-35px"
            />
          </router-link>
        </div>
        <!--end::Mobile logo-->
      </template>
      <!--begin::Header wrapper-->
      <div
        class="d-flex align-items-stretch justify-content-between flex-lg-grow-1"
        id="kt_app_header_wrapper"
      >
        <KTHeaderMenu v-if="headerContent === 'menu'"/>
        <KTPageTitle v-if="headerContent === 'page-title'"/>
        <!--begin::tenant-->
        <span class="page-title d-flex flex-column justify-content-center flex-wrap" v-if="headerContent === 'page-title'">
          <div class="fs-2tx text-gray-700">
            <i :class="`car-tesla`"></i>
          </div>
        </span>
        <!--end::tenant-->
        <KTHeaderNavbar />
      </div>
      <!--end::Header wrapper-->
    </div>
    <!--end::Header container-->
  </div>
  <!--end::Header-->
</template>

<script lang="ts">
import { getAssetPath } from "@/helpers/assets";
import { defineComponent } from "vue";
import KTHeaderMenu from "@/layouts/main-layout/header/menu/menu.vue";
import KTPageTitle from "@/layouts/main-layout/toolbar/page-title.vue";
import KTHeaderNavbar from "@/layouts/main-layout/header/navbar.vue";
import {
  headerDisplay,
  headerContent,
  headerWidthFluid,
  layout,
  displaySidebar
} from "@/helpers/config";

export default defineComponent({
  name: "layout-header",
  components: {
    KTHeaderMenu,
    KTPageTitle,
    KTHeaderNavbar
  },
  setup() {
    return {
      headerDisplay,
      displaySidebar,
      layout,
      headerWidthFluid,
      headerContent,
      getAssetPath,
    };
  },
});
</script>
