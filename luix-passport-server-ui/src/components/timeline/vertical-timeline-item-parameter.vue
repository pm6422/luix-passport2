<template>
  <!--begin::Col-->
  <div class="col-xl-3 mt-2">
    <!--begin::Label-->
    <label class="fw-semibold text-muted d-flex justify-content-center">{{ activityParameter.name }}</label>
    <!--end::Label-->
    <!--begin::Col-->
    <div class="fw-bold text-gray-800 d-flex justify-content-center">{{ activityParameter.value }}</div>
    <!--end::Col-->
  </div>
  <!--end::Col-->
</template>

<script lang="ts">

import { defineComponent } from "vue";
import { getAssetPath } from "@/helpers/assets"
import type { IActivityParameter } from '@/domain/ActivityParameter';

export default defineComponent({
  name: "vertical-timeline-item-parameter",
  props: {
    activityParameter: { type: Object as () => IActivityParameter, required: true },
  },
  setup(props) {

    return {
		  getAssetPath,
		};
  },
});
</script>
