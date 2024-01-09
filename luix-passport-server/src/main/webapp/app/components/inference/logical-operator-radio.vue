<template>
  <!--begin::Logical operator-->
  <div class="d-flex flex-wrap text-gray-600 gap-5 mb-5">
    <span> {{$t('form.trigger-list.match-tip')}}</span>
    <!--begin::Radio-->
    <div class="form-check form-check-custom form-check-solid">
      <input 
        class="form-check-input" 
        type="radio" 
        value="AND" 
        v-model="groupData.logicalOperators[0]" 
      />
      <label class="form-check-label" v-text="$t('form.trigger-list.all-conditions')"></label>
    </div>
    <!--end::Radio-->
    <!--begin::Radio-->
    <div class="form-check form-check-custom form-check-solid">
      <input 
        class="form-check-input" 
        type="radio" 
        value="OR"
        v-model="groupData.logicalOperators[0]" 
      />
      <label class="form-check-label" v-text="$t('form.trigger-list.any-conditions')"></label>
    </div>
    <!--end::Radio-->
  </div>
  <!--end::Logical operator-->
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: "logical-operator-radio",
  props: {
    groupData: { type: Object, required: true },
  },
  setup() {
    return {

    };
  },
});
</script>
