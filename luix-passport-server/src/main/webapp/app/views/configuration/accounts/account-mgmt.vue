<template>
  <!--begin::Row-->
  <div class="d-flex flex-column flex-lg-row">
    
    <!--begin::list-->
    <div class="flex-lg-row-fluid me-lg-5 order-2 order-lg-1 mb-10 mb-lg-0">
      <!--begin::Card-->
      <div class="card">
        <!--begin::Card header-->
        <div class="card-header border-0 pt-6">
          <!--begin::Card title-->
          <div class="card-title">
            <!--begin::Search-->
            <SearchBox :initTableData="initialTableData" @onUpdateTableData="updateTableData"/>
            <!--end::Search-->
          </div>
          <!--begin::Card title-->
          <!--begin::Card toolbar-->
          <div class="card-toolbar">
            <!--begin::Toolbar-->
            <div v-if="selectedIds.length === 0" class="d-flex justify-content-end" data-kt-subscription-table-toolbar="base">
              <button class="btn btn-light-primary px-5" @click="clickCreateUser()">
                <KTIcon icon-name="plus" icon-class="fs-3" />
                <span v-text="$t('form.account.create-user')"></span>
              </button>
            </div>
            <div v-else class="d-flex justify-content-end align-items-center">
              <BatchDeleteButton :selectedIds="selectedIds" :deleteRecordCallback="deleteRecord"/>
            </div>
            <!--end::Toolbar-->
          </div>
          <!--end::Card toolbar-->
        </div>
        <!--end::Card header-->
        <!--begin::Card body-->
        <div class="card-body pt-0">
          <KTDatatable
              :header="tableHeader"
              :data="tableData"
              :page-no="currentPageNo"
              :page-size="currentPageSize"
              :totalItems=tableTotalItems
              :checkboxEnabled=true
              @onItemsSelect="selectItems"
              @onSortChange="changeSort"
              @onPageNoChange="changePage"
              @onPageSizeChange="changePage"
          >
            <template v-slot:username="{ row: row }">
              <a class="badge badge-light-primary cursor-pointer" @click="clickViewUser(row)">
                <span>{{ row.username }}</span>
              </a>
            </template>
            <template v-slot:email="{ row: row }">
              <div class="d-flex align-items-center">
                <!--begin::Avatar-->
                <div class="symbol symbol-35px symbol-circle">
                  <img alt="avatar" :src="getAssetPath(`media/avatars/${row.avatar}`)" />
                </div>
                <!--end::Avatar-->
                <!--begin::Details-->
                <div class="ms-5">
                  <Abbreviation :text="`${row.firstName}&nbsp;${row.lastName}`" :maxTextLength="15" class="fs-6 fw-bold text-gray-900 text-hover-primary mb-2"/>
                  <div class="fw-semibold text-muted fs-7">{{ row.email }}</div>
                </div>
                <!--end::Details-->
              </div>
            </template>
            <template v-slot:mobileNo="{ row: row }">
              <div class="fs-7">{{ row.mobileNo }}</div>
            </template>
            <template v-slot:roles="{ row: row }">
              <OneOrMore :values="row.roles"/>
            </template>
            <template v-slot:joinedTime="{ row: row }">
              <div class="fs-7">{{ DateTimeUtils.formatDateTime(row.lastLogin) }}</div>
              <div class="fs-7">{{ DateTimeUtils.formatDateTime(row.createdTime) }}</div>
            </template>
            <template v-slot:enabled="{ row: row }">
              <YesOrNo :val="row.enabled"/>
            </template>
            <template v-slot:activated="{ row: row }">
              <YesOrNo :val="row.activated"/>
            </template>
            <template v-slot:actions="{ row: row }">
              <div class="d-flex justify-content-end">
                <a class="btn btn-sm btn-icon btn-bg-light btn-light-warning me-1" 
                  @click="clickViewUser(row)" 
                  data-bs-toggle="tooltip" 
                  :title="$t('form.global.view')"
                >
                  <KTIcon icon-name="eye" icon-class="fs-3"/>
                </a>
                <a class="btn btn-sm btn-icon btn-bg-light btn-light-primary me-1" 
                  @click="clickUpdateUser(row)" 
                  data-bs-toggle="tooltip" 
                  :title="$t('form.global.update')"
                >
                  <KTIcon icon-name="pencil" icon-class="fs-3"/>
                </a>
                <ConfirmDeleteButton 
                  :record="row" 
                  :delete-callback="deleteRecord" 
                  :disable-callback="disableRecord"
                  btnStyle="icon"
                />
              </div>
            </template>
          </KTDatatable>
        </div>
        <!--end::Card body-->
      </div>
      <!--end::Card-->
    </div>
    <!--end::list-->

    <!--begin::view user-->
    <div v-show="viewFormVisible" class="flex-column flex-lg-row-auto w-lg-300px w-xl-380px mb-10 order-1 order-lg-2">
      <!--begin::Card-->
      <div
        class="card card-flush mb-0"
        id="viewUserSection"
        data-kt-sticky="true"
        data-kt-sticky-name="viewUserSection"
        data-kt-sticky-offset="{default: false, lg: '200px'}"
        data-kt-sticky-width="{lg: '300px', xl: '300px'}"
        data-kt-sticky-left="auto"
        data-kt-sticky-top="85px"
        data-kt-sticky-animation="true"
        data-kt-sticky-zindex="95"
      >
        <!--begin::Card header-->
        <div class="card-header">
          <!--begin::Card title-->
          <div class="card-title">
            <h2 v-text="$t('form.account.user-details')"></h2>
          </div>
          <!--end::Card title-->
        </div>
        <!--end::Card header-->

        <!--begin::Card body-->
        <div class="card-body pt-0">
          <!--begin::Section-->
          <div class="mb-4">
            <!--begin::Details-->
            <div class="d-flex align-items-center">
              <!--begin::Avatar-->
              <div class="symbol symbol-50px symbol-circle me-3">
                <img alt="Pic" :src="getAssetPath(`media/avatars/${modalData.avatar}`)" />
              </div>
              <!--end::Avatar-->

              <!--begin::Info-->
              <div class="d-flex flex-column">
                <!--begin::Name-->
                <a class="fs-4 fw-bold text-gray-900 text-hover-primary me-2">{{modalData.firstName}}&nbsp;{{modalData.lastName}}</a>
                <!--end::Name-->

                <!--begin::Email-->
                <a class="fw-semobold text-gray-600 text-hover-primary">{{ modalData.email }}</a>
                <!--end::Email-->
              </div>
              <!--end::Info-->
            </div>
            <!--end::Details-->
          </div>
          <!--end::Section-->

          <!--begin::Seperator-->
          <div class="separator separator-dashed mb-4"></div>
          <!--end::Seperator-->

          <!--begin::Scroll-->
          <div
              class="scroll-y me-n7 pe-7"
              id="modal-scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#modal-header"
              data-kt-scroll-wrappers="#modal-scroll"
              data-kt-scroll-offset="300px"
            >
            <!--begin::Section-->
            <div class="mb-1">
              <!--begin::Details-->
              <table class="table fw-semobold gs-0 gx-2 gy-2">
                <!--begin::Title-->
                <h5 class="mb-5" v-text="$t('form.global.basic-info')"></h5>
                <!--end::Title-->

                <!--begin::Row-->
                <tr class="">
                  <td class="text-gray-400" v-text="$t('form.profile.username')"></td>
                  <td class="text-gray-800">{{ modalData.username }}</td>
                </tr>
                <!--end::Row-->

                <!--begin::Row-->
                <tr class="">
                  <td class="text-gray-400" v-text="$t('form.profile.mobile-no')"></td>
                  <td id = "mobileNo" class="text-gray-800">{{ modalData.mobileNo }}</td>
                </tr>
                <!--end::Row-->

                <!--begin::Row-->
                <tr class="">
                  <td class="text-gray-400" v-text="$t('form.account.joined-time')"></td>
                  <td class="text-gray-800 fs-8">{{ DateTimeUtils.formatDateTime(modalData.createdTime) }}</td>
                </tr>
                <!--end::Row-->

                <!--begin::Row-->
                <tr class="">
                  <td class="text-gray-400" v-text="$t('form.account.last-login-time')"></td>
                  <td class="text-gray-800 fs-8">{{ DateTimeUtils.formatDateTime(modalData.lastLogin) }}</td>
                </tr>
                <!--end::Row-->

                <!--begin::Row-->
                <tr class="">
                  <td class="text-gray-400" v-text="$t('form.global.enabled')"></td>
                  <td><YesOrNo :val="modalData.enabled" class="px-0"/></td>
                </tr>
                <!--end::Row-->

                <!--begin::Row-->
                <tr class="">
                  <td class="text-gray-400" v-text="$t('form.account.activated')"></td>
                  <td><YesOrNo :val="modalData.activated" class="px-0"/></td>
                </tr>
                <!--end::Row-->

                <!--begin::Row-->
                <tr class="">
                  <td class="text-gray-400" v-text="$t('form.global.created-by')"></td>
                  <td class="text-gray-800 fs-7">{{ modalData.createdBy }}</td>
                </tr>
                <!--end::Row-->

                <!--begin::Row-->
                <tr class="">
                  <td class="text-gray-400" v-text="$t('form.global.created-time')"></td>
                  <td class="text-gray-800 fs-7">{{ DateTimeUtils.formatDateTime(modalData.createdTime) }}</td>
                </tr>
                <!--end::Row-->

                <!--begin::Row-->
                <tr class="">
                  <td class="text-gray-400" v-text="$t('form.global.modified-by')"></td>
                  <td class="text-gray-800 fs-7">{{ modalData.modifiedBy }}</td>
                </tr>
                <!--end::Row-->

                <!--begin::Row-->
                <tr class="">
                  <td class="text-gray-400" v-text="$t('form.global.modified-time')"></td>
                  <td class="text-gray-800 fs-7">{{ DateTimeUtils.formatDateTime(modalData.modifiedTime) }}</td>
                </tr>
                <!--end::Row-->

                <!--begin::Title-->
                <h5 class="mt-5" v-text="$t('form.account.authorities')"></h5>
                <!--end::Title-->

                <!--begin::Row-->
                <tr class="">
                  <td class="text-gray-400" v-text="$t('form.account.roles')"></td>
                  <td class="text-gray-800">
                    <OneOrMore :values="modalData.roles"/>
                  </td>
                </tr>
                <!--end::Row-->
              </table>
              <!--end::Details-->
            </div>
            <!--end::Section-->
          </div>
          <!--end::Scroll-->
        </div>
        <!--end::Card body-->
      </div>
      <!--end::Card-->
    </div>
    <!--end::view user-->

    <!--begin::edit user-->
    <div v-show="editFormVisible" class="flex-column flex-lg-row-auto w-lg-300px w-xl-380px mb-10 order-1 order-lg-2">
      <!--begin::Card-->
      <div
        class="card card-flush mb-0"
        id="editUserSection"
        data-kt-sticky="true"
        data-kt-sticky-name="editUserSection"
        data-kt-sticky-offset="{default: false, lg: '200px'}"
        data-kt-sticky-width="{lg: '300px', xl: '300px'}"
        data-kt-sticky-left="auto"
        data-kt-sticky-top="85px"
        data-kt-sticky-animation="true"
        data-kt-sticky-zindex="95"
      >
        <!--begin::Card header-->
        <div class="card-header">
          <!--begin::Card title-->
          <div class="card-title">
            <h2 v-if="operation === 'update'" v-text="$t('form.account.update-user')"></h2>
            <h2 v-else v-text="$t('form.account.create-user')"></h2>
          </div>
          <!--end::Card title-->
        </div>
        <!--end::Card header-->

        <!--begin::Card body-->
        <div class="card-body pt-0">
          <!--begin::Section-->
          <div class="mb-4" v-if="operation === 'update'">
            <!--begin::Details-->
            <div class="d-flex align-items-center">
              <!--begin::Avatar-->
              <div class="symbol symbol-50px symbol-circle me-3">
                <img alt="avatar" :src="getAssetPath(`media/avatars/${modalData.avatar}`)" />
              </div>
              <!--end::Avatar-->

              <!--begin::Info-->
              <div class="d-flex flex-column">
                <!--begin::Name-->
                <a class="fs-4 fw-bold text-gray-900 text-hover-primary me-2">{{modalData.firstName}}&nbsp;{{modalData.lastName}}</a>
                <!--end::Name-->

                <!--begin::Email-->
                <a class="fw-semobold text-gray-600 text-hover-primary">{{ modalData.email }}</a>
                <!--end::Email-->
              </div>
              <!--end::Info-->
            </div>
            <!--end::Details-->
          </div>
          <!--end::Section-->

          <!--begin::Seperator-->
          <div class="separator separator-dashed mb-4" :class="{ 'd-none': collapseDetails }"></div>
          <!--end::Seperator-->

          <!--begin::Scroll-->
          <div
              class="scroll-y me-n7 pe-7"
              id="modal-scroll"
              data-kt-scroll="true"
              data-kt-scroll-activate="{default: false, lg: true}"
              data-kt-scroll-max-height="auto"
              data-kt-scroll-dependencies="#modal-header"
              data-kt-scroll-wrappers="#modal-scroll"
              data-kt-scroll-offset="300px"
            >
            <!--begin::Section-->
            <div class="mb-1" :class="{ 'd-none': collapseDetails }">
              <!--begin::Details-->
              <div class="">
                <el-form
                  ref="editFormRef"
                  :model="modalData"
                  :rules="validationRules"
                  class="form"
                  size="default"
                >
                  <!--begin::errors-->
                  <!-- https://vee-validate.logaretm.com/v4/guide/composition-api/validation#displaying-errors-with-useform -->
                  <!-- <pre>{{ errors }}</pre> -->
                  <!--begin::errors-->

                  <!--begin::Input group-->
                  <div class="row" v-show="operation === 'create'">
                    <label class="col-form-label required fw-semobold py-0" v-text="$t('form.profile.username')"></label>
                    <!--begin::Hint-->
                    <div class="form-text mb-2" v-text="$t('msg.global.username-tip')"></div>
                    <!--end::Hint-->
                    <el-form-item prop="username">
                      <el-input
                        name="username"
                        v-model="modalData.username"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <!--end::Input group-->

                  <!--begin::Input group-->
                  <div class="row g-3">
                    <!--begin::Col-->
                    <div class="col-md-6 fv-row" :class="{'order-2': currentLanguage === 'zh', 'order-1': currentLanguage === 'en'}">
                      <label class="col-form-label required fw-semobold" v-text="$t('form.profile.first-name')"></label>
                      <el-form-item prop="firstName">
                        <el-input
                          name="firstName"
                          v-model="modalData.firstName"
                          v-bind:placeholder="$t('form.profile.first-name')"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <!--end::Col-->

                    <!--begin::Col-->
                    <div class="col-md-6 fv-row" :class="{'order-1': currentLanguage === 'zh', 'order-2': currentLanguage === 'en'}">
                      <label class="col-form-label required fw-semobold" v-text="$t('form.profile.last-name')"></label>
                      <el-form-item prop="lastName">
                        <el-input
                          name="lastName"
                          v-model="modalData.lastName"
                          v-bind:placeholder="$t('form.profile.last-name')"
                        ></el-input>
                      </el-form-item>
                    </div>
                    <!--end::Col-->
                  </div>
                  <!--end::Input group-->

                  <!--begin::Input group-->
                  <div class="row">
                    <label class="col-form-label required fw-semobold" v-text="$t('form.profile.email')"></label>
                    <el-form-item prop="email">
                      <el-input
                        name="email"
                        v-model="modalData.email"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <!--end::Input group-->

                  <!--begin::Input group-->
                  <div class="row">
                    <label class="col-form-label required fw-semobold py-0" v-text="$t('form.profile.mobile-no')"></label>
                    <!--begin::Hint-->
                    <div class="form-text mb-2" v-text="$t('msg.global.active-mobile-num-tip')"></div>
                    <!--end::Hint-->
                    <el-form-item prop="mobileNo">
                      <el-input
                        name="mobileNo"
                        v-model="modalData.mobileNo"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <!--end::Input group-->

                  <!--begin::Input group-->
                  <div class="row">
                    <label class="fw-semobold">
                      <span class="required" v-text="$t('form.account.roles')"></span>
                    </label>
                    <!--begin::Hint-->
                    <div class="form-text mb-2" v-text="$t('msg.global.support-multiple-tip')"></div>
                    <!--end::Hint-->
                    <el-form-item prop="roles">
