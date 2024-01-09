<template>
  <!--begin::Card-->
  <div class="card card-flush">
    <!--begin::Card body-->
    <div class="card-body px-0 py-0" >
      <iframe src="swagger-ui/index.html" width="100%" height="900"></iframe>
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { defineComponent, computed, watch } from "vue";
import { useThemeStore } from "@/stores/theme";

export default defineComponent({
  name: "api",
  components: {
    
  },
  setup() {
    const themeStore = useThemeStore();

    const themeMode = computed(() => {
      return themeStore.mode;
    });

    watch(themeMode, () => {
      window.location.reload();
    });

    return {
      
    };
  },
});


</script>

