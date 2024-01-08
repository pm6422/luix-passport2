<template>
  <Notice text="二期任务"/>
</template>

<script lang="ts">
import { getAssetPath } from "@/helpers/assets";
import { defineComponent } from "vue";
import Notice from "@/components/notice/notice.vue";

export default defineComponent({
  name: "report-template-list",
  components: {
    Notice
  },
  setup() {
    return {
    };
  },
});
</script>
