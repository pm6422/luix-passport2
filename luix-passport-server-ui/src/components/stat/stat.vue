<template>
  <!--begin::Card-->
  <div class="card h-100 bg-light-danger border border-dashed">
    <!--begin::Background-->
    <div v-if="icon" class="position-absolute top-0 end-0 bottom-0 opacity-25 d-flex align-items-center me-20 pe-20">
      <KTIcon :icon-name="icon" icon-class="fs-7tx text-danger"></KTIcon>
    </div>
    <!--end::Background-->
    <!--begin::Card body-->
    <div class="card-body p-6">
      <!--begin::Heading-->
      <div class="fs-6 fw-semi-bold text-dark mb-7">{{ title }}</div>
      <!--end::Heading-->
      <!--begin::Wrapper-->
      <div class="d-flex flex-wrap">
        <!--begin::Labels-->
        <div class="d-flex flex-column justify-content-center flex-row-fluid pe-10">
          <!--begin::Label-->
          <div class="d-flex fs-6 fw-semibold align-items-center mb-3" v-for="(item, i) in array">
            <!-- <div class="bullet bg-primary me-3"></div> -->
            <div class="text-gray-600">{{item.first}}</div>
            <div class="ms-auto fw-bold text-gray-700">{{item.second}}</div>
          </div>
          <!--end::Label-->
        </div>
        <!--end::Labels-->
      </div>
      <!--end::Wrapper-->
  </div>
  <!--end::Card body-->
</div>
<!--end::Card-->
</template>

<script lang="ts">

  import { defineComponent } from "vue";

  export default defineComponent({
    name: "stat",
    props: {
      title: { type: String, required: true },
      icon: { type: String, required: false },
      array: { type: Array<any>, required: true }
    },
    setup() {
      return {
    };
    },
  });
</script>