<!--                      <el-select-->
<!--                        v-bind:placeholder="$t('form.global.multi-select')"-->
<!--                        name="roles"-->
<!--                        v-model="modalData.roles"-->
<!--                        multiple-->
<!--                        collapse-tags-->
<!--                        collapse-tags-tooltip-->
<!--                        :max-collapse-tags="2"-->
<!--                        clearable-->
<!--                      >-->
<!--                        <el-option v-for="(role, key) in enabledRoles" :key="key" :value="role.dictCode" :label="role.dictCode">{{ role.dictCode }}</el-option>-->
<!--                      </el-select>-->

                      <el-checkbox-group v-model="modalData.roles">
                        <el-checkbox-button v-for="(item, key) in enabledRoles" :label="item.dictCode" :key="key"></el-checkbox-button>
                      </el-checkbox-group>
                    </el-form-item>
                  </div>
                  <!--end::Input group-->

                  <!--begin::Input group-->
                  <div class="row">
                    <el-form-item>
                      <label class="col-form-label fw-semobold">
                        <span v-text="$t('form.global.enabled')"></span>
                      </label>
                      <el-switch v-model="modalData.enabled" class="ms-5"/>
                    </el-form-item>
                  </div>
                  <!--end::Input group-->

                  <!--begin::Actions-->
                  <div class="text-end">
                    <button type="button" class="btn btn-light btn-sm min-w-80px me-3" @click="collapseDetails = !collapseDetails">
                      <span v-text="$t('form.global.discard')"></span>
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary btn-sm min-w-80px"
                      :data-kt-indicator="formSubmitting ? 'on' : null"
                      :disabled="formSubmitting"
                      @click="saveUser(editFormRef)"
                    >
                      <span v-if="!formSubmitting" class="indicator-label" v-text="$t('form.global.save')"></span>
                      <span v-if="formSubmitting" class="indicator-progress">
                        <span v-text="$t('form.global.wait')"></span>
                        <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                      </span>
                    </button>
                  </div>
                  <!--end::Actions-->
                </el-form>
              </div>
              <!--end::Details-->
            </div>
            <!--end::Section-->
          </div>
          <!--end::Scroll-->
        </div>
        <!--end::Card body-->
      </div>
      <!--end::Card-->
    </div>
    <!--end::edit user-->
  </div>
  <!--end::Row-->
  </template>
  
