<template>
  <button 
    class="btn btn-sm btn-bg-light btn-light-danger" 
    :class="{'disabled': disabled }"
    @click="confirmDelete(props.record)" 
    v-if="props.btnStyle === 'sm'"
  >
    <span v-text="$t('form.global.delete')"></span>
  </button>
  <button 
    class="btn btn-sm btn-icon btn-bg-light btn-light-danger" 
    :class="{'disabled': disabled }"
    @click="confirmDelete(props.record)" 
    data-bs-toggle="tooltip" 
    :title="disableCallback ? $t('form.global.disable-or-delete') : $t('form.global.delete')" 
    v-if="props.btnStyle === 'icon'"
  >
    <KTIcon icon-name="trash" icon-class="fs-3"/>
  </button>
</template>
  
<script lang="ts">
import { defineComponent, ref } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "confirm-delete-button",
  components: {
  },
  props: {
    record: { type: Object, required: true },
    btnStyle: { type: String, required: false, default: "icon" },
    deleteCallback: { type: Function, required: true },
    disableCallback: { type: Function, required: false },
    disabled: { type: Boolean, required: false, default: false },
    afterDeleteCallback: { type: Function, required: false },
    afterDisableCallback: { type: Function, required: false }
  },
  setup(props) {
    const i18n = useI18n();

    const confirmDelete = (record: any) => {
      if(props.disableCallback) {
        Swal.fire({
          text: i18n.t("msg.global.del-disable-record-confirm"),
          icon: "warning",
          confirmButtonText: i18n.t("form.global.delete"),
          denyButtonText: i18n.t("form.global.disable"),
          cancelButtonText: i18n.t("form.global.discard"),
          buttonsStyling: false,
          showConfirmButton: true,
          showDenyButton: true,
          showCancelButton: true,
          heightAuto: false,
          reverseButtons: true,
          customClass: {
            confirmButton: "btn btn-light-danger",
            denyButton: "btn btn-light-info",
            cancelButton: 'btn btn-light-dark'
          },
        }).then((result) => {
          // todo: delete record from API
          if (result.isConfirmed) {
            const errorMsg = props.deleteCallback(record.id);
            if(!errorMsg) {
              Swal.fire({
                text: i18n.t("msg.global.deleted-successfully"),
                icon: "success",
                showConfirmButton: false,
                timer: 1000,
                heightAuto: false,
              }).then(() => {
              });
            } else {
              Swal.fire({
                text: i18n.t("msg.global.deleted-failed"),
                icon: "error",
                confirmButtonText: errorMsg,
                buttonsStyling: false,
                showConfirmButton: true,
                heightAuto: false,
                customClass: {
                  confirmButton: "btn btn-light-danger",
                },
              }).then(() => {
              });
            }
          } else if (result.isDenied) {
            record.enabled = false;
            if(props.disableCallback) {
              const errorMsg = props.disableCallback(record.id);
              if(errorMsg) {
                Swal.fire({
                text: i18n.t("msg.global.saved-failed"),
                icon: "error",
                confirmButtonText: errorMsg,
                buttonsStyling: false,
                showConfirmButton: true,
                heightAuto: false,
                customClass: {
                  confirmButton: "btn btn-light-danger",
                },
              }).then(() => {
              });
              }
            }
            Swal.fire({
              text: i18n.t("msg.global.disabled-successfully"),
              icon: "success",
              showConfirmButton: false,
              timer: 1000,
              heightAuto: false,
            }).then(() => {
            });
          }
        });
      } else {
        Swal.fire({
          text: i18n.t("msg.global.del-record-confirm"),
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
          // todo: delete record from API
          if (result.isConfirmed) {
            const errorMsg = props.deleteCallback(record.id);
            if(!errorMsg) {
              Swal.fire({
                text: i18n.t("msg.global.deleted-successfully"),
                icon: "success",
                showConfirmButton: false,
                timer: 1000,
                heightAuto: false,
              }).then(() => {
              });
            } else {
              Swal.fire({
                text: i18n.t("msg.global.deleted-failed"),
                icon: "error",
                confirmButtonText: errorMsg,
                buttonsStyling: false,
                showConfirmButton: true,
                heightAuto: false,
                customClass: {
                  confirmButton: "btn btn-light-danger",
                },
              }).then(() => {
              });
            }
          }
        });
      }
    }

    return {
      confirmDelete,
      props,
    };
  },
});
</script>