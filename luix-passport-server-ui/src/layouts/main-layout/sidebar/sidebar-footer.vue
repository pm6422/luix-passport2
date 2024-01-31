<template>
  <!--begin::Footer-->
  <div id="kt_app_sidebar_footer" class="app-sidebar-footer flex-column-auto pt-2 pb-6 px-6">
    <span class="btn btn-flex flex-center btn-custom btn-primary overflow-hidden text-nowrap px-0 h-40px w-100">
      <KTIcon icon-name="verify" icon-class="fs-1" />
      <span class="btn-label">v{{ appInfoStore.appVersion }}</span>
    </span>
  </div>
  <!--end::Footer-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAppInfoStore } from "@/stores/app-info-store";

export default defineComponent({
  name: "sidebar-footer",
  components: {},
  setup() {
    const appInfoStore = useAppInfoStore();

    return {
      appInfoStore
    };
  },
});
</script>
