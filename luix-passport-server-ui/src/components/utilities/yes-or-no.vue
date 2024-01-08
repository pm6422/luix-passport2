<template>
  <a class="text-gray-600 text-hover-primary mb-1">
    <div v-if="val" class="badge badge-light-success">
      <span class="w-25px" v-text="$t('form.global.yes')"></span>
    </div>
    <div v-else class="badge badge-light-info">
      <span class="w-25px" v-text="$t('form.global.no')"></span>
    </div>
  </a>
</template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "yes-or-no",
    components: {
    },
    props: {
      val: { type: Boolean, required: false },
    },
    setup(props) {
  
      return {
      };
    },
  });
  </script>
  