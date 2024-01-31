<template>
  <!--begin::App-->
  <div class="d-flex flex-column flex-root app-root" id="kt_app_root">
    <!--begin::Page-->
    <div class="app-page flex-column flex-column-fluid" id="kt_app_page">
      <KTHeader />
      <!--begin::Wrapper-->
      <div class="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
        <KTSidebar />
        <!--begin::Main-->
        <div class="app-main flex-column flex-row-fluid" id="kt_app_main">
          <Ribbon/>
          <!--begin::Content wrapper-->
          <div class="d-flex flex-column flex-column-fluid">
            <KTToolbar v-if="toolbarDisplay" />
            <div v-else class="mt-10"></div>
            <div id="kt_app_content" class="app-content flex-column-fluid">
              <KTContent></KTContent>
            </div>
          </div>
          <!--end::Content wrapper-->
          <KTFooter />
        </div>
        <!--end:::Main-->
      </div>
      <!--end::Wrapper-->
    </div>
    <!--end::Page-->
  </div>
  <!--end::App-->
  <KTScrollTop />
</template>

<script lang="ts">
import { defineComponent, nextTick, onBeforeMount, onMounted, watch } from "vue";
import KTHeader from "@/layouts/main-layout/header/header.vue";
import KTSidebar from "@/layouts/main-layout/sidebar/sidebar.vue";
import KTContent from "@/layouts/main-layout/content/content.vue";
import KTToolbar from "@/layouts/main-layout/toolbar/toolbar.vue";
import KTFooter from "@/layouts/main-layout/footer/footer.vue";
import KTScrollTop from "@/layouts/main-layout/extras/scroll-top.vue";
import { useRoute } from "vue-router";
import { reinitializeComponents } from "@/plugins/keenthemes";
import LayoutService from "@/services/layout-service";
import { toolbarDisplay } from "@/helpers/config";
import Ribbon from "@/components/ribbon/ribbon.vue";

export default defineComponent({
  name: "default-layout",
  components: {
    KTHeader,
    KTSidebar,
    KTContent,
    KTToolbar,
    KTFooter,
    KTScrollTop,
    Ribbon,
  },
  setup() {
    const route = useRoute();

    onBeforeMount(() => {
      LayoutService.init();
    });

    onMounted(() => {
      nextTick(() => {
        reinitializeComponents();
      });
    });

    watch(
      () => route.path,
      () => {
        nextTick(() => {
          reinitializeComponents();
        });
      }
    );

    return {
      toolbarDisplay
    };
  },
});
</script>
