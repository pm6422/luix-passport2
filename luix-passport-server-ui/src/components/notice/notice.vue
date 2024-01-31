<template>
  <!--begin::notice-->
  <div class="notice d-flex rounded border border-dashed p-3 mb-2">
    <!--begin::Icon-->
    <KTIcon icon-name="question-2" icon-class="fs-3tx text-warning me-4 align-items-center" />
    <!--end::Icon-->
    <div class="d-flex flex-stack flex-grow-1">
      <!--begin::Content-->
      <div class="fw-semobold">
        <span class="mb-0 form-text fs-6">{{ text }}</span>
      </div>
      <!--end::Content-->
    </div>
  </div>
  <!--end::notice-->
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";

export default defineComponent({
  name: "notice",
  props: {
    text: String,
  },
  setup(props) {


    return {
    };
  }
});
</script>
