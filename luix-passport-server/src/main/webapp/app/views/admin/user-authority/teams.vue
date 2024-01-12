<template>
  <Notice text="Not yet implemented"/>

</template>

<script lang="ts">
import { getAssetPath } from "@/helpers/assets";
import { defineComponent } from "vue";
import Notice from "@/components/notice/notice.vue";

export default defineComponent({
  name: "teams",
  components: {
    Notice
  },
  setup() {
    return {
    };
  },
});
</script>
