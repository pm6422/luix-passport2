<template>
  <!--begin::Add another group button-->
  <button 
    type="button" 
    class="btn btn-sm btn-light-success w-175px px-3 mt-5" 
    data-kt-menu-trigger="click" 
    data-kt-menu-placement="bottom-end"
  >
    <KTIcon icon-name="plus" icon-class="fs-3" />
    <span v-text="$t('form.trigger-list.add-another-group')"></span>
  </button>
  <!--begin::Menu-->
  <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-6 w-175px py-4" data-kt-menu="true">
    <div class="menu-item px-3">
      <a class="menu-link px-3" v-text="$t('form.global.and')" @click="clickAddCallback('AND')"></a>
    </div>
    <div class="menu-item px-3">
      <a class="menu-link px-3" v-text="$t('form.global.or')" @click="clickAddCallback('OR')"></a>
    </div>
  </div>
  <!--end::Menu-->
  <!--end::Add another group button-->
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: "add-another-group-button",
  props: {
    clickAddCallback: { type: Function, required: true }
  },
  setup() {
    return {

    };
  },
});
</script>