<script lang="ts">
import { getAssetPath } from "@/helpers/assets";
import { defineComponent, ref, computed, onMounted } from "vue";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable/domain/Sort";
import type { Column } from "@/components/kt-datatable/domain/Column";
import arraySort from "array-sort";
import { useI18n } from "vue-i18n";
import data from "@/data/data";
import Swal from "sweetalert2/dist/sweetalert2.js";
import YesOrNo  from '@/components/utilities/yes-or-no.vue';
import OneOrMore  from '@/components/utilities/one-or-more.vue';
import type { FormInstance, FormRules } from 'element-plus';
import type { IUser } from '@/domain/User';
import { DateTimeUtils } from "@/helpers/DateTimeUtils";
import ConfirmDeleteButton  from '@/components/button/confirm-delete-button.vue';
import BatchDeleteButton  from '@/components/button/batch-delete-button.vue';
import SearchBox  from '@/components/search/search-box.vue';
import { cloneDeep, remove } from "lodash";
import Abbreviation  from '@/components/utilities/abbreviation.vue';
import type {IDataDict} from "@/main/webapp/app/domain/DataDict";
import {useRoute, useRouter} from "vue-router";
import { UserService, DataDictService } from "@/services/services";
import {TableHelper} from "@/helpers/TableHelper";

