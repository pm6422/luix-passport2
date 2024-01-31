<template>
<!--begin::Footer-->
<div class="w-lg-500px d-flex flex-stack px-10 position-fixed bottom-0 mb-7">
  <!--begin::Links-->
  <div class="d-flex fw-semibold text-primary fs-base gap-5">
    <a href="../../pages/team.html" target="_blank" class="d-none d-lg-block text-gray-700">Terms</a>
  </div>
  <!--end::Links-->
  <div class="d-flex">
    <LanguageSwitcher/>
    <!-- <ThemeModeSwitcher/> -->
  </div>
</div>
<!--end::Footer-->
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { getAssetPath } from "@/helpers/assets";
import LanguageSwitcher from "@/components/language/language-switcher.vue"
import ThemeModeSwitcher from "@/components/theme-mode/theme-mode-switcher.vue";

export default defineComponent({
  name: "language-footer",
  components: {
    LanguageSwitcher,
    ThemeModeSwitcher
  },
  setup(props) {


    return {
      getAssetPath,
      props
    };
  },
});
</script>