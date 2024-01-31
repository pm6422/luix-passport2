<template>
  <div class="fw-bold me-5">
    <span class="me-2">{{ props.selectedIds.length }}</span>{{ $t('form.global.selected') }}
  </div>
  <button
    type="button"
    class="btn btn-danger"
    @click="deleteSelected()"
  >
  {{ $t('form.global.delete-selected') }}
  </button>
</template>
  
<script lang="ts">
import { defineComponent, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "batch-delete-button",
  components: {
  },
  props: {
    selectedIds: { type: Array<string>, required: true },
    deleteRecordCallback: { type: Function, required: true },
    afterDeleteCallback: { type: Function, required: false }
  },
  setup(props) {
    const i18n = useI18n();

    const deleteSelected = () => {
      Swal.fire({
        text: i18n.t("msg.global.del-selected-confirm"),
        icon: "warning",
        confirmButtonText: i18n.t("form.global.delete"),
        cancelButtonText: i18n.t("form.global.discard"),
        buttonsStyling: false,
        showConfirmButton: true,
        showCancelButton: true,
        heightAuto: false,
        reverseButtons: true,
        customClass: {
          confirmButton: "btn btn-light-danger",
          cancelButton: 'btn btn-light-dark'
        },
      }).then((result) => {
        if (result.isConfirmed) {
          props.selectedIds.forEach((id) => {
            props.deleteRecordCallback(id);
          });
          if(props.afterDeleteCallback) {
            props.afterDeleteCallback();
          }
          Swal.fire({
            text: i18n.t("msg.global.deleted-successfully"),
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
            heightAuto: false,
          }).then(() => {
          });
          props.selectedIds.length = 0;
        }
      });
    };

    return {
      props,
      deleteSelected
    };
  },
});
</script>