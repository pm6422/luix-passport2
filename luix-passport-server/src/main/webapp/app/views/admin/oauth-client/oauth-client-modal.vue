<template>
  <BasicEditableModal
    :modalTitle="operation === 'create' ? $t('form.oauth-client.create') : (operation === 'update' ? $t('form.oauth-client.update') : $t('form.oauth-client.view'))"
    :modalData="modalData"
    :operation="operation"
    :validationRules="validationRules"
    :saveCallback="save"
    :debug=false
  >
    <template #body>
      <!--begin::Input group-->
      <div class="row">
        <label class="col-form-label required fw-semobold" v-text="$t('form.oauth-client.client-id')"></label>
        <el-form-item prop="clientId">
          <el-input
            name="clientId"
            v-model="modalData.clientId"
          ></el-input>
        </el-form-item>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row">
        <label class="col-form-label required fw-semobold" v-text="$t('form.oauth-client.client-name')"></label>
        <el-form-item prop="clientId">
          <el-input
              name="clientName"
              v-model="modalData.clientName"
          ></el-input>
        </el-form-item>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row">
        <label class="col-form-label required fw-semobold" v-text="$t('form.oauth-client.client-authentication-methods')">
        </label>
        <el-form-item prop="categoryCode">
          <el-select
              name="categoryCode"
              v-model="modalData.clientAuthenticationMethods"
              filterable
              clearable
              allow-create
              default-first-option
              class="w-100"
          >
            <el-option v-for="(item, key) in dictCategoryCodes" :key="key" :value="item" :label="item">{{ item }}</el-option>
          </el-select>
        </el-form-item>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row">
        <label class="col-form-label fw-semobold" v-text="$t('form.data-dict-list.dict-name')"></label>
        <el-form-item prop="dictName">
          <el-input
            name="dictName"
            v-model="modalData.dictName"
          ></el-input>
        </el-form-item>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row">
        <label class="col-form-label fw-semobold" v-text="$t('form.global.description')"></label>
        <el-form-item prop="desc">
          <el-input
            name="desc"
            v-model="modalData.desc"
          ></el-input>
        </el-form-item>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="d-flex flex-stack mt-5">
        <!--begin::Label-->
        <div class="me-5">
          <label class="fs-6 fw-semobold form-label" v-text="$t('form.global.enabled')"></label>
          <div class="fs-7 fw-semobold text-gray-500" v-text="$t('msg.global.enabled-desc')"></div>
        </div>
        <!--end::Label-->
        <!--begin::Switch-->
        <label class="form-check form-switch form-check-custom form-check-solid">
          <input class="form-check-input" type="checkbox" v-model="modalData.enabled"/>
        </label>
        <!--end::Switch-->
      </div>
      <!--end::Input group-->
    </template>
  </BasicEditableModal>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import BasicEditableModal  from '@/components/modals/basic-editable-modal.vue'
import { useI18n } from "vue-i18n";
import type { FormRules } from 'element-plus';
import { map, uniq } from "lodash";
import type { IOauthClient } from '@/domain/OauthClient';
import { DataDictService } from '@/services/services';

export default defineComponent({
  name: "oauth-client-modal",
  components: {
    BasicEditableModal
  },
  props: {
    modalData: { type: Object as () => IOauthClient , required: true },
    operation: { type: String, required: true },
    afterSaveCallback: { type: Function, required: false }
  },
  setup(props) {
    const i18n = useI18n();
    const modalData = ref(props.modalData);
    const operation = ref(props.operation);
    const dictCategoryCodes = ref<Array<any>>([]);

    DataDictService.findAll(true).then(r => {
      dictCategoryCodes.value = uniq(map(r.data, "categoryCode"));
    });
    
    watch(
      () => props.modalData,
      () => {
        modalData.value = props.modalData;
      }
    );

    watch(
      () => props.operation,
      () => {
        operation.value = props.operation;
      }
    );

    const save = (): Promise<any> => {
      return new Promise((resolve, reject) => {
        var deferred = operation.value === "create" ? DataDictService.create(modalData.value) : DataDictService.update(modalData.value);
        deferred.then(result => {
          if(props.afterSaveCallback) {
            props.afterSaveCallback(operation.value);
          }
          resolve(result.data);
        })
        .catch(error => {
          reject(error);
        });
      });
    };
    const validationRules = computed<FormRules>(() => {
      return {
        categoryCode: [
          { required: true, message: i18n.t("validation.global.required"), trigger: 'change' },
        ],
        dictCode: [
          { required: true, message: i18n.t("validation.global.required"), trigger: 'change' },
        ]
      };
    })

    return {
      validationRules,
      dictCategoryCodes,
      save,
      operation,
      modalData
    };
  },
});
</script>
