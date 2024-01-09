<template>
  <!--begin::Modal-->
  <div ref="modalRef" class="modal fade" tabindex="-1" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable p-20" :class="`modal-${modalSize}`">
      <!--begin::Modal content-->
      <div class="modal-content rounded">
        <!--begin::Modal header-->
        <div class="modal-header border-0 pb-0 d-flex flex-stack mb-5">
          <div class="mb-0">

          </div>
          <!--begin::Title-->
          <div class="mb-0">
            <div class="d-flex justify-content-center align-items-center">
              <KTIcon icon-name="question-2" icon-class="fs-2x text-warning me-3 mb-3" v-tooltip :title="modalDesc" v-if="modalDesc"/>
              <img :src="getAssetPath('media/logos/logo.svg')" class="h-30px me-5 mb-3 d-none d-lg-block" v-else/>
              <!--begin::Title-->
              <h1 class="mb-3" v-text="props.modalTitle"></h1>
              <!--end::Title-->
              <!--begin::Num-->
              <div class="text-gray-500 fw-semobold ms-3 fs-7">
                <span v-if="props.modalData && props.modalData.num" v-text="props.modalData.num"></span>
                <!--there are trick bug, it cannot remove the next line-->
                <a href="#"></a>
              </div>
              <!--end::Num-->
            </div>
          </div>
          <!--end::Title-->

          <!--begin::Close-->
          <div class="btn btn-sm btn-icon btn-active-color-primary" @click="discard(formRef)">
            <KTIcon icon-name="cross" icon-class="fs-2tx" />
          </div>
          <!--end::Close-->
        </div>
        <!--begin::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body px-10 px-lg-15 pt-0 pb-0 mx-auto">
          <Error :text="errorMsg"/>
          <!--begin:Form-->
          <el-form
            ref="formRef"
            :model="props.modalData"
            :rules="props.validationRules"
            class="form"
            size="large"
          >
            <!--begin::body-->
            <slot name="body"></slot>
            <!--end::body-->
          </el-form>
          <!--end:Form-->

          <div v-if="debug">
            <!--begin::Label-->
            <label class="form-label fw-semobold mt-5 mb-0">Modal Data</label>
            <!--end::Label-->
            <!--begin::Hint-->
            <div class="form-text">For debug mode</div>
            <!--end::Hint-->
            <CodeHighlighter :obj=modalData lang="json"/>
          </div>
        </div>
        <!--end::Modal body-->

        <!--begin::Modal footer-->
        <div class="modal-footer border-0 d-flex flex-center flex-column">
          <!--begin::updated time-->
          <div class="d-flex fw-semobold text-gray-500 fs-8">
            <span v-if="props.modalData && props.modalData.modifiedTime">{{ $t('form.global.last-modified-at') }}:</span>
            <span v-if="props.modalData && props.modalData.modifiedTime" class="ms-2">{{ DateTimeUtils.formatDateTime(props.modalData.modifiedTime) }}</span>
          </div>
          <!--end::updated time-->
          <!--begin::Actions-->
          <div class="flex mt-1">
            <button
              type="button"
              class="btn btn-light min-w-90px me-3"
              :disabled="formSubmitting"
              @click="discard(formRef)"
            >
              <span v-text="$t('form.global.discard')" v-if="saveBtnEnabled"></span>
              <span v-text="$t('form.global.close')" v-else></span>
            </button>
            <button
              type="button"
              class="btn btn-primary min-w-90px"
              :disabled="formSubmitting"
              :data-kt-indicator="formSubmitting ? 'on' : null"
              @click="submit(formRef)"
              v-if="saveBtnEnabled"
            >
              <span v-if="!formSubmitting" class="indicator-label" v-text="$t('form.global.save')" :id="`modalSaveBtnTxt-${modalData.id}`"></span>
              <span v-if="formSubmitting" class="indicator-progress">
                <span v-text="$t('form.global.wait')"></span>
                <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
              </span>
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
  
<!-- https://stackoverflow.com/questions/71432924/vuejs-3-and-bootstrap-5-modal-reusable-component-show-programmatically
https://stackoverflow.com/questions/74864446/how-to-open-modal-after-its-been-added-to-dom-vue-3-bootstrap-5-nodejs -->

<script lang="ts">
import { getAssetPath } from "@/helpers/assets";
import { defineComponent, ref, watch } from "vue";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { hideModal } from "@/helpers/dom";
import { useI18n } from "vue-i18n";
import type { FormInstance } from 'element-plus'
import { DateTimeUtils } from "@/helpers/DateTimeUtils";
import CodeHighlighter from "@/components/highlighters/CodeHighlighter.vue";
import Error from "@/components/notice/error.vue";

export default defineComponent({
  name: "edit-modal",
  components: {
    CodeHighlighter,
    Error
  },
  props: {
    modalTitle: { type: String, required: true },
    modalDesc: { type: String, required: false },
    modalData: { type: Object, required: true },
    operation: { type: String, required: false, default: "create" },
    validationRules: { type: Object, required: false },
    validateForm: { type: Function, required: false },
    saveCallback: { type: Function, required: false },
    discardCallback: { type: Function, required: false },
    modalSize: { 
      type: String as () => "lg" | "xl" | "fullscreen",
      required: false, 
      default: "lg" 
    },
    debug: { type: Boolean, required: false },
    saveBtnEnabled: { type: Boolean, required: false, default: true }
  },
  setup(props) {
    const i18n = useI18n();
    const modalRef = ref<null | HTMLElement>(null);
    const formRef = ref<FormInstance>();
    const formSubmitting = ref<boolean>(false);
    const errorMsg = ref("");

    const discard = (formInstance: FormInstance | undefined) => {
      if (!formInstance) {
        return;
      }

      // formInstance.resetFields();
      errorMsg.value = "";
      hideModal(modalRef.value);
      if(props.discardCallback) {
        props.discardCallback();
      }
    }

    const submit = (formInstance: FormInstance | undefined) => {
      if (!formInstance) {
        return;
      }

      formInstance.validate((valid, fields) => {
        if (!valid) {
          errorMsg.value = i18n.t("msg.global.check-input");
          return false;
        }

        if(props.validateForm) {
          const error = props.validateForm();
          if(error) {
            errorMsg.value = error;
            return false;
          } 
        } 

        formSubmitting.value = true;
        if(props.saveCallback) {
          props.saveCallback()
          .then(data => {
            // Success
            setTimeout(() => {
              formSubmitting.value = false;
              errorMsg.value = "";
              Swal.fire({
                text: i18n.t("msg.global.saved-successfully"),
                icon: "success",
                showConfirmButton: false,
                timer: 1000,
                heightAuto: false,
              }).then(() => {
                if(props.operation === 'create') {
                  formInstance.resetFields();
                }
                hideModal(modalRef.value);
              });
            }, 1000);
          })
          .catch(error => { 
            // errorMsg.value = error;
            formSubmitting.value = false;
          });
        } else {
          hideModal(modalRef.value);
        }
      });
    };

    return {
      getAssetPath,
      modalRef,
      submit,
      discard,
      props,
      formRef,
      formSubmitting,
      DateTimeUtils,
      errorMsg
    };
  },
});
</script>