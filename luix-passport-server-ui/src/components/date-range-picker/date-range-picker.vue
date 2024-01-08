<template>
  <!--begin::Daterangepicker(defined in src/js/layout/app.js)-->
  <button 
    type="button"
    class="btn btn-sm btn-light d-flex flex-stack h-45px w-150px "
    data-kt-menu-trigger="click" 
    data-kt-menu-placement="bottom-end" 
    data-kt-menu-flip="top-end"
  >
    <!--begin::Display range-->
    <div class="text-gray-600 fw-bold">{{$t('form.global.date-range')}}</div>
    <!--end::Display range-->
    <KTIcon
      icon-name="calendar-8"
      icon-class="fs-1 ms-2"
    />
  </button>
  <div 
    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-150px w-sm-150px" 
    data-kt-menu="true"
  >
    <div class="menu-item px-3">
      <a class="menu-link px-3 text-gray-600"><span v-text="$t('form.global.today')"></span></a>
    </div>
    <div class="menu-item px-3">
      <a class="menu-link px-3 text-gray-600"><span v-text="$t('form.global.yesterday')"></span></a>
    </div>
    <div class="menu-item px-3">
      <a class="menu-link px-3 text-gray-600"><span v-text="$t('form.global.last-7-days')"></span></a>
    </div>
    <div class="menu-item px-3">
      <a class="menu-link px-3 text-gray-600"><span v-text="$t('form.global.last-30-days')"></span></a>
    </div>
    <div class="menu-item px-3">
      <a class="menu-link px-3 text-gray-600"><span v-text="$t('form.global.this-month')"></span></a>
    </div>
    <div class="menu-item px-3">
      <a class="menu-link px-3 text-gray-600"><span v-text="$t('form.global.last-month')"></span></a>
    </div>
    <div class="menu-item px-3">
      <a class="menu-link px-3 text-gray-600"><span v-text="$t('form.global.last-90-days')"></span></a>
    </div>
  </div>
  <!--end::Daterangepicker-->
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: "date-range-picker",
  components: {
  },
  setup() {

    return {
    };
  },
});
</script>
