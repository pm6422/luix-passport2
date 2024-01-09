<template>
  <!--begin::Modal-->
  <div ref="modalRef" class="modal fade" tabindex="-1" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="true">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg p-20">
      <!--begin::Modal content-->
      <div class="modal-content rounded">
        <!--begin::Modal header-->
        <div class="modal-header border-0 pb-0 d-flex flex-stack mb-5">
          <div class="mb-0">

          </div>
          <!--begin::Title-->
          <div class="mb-0">
            <div class="d-flex justify-content-center align-items-center">
              <!--begin::Title-->
              <h1 class="mb-3" v-text="title"></h1>
              <!--end::Title-->
            </div>
          </div>
          <!--end::Title-->

          <!--begin::Close-->
          <div class="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
            <KTIcon icon-name="cross" icon-class="fs-2tx" />
          </div>
          <!--end::Close-->
        </div>
        <!--begin::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body px-10 px-lg-15 pt-0 pb-0 mx-auto">
          <!--begin::Table container-->
          <div class="table-responsive h-400px">
            <!--begin::Table-->
            <table
              class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4"
            >
              <!--begin::Table head-->
              <thead>
                <tr class="fw-bold text-uppercase">
                  <th class="min-w-200px">{{$t('form.global.name')}}</th>
                  <th class="min-w-200px">{{$t('form.global.value')}}</th>
                </tr>
              </thead>
              <!--end::Table head-->

              <!--begin::Table body-->
              <tbody>
                <template v-for="(row, index) in tableData" :key="index">
                  <tr>
                    <td>
                      <span class="text-gray-800">
                        {{ row.name }}
                      </span>
                    </td>
                    <td>
                      <div class="text-gray-800">
                        {{ row.value }}
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
              <!--end::Table body-->
            </table>
            <!--end::Table-->
          </div>
          <!--end::Table container-->
        </div>
        <!--end::Modal body-->

        <!--begin::Modal footer-->
        <div class="modal-footer border-0 d-flex flex-center flex-column">
          <!--begin::Actions-->
          <div class="flex mt-1" data-bs-dismiss="modal">
            <button
              type="button"
              class="btn btn-light min-w-90px me-3"
            >
              <span v-text="$t('form.global.close')"></span>
            </button>
          </div>
          <!--end::Actions-->
        </div>
        <!--end::Modal footer-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--end::Modal-->
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { find } from "lodash";

export default defineComponent({
  name: "properties-modal",
  components: {
  },
  props: {
    title: { type: String, required: true },
    tableData: { type: Array , required: true }
  },
  setup(props) {
    const i18n = useI18n();
    const modalRef = ref<null | HTMLElement>(null);
    const tableData = ref(props.tableData);
    
    watch(
      () => props.tableData,
      () => {
        tableData.value = props.tableData;
      }
    );

    return {
      tableData,
      modalRef
    };
  },
});
</script>
