<template>
  <!--begin::Menu-->
  <div
    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold py-4 fs-6 w-250px"
    data-kt-menu="true"
  >
    <!--begin::Menu item-->
    <div class="menu-item px-3">
      <div class="menu-content d-flex align-items-center px-3">
        <span v-text="$t('menu.developer.tools')"></span>
        <span class="badge badge-light-warning fw-bold fs-9 px-2 py-1 ms-2">For Dev Role</span>
      </div>
    </div>
    <!--end::Menu item-->

    <div class="separator my-2"></div>

    <div class="menu-item px-5">
      <router-link to="/developer/api" class="menu-link px-5">
        <KTIcon icon-name="book-square" icon-class="fs-2 fs-md-1 px-2" />
        <span v-text="$t('menu.developer.api')"></span>
      </router-link>
    </div>
    <div class="menu-item px-5">
      <router-link to="/developer/data-dict" class="menu-link px-5">
        <KTIcon icon-name="lots-shopping" icon-class="fs-2 fs-md-1 px-2" />
        <span v-text="$t('menu.developer.data-dict')"></span>
      </router-link>
    </div>
    <div class="menu-item px-5">
      <router-link to="/developer/health" class="menu-link px-5">
        <KTIcon icon-name="pulse" icon-class="fs-2 fs-md-1 px-2" />
        <span v-text="$t('menu.developer.health')"></span>
      </router-link>
    </div>
    <div class="menu-item px-5">
      <router-link to="/developer/configurations" class="menu-link px-5">
        <KTIcon icon-name="gear" icon-class="fs-2 fs-md-1 px-2" />
        <span v-text="$t('menu.developer.configurations')"></span>
      </router-link>
    </div>
    <div class="menu-item px-5">
      <router-link to="/developer/beans" class="menu-link px-5">
        <KTIcon icon-name="text-bold" icon-class="fs-2 fs-md-1 px-2" />
        <span v-text="$t('menu.developer.beans')"></span>
      </router-link>
    </div>
    <!-- <div class="menu-item px-5">
      <router-link to="/developer/mappings" class="menu-link px-5">
        <KTIcon icon-name="abstract-12" icon-class="fs-2 fs-md-1 px-2" />
        <span v-text="$t('menu.developer.mappings')"></span>
      </router-link>
    </div> -->
    <div class="menu-item px-5">
      <router-link to="/developer/metrics" class="menu-link px-5">
        <KTIcon icon-name="syringe" icon-class="fs-2 fs-md-1 px-2" />
        <span v-text="$t('menu.developer.metrics')"></span>
      </router-link>
    </div>
    <div class="menu-item px-5">
      <router-link to="/developer/loggers" class="menu-link px-5">
        <KTIcon icon-name="cloud-add" icon-class="fs-2 fs-md-1 px-2" />
        <span v-text="$t('menu.developer.loggers')"></span>
      </router-link>
    </div>
  </div>
  <!--end::Menu-->
</template>

<script lang="ts">
import { getAssetPath } from "@/helpers/assets";
import { computed, defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "kt-user-menu",
  components: {},
  setup() {
    const router = useRouter();
    const i18n = useI18n();
    const authStore = useAuthStore();

    return {
      getAssetPath,
    };
  },
});
</script>
