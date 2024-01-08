<template>
  <!--begin::Nav item-->
  <li class="nav-item p-0 ms-0">
    <!--begin::Date-->
    <a class="btn d-flex flex-column flex-center rounded-pill min-w-90px py-4 px-3 bg-light-danger border border-danger active" >
      <KTIcon icon-name="notification-on" icon-class="fs-3 text-danger"/>
      <span class="fs-9 fw-bold text-dark mt-2">{{ date }}</span>
      <span class="fs-9 fw-semibold text-gray-800 mt-4">{{$t('form.alert-list.affected-vehicles')}}</span>
      <span class="fs-8 fw-bold text-gray-800">{{ affectedVehicles }}</span>
      <span class="fs-9 fw-semibold text-gray-800 mt-2">{{$t('form.alert-list.affected-models')}}</span>
      <span class="fs-8 fw-bold text-gray-800">{{ affectedModels }}</span>
      <span class="fs-9 fw-semibold text-gray-800">{{$t('form.global.occurrences')}}</span>
      <span class="fs-8 fw-bold text-gray-800">{{ occurrences }}</span>
    </a>
    <!--end::Date-->
  </li>
	<!--end::Nav item-->
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: "alert-stat-by-date",
  props: {
    date: { type: String, required: true },
    occurrences: { type: Number, required: true },
    affectedVehicles: { type: Number, required: true },
    affectedModels: { type: Number, required: true },
  },
  setup() {

  },
});
</script>
