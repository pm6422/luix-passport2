<template>
  <!--begin::Drawer-->
  <div
    class="bg-body"
    data-kt-drawer="true"
    data-kt-drawer-activate="true"
    data-kt-drawer-overlay="true"
    data-kt-drawer-width="{default:'300px', 'md': '500px'}"
    data-kt-drawer-direction="end"
    data-kt-drawer-close="#close-drawer-btn"
  >
    <div class="card w-100">
      <!--begin::Card header-->
      <div class="card-header pe-5">
        
        <!--begin::Title-->
        <div class="card-title">
          <!-- <h2 class="fw-bold" v-text="$t('form.asset-group-list.details')"></h2> -->
        </div>
        <!--end::Title-->

        <!--begin::Card toolbar-->
        <div class="card-toolbar">
          <!--begin::Close-->
          <div id="close-drawer-btn" class="btn btn-sm btn-icon btn-active-icon-primary">
            <KTIcon icon-name="cross" icon-class="fs-2x" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Card toolbar-->
      </div>
      <!--end::Card header-->

      <!--begin::Card body-->
      <div class="card-body">
        <!--begin::Summary-->
        <div class="d-flex flex-center flex-column mb-5">
            <!--begin::Symbol-->
            <div class="symbol symbol-70px symbol-circle d-none d-lg-block">
              <span class="symbol-label bg-light-danger">
                <KTIcon icon-name="abstract-28" icon-class="fs-3x text-danger" />
              </span>
            </div>
            <!--end::Symbol-->

            <!--begin::Num-->
            <span class="fs-3 text-gray-800 text-hover-primary fw-bold mt-5 mb-3">
              {{ props.modalData.num }}
            </span>
            <!--end::Num-->
            <!--begin::ID-->
            <!-- <div class="fs-7 fw-semobold text-muted mb-6 d-none d-lg-block">{{ props.modalData.id }} </div> -->
            <!--end::ID-->
          </div>
          <!--end::Summary-->

          <!--begin::Details toggle-->
          <div class="d-flex flex-stack fs-4 py-3">
            <div
              class="fw-bold rotate collapsible"
              data-bs-toggle="collapse"
              href="#view-details"
              role="button"
              aria-expanded="false"
              aria-controls="view-details"
            >
              <span v-text="$t('form.global.details')"></span>
              <span class="ms-2 rotate-180">
                <KTIcon icon-name="down" icon-class="fs-3" />
              </span>
            </div>

            <span class="">
              <button class="btn btn-sm btn-light-primary me-3" 
                v-if="openUpdateModal"
                @click="openUpdateModal(props.modalData)" 
              >
                <span v-text="$t('form.global.update')"></span>
              </button>
              <ConfirmDeleteButton :record="props.modalData" 
                :delete-callback="props.delete" 
                btnStyle="sm"
                v-if="props.delete"
              />
            </span>
          </div>
          <!--end::Details toggle-->

          <div class="separator separator-dashed my-3"></div>

          <!--begin::Details content-->
          <div id="view-details" class="collapse show">
            <div class="py-5 fs-6">
              <!--begin::body-->
              <slot name="body"></slot>
                <!--end::body-->
            </div>
          </div>
          <!--end::Details content-->
      </div>
      <!--end::Card body-->
    </div>
  </div>
  <!--end::Drawer-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ConfirmDeleteButton  from '@/components/button/confirm-delete-button.vue'

export default defineComponent({
  name: "basic-editable-drawer",
  components: {
    ConfirmDeleteButton
  },
  props: {
    modalData: { type: Object, required: true },
    openUpdateModal: { type: Function, required: true },
    delete: { type: Function, required: false }
  },
  setup(props) {

    return {
      props,
    };
  },
});
</script>
