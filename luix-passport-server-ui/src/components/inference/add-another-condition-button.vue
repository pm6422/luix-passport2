<template>
  <!--begin::Add another condition button-->
  <div class="row mt-5">
    <ul class="nav ms-3">
      <li class="nav-item dropdown">
        <button class="btn btn-sm btn-light-primary w-175px px-3" data-bs-toggle="dropdown">
          <KTIcon icon-name="plus" icon-class="fs-3" />
          <span v-text="$t('form.trigger-list.add-another-condition')"></span>
        </button>
        <ul class="dropdown-menu w-175px px-3">
          <li><a class="nav-link dropdown-item rounded text-gray-600" data-bs-toggle="tab" href="#" v-text="$t('dropdown.detection-source-type.currentMsg')" @click="clickAddCallback(groupIndex, 'currentMsg')"></a></li>
          <li><a class="nav-link dropdown-item rounded text-gray-600" data-bs-toggle="tab" href="#" v-text="$t('dropdown.detection-source-type.currentState')" @click="clickAddCallback(groupIndex, 'currentState')"></a></li>
          <li><a class="nav-link dropdown-item rounded text-gray-600" data-bs-toggle="tab" href="#" v-text="$t('dropdown.detection-source-type.prevState')" @click="clickAddCallback(groupIndex, 'prevState')"></a></li>
          <li><a class="nav-link dropdown-item rounded text-gray-600" data-bs-toggle="tab" href="#" v-text="$t('dropdown.detection-source-type.event')" @click="clickAddCallback(groupIndex, 'event')"></a></li>
          <li><a class="nav-link dropdown-item rounded text-gray-600" data-bs-toggle="tab" href="#" v-text="$t('dropdown.detection-source-type.anomaly')" @click="clickAddCallback(groupIndex, 'anomaly')"></a></li>
        </ul>
      </li>
    </ul>
  </div>
  <!--end::Add another condition button-->
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: "add-another-condition-button",
  props: {
    groupIndex: { type: Number, required: true },
    clickAddCallback: { type: Function, required: true }
  },
  setup() {
    return {

    };
  },
});
</script>
