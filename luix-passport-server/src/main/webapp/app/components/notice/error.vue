<template>
  <!--begin::alert-->
  <div class="alert bg-light-danger d-flex flex-column flex-sm-row p-2 mb-3" v-if="text">
    <!--begin::Icon-->
    <KTIcon icon-name="information-5" icon-class="fs-2tx text-danger me-5 align-items-center" />
    <!--end::Icon-->
    <!--begin::Wrapper-->
    <span class="fw-semibold d-flex align-items-center">{{ text }}</span>
    <!--end::Wrapper-->
  </div>
  <!--end::alert-->
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "error",
  props: {
    text: String,
  },
  setup(props) {


    return {
    };
  }
});
</script>