export default defineComponent({
  name: "account-mgmt",
  components: {
    KTDatatable,
    YesOrNo,
    OneOrMore,
    ConfirmDeleteButton,
    BatchDeleteButton,
    SearchBox,
    Abbreviation
  },
  setup() {
    const i18n = useI18n();
    const selectedIds = ref<Array<string>>([]);
    const initialTableData = ref<Array<IDataDict>>([]);
    const tableData = ref<Array<IDataDict>>([]);
    const tableTotalItems = ref(0);
    const modalOperation = ref('create');
    const router = useRouter();
    const route = useRoute();

    const currentPageNo = ref<number>(1);
    const currentPageSize = ref<number>(10);

    const viewFormVisible = ref(false);
    const editFormVisible = ref(false);
    const editFormRef = ref<FormInstance>();
    const formSubmitting = ref<boolean>(false);
    const operation = ref("update");
    const collapseDetails = ref(false);

    const enabledRoles = ref<Array<IDataDict>>([]);

    DataDictService.lookup("Role", true).then(r => {
      enabledRoles.value = r.data;
    });

    const emptyModalData : IUser = {
      id: "",
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      mobileNo: "",
      enabled: true
    };
    const modalData = ref(emptyModalData);
    const tableHeader = computed<Array<Column>>(() => {
      return [
      {
        columnName: i18n.t('form.profile.username'),
        columnLabel: "username",
        sortEnabled: true,
      },
      {
        columnName: i18n.t('form.profile.email'),
        columnLabel: "email",
        sortEnabled: true,
      },
      {
        columnName: i18n.t('form.profile.mobile-no'),
        columnLabel: "mobileNo",
        sortEnabled: true,
      },
      {
        columnName: i18n.t('form.account.roles'),
        columnLabel: "roles",
        sortEnabled: false,
      },
      {
        columnName: i18n.t('form.account.joined-last-login-time'),
        columnLabel: "joinedTime",
        sortEnabled: true,
      },
      {
        columnName: i18n.t('form.global.enabled'),
        columnLabel: "enabled",
        sortEnabled: true,
      },
      {
        columnName: i18n.t('form.account.activated'),
        columnLabel: "activated",
        sortEnabled: true,
      },
      {
        columnName: i18n.t('form.global.actions'),
        columnLabel: "actions",
      },
    ]
    });

    const loadAll = () => {
      UserService.findAll().then(r => {
        initialTableData.value = r.data;
        const keyword = route.query.searchKeyword as string;
        tableData.value = keyword ? TableHelper.filter(r.data, keyword) : r.data;
        tableTotalItems.value = tableData.value.length;
      });
    };
    const updateTableData = (data: any) => {
      tableData.value = cloneDeep(data);
      tableTotalItems.value = data.length;
    };
    const deleteRecord = (id: string) => {
      if(tableData.value) {
        remove(tableData.value, (item) => item.id === id);
        tableTotalItems.value--;
      }
    };
    const disableRecord = (id: string) => {
    };
    const selectItems = (selectedItems: Array<string>) => {
      selectedIds.value = selectedItems;
    };
    const validationRules = computed<FormRules>(() => {
      return {
        username: [
          { required: true, message: i18n.t("validation.global.required"), trigger: 'change' },
        ],
        firstName: [
          { required: true, message: i18n.t("validation.global.required"), trigger: 'change' },
        ],
        lastName: [
          { required: true, message: i18n.t("validation.global.required"), trigger: 'change' },
        ],
        email: [
          { required: true, message: i18n.t("validation.global.required"), trigger: 'change' },
        ],
        mobileNo: [
          { required: true, message: i18n.t("validation.global.required"), trigger: 'change' },
        ],
        gender: [
          { required: true, message: i18n.t("validation.global.required"), trigger: 'change' },
        ],
        roles: [
          { required: true, message: i18n.t("validation.global.required"), trigger: 'change' },
        ]
      };
    });
    const changePage = (page: number, size: number) => {
      currentPageNo.value = page;
      currentPageSize.value = size;

      if(page === 1 && size === 10) {
        let newQuery = JSON.parse(JSON.stringify(route.query));
        delete newQuery.pageNo;
        delete newQuery.pageSize;
        router.replace({ query: newQuery });
      } else if(page === 1 && size != 10){
        let newQuery = JSON.parse(JSON.stringify(route.query));
        delete newQuery.pageNo;
        newQuery.pageSize = size;
        router.replace({ query: newQuery });
      } else if(page != 1 && size === 10){
        let newQuery = JSON.parse(JSON.stringify(route.query));
        delete newQuery.pageSize;
        newQuery.pageNo = page;
        router.replace({ query: newQuery });
      } else {
        router.replace({ query: { ...route.query, pageNo: page, pageSize: size }});
      }
    };
    const changeSort = (sort: Sort) => {
      const reverse: boolean = sort.order === "asc";
      if (sort.label) {
        arraySort(tableData.value, sort.label, { reverse });
      }
    };
    const clickViewUser = (row: any) => {
      // todo: get user info from api
      modalData.value = row;
      viewFormVisible.value = true;
      editFormVisible.value = false;
    };
    const clickCreateUser = () => {
      modalData.value = emptyModalData;
      operation.value = "create";
      viewFormVisible.value = false;
      editFormVisible.value = true;
      collapseDetails.value = false;
    };
    const clickUpdateUser = (row: any) => {
      // todo: get user info from api
      modalData.value = row;
      operation.value = "update";
      viewFormVisible.value = false;
      editFormVisible.value = true;
      collapseDetails.value = false;
    };
    const saveUser = (formInstance: FormInstance | undefined) => {
      if (!formInstance) {
        return;
      }
      formInstance.validate((valid, fields) => {
        if (!valid) {
          return false;
        }

        formSubmitting.value = true;
        if(operation.value === "create") {
          // todo: call api to create user
        }
        else if(operation.value === "update"){
          // todo: call api to update user
        }
        setTimeout(() => {
          formSubmitting.value = false;
          Swal.fire({
            text: i18n.t("msg.global.saved-successfully"),
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
            heightAuto: false,
          }).then(() => {
          });
        }, 1000);
      });
    };

    const currentLanguage = computed(() => {
      return i18n.locale.value;
    });

    loadAll();
    
    return {
      data,
      tableData,
      initialTableData,
      tableTotalItems,
      tableHeader,
      changeSort,
      selectItems,
      selectedIds,
      getAssetPath,
      deleteRecord,
      disableRecord,
      clickViewUser,
      clickCreateUser,
      clickUpdateUser,
      viewFormVisible,
      editFormVisible,
      collapseDetails,
      modalData,
      editFormRef,
      currentPageNo,
      currentPageSize,
      saveUser,
      validationRules,
      formSubmitting,
      operation,
      DateTimeUtils,
      updateTableData,
      currentLanguage,
      changePage,
      enabledRoles
    }
  },
});
</script>