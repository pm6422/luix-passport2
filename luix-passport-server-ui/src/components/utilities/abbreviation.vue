<template>
  <el-tooltip placement="top" v-bind:content="text" v-if="text && text.length > maxTextLength">
    <span :class="class" v-if="text">{{ text.slice(0, maxTextLength) + '...' }}</span>
  </el-tooltip>
  <span :class="class" v-else>{{ text }}</span>
</template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "abbreviation",
    components: {
    },
    props: {
      text: { type: String, required: false, default: '' },
      maxTextLength: { type: Number, required: true },
      class: { type: String, required: false, default: '' },
    },
    setup(props) {
  
      return {
        props
      };
    },
  });
  </script>
  