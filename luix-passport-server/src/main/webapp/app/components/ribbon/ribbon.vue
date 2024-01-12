<template>
  <div class="card-header ribbon ribbon-top border-gray-300" v-if="appInfoStore.ribbonProfile">
    <div class="ribbon-label bg-light-info fw-bold text-dark">{{ appInfoStore.ribbonProfile }} {{$t('form.global.env')}}</div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";
import { useAppInfoStore } from "@/stores/app-info-store";

export default defineComponent({
  name: "ribbon",
  setup() {
    const appInfoStore = useAppInfoStore();
  
    return {
      appInfoStore
    };
  },
});
</script>
