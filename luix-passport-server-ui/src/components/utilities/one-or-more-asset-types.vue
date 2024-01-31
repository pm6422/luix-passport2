<template>
  <div 
    v-if="values && values.length === 1"
    class="badge badge-light" 
  >
    {{ $t(`dropdown.asset-type.${values[0]}`) }}
  </div>
  <div class="d-flex flex-column align-items-start px-0"
    v-if="values && values.length > 1 && alignment === 'vertical'"
  >
    <div 
      v-for="(val, index) in values"
      :key="index"
      class="badge badge-light py-1 mt-1" 
    > 
      <span v-if="index < limit">{{ $t(`dropdown.asset-type.${val}`) }}</span>
      <span v-if="index == limit">...</span>
    </div>
  </div>
  <div class="d-flex px-0"
    v-if="values && values.length > 1 && alignment === 'horizontal'"
  >
    <div 
      v-for="(val, index) in values"
      :key="index"
      class="badge badge-light me-2" 
    >
      {{ $t(`dropdown.asset-type.${val}`) }}
    </div>
  </div>
</template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "one-or-more-asset-type",
    components: {
    },
    props: {
      values: { type: Array<String>, required: false },
      alignment: { 
        type: String as () => "vertical" | "horizontal",
        required: false, 
        default: "vertical" 
      },
      limit: { type: Number, required: false, default: 5 },
    },
    setup(props) {
  
      return {
      };
    },
  });
  </script>
  