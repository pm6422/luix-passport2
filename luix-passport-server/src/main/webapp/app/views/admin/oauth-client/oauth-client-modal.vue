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
        <el-form-item prop="clientAuthenticationMethods">
          <el-select
              name="clientAuthenticationMethods"
              v-model="modalData.clientAuthenticationMethods"
              clearable
              class="w-100"
          >
            <el-option v-for="(item, key) in clientAuthenticationMethods" :key="key" :value="item" :label="item">{{ item }}</el-option>
          </el-select>
        </el-form-item>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row">
        <label class="col-form-label required fw-semobold" v-text="$t('form.oauth-client.authorization-grant-types')">
        </label>
        <el-form-item prop="authorizationGrantTypes">
          <el-select
              name="authorizationGrantTypes"
              v-model="modalData.authorizationGrantTypes"
              multiple
              collapse-tags
              collapse-tags-tooltip
              :max-collapse-tags="2"
              clearable
              class="w-100"
          >
            <el-option v-for="(item, key) in authorizationGrantTypes" :key="key" :value="item" :label="item">{{ item }}</el-option>
          </el-select>
        </el-form-item>
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
import { OauthClientService } from '@/services/services';

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
    const clientAuthenticationMethods = ref<Array<string>>([]);
    const authorizationGrantTypes = ref<Array<string>>([]);

    OauthClientService.findClientAuthenticationMethods().then(r => {
      clientAuthenticationMethods.value = r.data;
    });
    OauthClientService.findAuthorizationGrantTypes().then(r => {
      authorizationGrantTypes.value = r.data;
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
        var deferred = operation.value === "create" ? OauthClientService.create(modalData.value) : OauthClientService.update(modalData.value);
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
      clientAuthenticationMethods,
      authorizationGrantTypes,
      save,
      operation,
      modalData
    };
  },
});
</script>
