<template>
  <!--begin::Nav item-->
  <li class="nav-item p-0 ms-0">
    <!--begin::Date-->
    <a 
      class="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px py-4 px-3 btn-active-danger" 
      :class="{ active: dayIndex === selectedDayIndex }"
      @click="clickTab(dayIndex)"
    >
      <span class="fs-7 fw-semibold">{{ day.weekday }}</span>
      <span class="fs-6 fw-bold">{{ day.dateAbbreviation }}</span>
    </a>
    <!--end::Date-->
  </li>
	<!--end::Nav item-->
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: "horizontal-timeline-tab",
  props: {
    day: { type: Object, required: true },
    dayIndex: { type: Number, required: true },
    selectedDayIndex: { type: Number, required: true },
    dayCount: { type: Number, required: true },
    clickTab: { type: Function, required: true },
  },
  setup() {

  },
});
</script>
