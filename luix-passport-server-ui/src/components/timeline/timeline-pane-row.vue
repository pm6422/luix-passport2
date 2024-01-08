<template>
  <div class="d-flex align-items-center mb-6">
    <!--begin::Bullet-->
    <span 
      data-kt-element="bullet" 
      class="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4"
      :class="`bg-${bgColor}`"
    ></span>
    <!--end::Bullet-->
    <!--begin::Info-->
    <div class="flex-grow-1 me-5">
      <div class="text-gray-700 fw-semibold fs-6">{{ DateTimeUtils.formatDateTime(obj[timeFieldName]) }}</div>
      <div class="text-gray-800 fw-semibold fs-6">{{ obj[numFieldName] }}: {{ obj[primaryFieldName] }}</div>
      <div class="text-gray-700 fw-semibold fs-7">{{ obj[secondaryFieldName] }}</div>
    </div>
    <!--end::Info-->
    <!--begin::Action-->
    <a 
      v-if="clickView"
      class="btn btn-sm btn-light" 
      @click="clickView(obj)"
    >
      {{$t('form.global.view')}}
    </a>
    <!--end::Action-->
  </div>
</template>

<script lang="ts">
  import { defineComponent, watch, ref } from "vue";
  import { DateTimeUtils } from "@/helpers/DateTimeUtils";

  export default defineComponent({
    name: "timeline-pane-row",
    props: {
      obj: { type: Object, required: true },
      bgColor: { type: String, required: false, default: 'danger' },
      numFieldName: { type: String, required: true },
      timeFieldName: { type: String, required: true },
      primaryFieldName: { type: String, required: true },
      secondaryFieldName: { type: String, required: true },
      clickView: { type: Function, required: false }
    },
    setup(props) {
      // const obj = ref({});
      // watch(
      // () => props.obj,
      // () => {
      //     obj.value = props.obj;
      //   }
      // );  
        
      return {
        // obj,
        DateTimeUtils
      };
    },
  });
</script>
