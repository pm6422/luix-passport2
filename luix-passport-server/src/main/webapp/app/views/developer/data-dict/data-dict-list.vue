<template>
  <DictModal id="modal" :modalData="modalData" :operation="modalOperation" :afterSaveCallback="afterSavedRecord" />
  <UploadModal id="uploadModal" uploadUrl="api/data-dicts/import" downloadUrl="api/data-dicts/import-template" :afterUploadCallback="afterUploadCallback" :maxFileSize="1" :acceptFiles="['json', 'txt']" />
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
      <!--end::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <div v-show="selectedIds.length === 0">
          <div class="d-flex justify-content-end" data-kt-subscription-table-toolbar="base">
            <button 
              class="btn btn-icon btn-light-info" 
              @click="openModal()"
              data-bs-toggle="tooltip" 
              :title="$t('form.global.create')"
            >
              <KTIcon icon-name="plus" icon-class="fs-3"/>
            </button>
            <button 
              class="btn btn-icon btn-light-warning ms-1" 
              @click="loadAll()"
              data-bs-toggle="tooltip" 
              :title="$t('form.global.refresh')"
            >
              <KTIcon icon-name="arrows-circle" icon-class="fs-3"/>
            </button>
            <div>
              <button class="btn btn-icon btn-bg-light btn-active-color-primary ms-1" 
                data-kt-menu-trigger="click" 
                data-kt-menu-placement="bottom-end" 
                data-kt-menu-overflow="true"
              >
                <i class="bi bi-three-dots fs-3"></i>
              </button>
              <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-175px" data-kt-menu="true">
                <div class="menu-item px-3">
                  <a class="menu-link px-3 text-gray-800" @click="openUploadModal()"><KTIcon icon-name="file-up" icon-class="text-primary fs-2 fs-md-1 px-2 me-2" /><span v-text="$t('form.global.upload')"></span></a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="selectedIds.length > 0">
          <div class="d-flex justify-content-end align-items-center">
            <BatchDeleteButton :selectedIds="selectedIds" :deleteRecordCallback="deleteRecord"/>
            <!--begin::batch edit-->
            <button
              type="button"
              class="btn btn-primary ms-2"
              data-kt-menu-trigger="click" 
              data-kt-menu-placement="bottom-end"
            >
              {{ $t('form.global.batch-edit') }}
            </button>
            <!--begin::Menu-->
            <div class="menu menu-sub menu-sub-dropdown w-250px w-md-300px" data-kt-menu="true">
              <!--begin::Header-->
              <div class="px-7 py-5">
                <div class="fs-5 text-dark fw-bold">{{ $t('form.global.replace') }}</div>
              </div>
              <!--end::Header-->
              <!--begin::Menu separator-->
              <div class="separator border-gray-200"></div>
              <!--end::Menu separator-->
              <!--begin::Form-->
              <div class="px-7 py-5">
                <!--begin::Input group-->
                <div class="mb-10">
                  <!--begin::Label-->
                  <label class="form-label fw-semibold">{{ $t('form.data-dict-list.target-category-code') }}</label>
                  <!--end::Label-->
                  <!--begin::Input-->
                  <div>
                    <el-input
                      name="categoryCode"
                      v-model="targetCategoryCode"
                    ></el-input>
                  </div>
                  <!--end::Input-->
                </div>
                <!--end::Input group-->
                <!--begin::Actions-->
                <div class="d-flex justify-content-end">
                  <button type="submit" class="btn btn-sm btn-primary" :class="{'disabled': !targetCategoryCode }" data-kt-menu-dismiss="true" @click="batchUpdate()">{{ $t('form.global.apply') }}</button>
                </div>
                <!--end::Actions-->
              </div>
              <!--end::Form-->
            </div>
            <!--end::Menu-->
            <!--end::batch edit-->
          </div>
        </div>
      </div>
      <!--end::Card toolbar-->
    </div>
    <!--end::Card header-->
    <!--begin::Card body-->
    <div class="card-body pt-6">
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
        <template v-slot:id="{ row: row }">
          <div class="badge badge-light">
            {{ row.id }}
          </div>
        </template>
        <template v-slot:categoryCode="{ row: row }">
          {{ row.categoryCode }}
        </template>
        <template v-slot:dictCode="{ row: row }">
          {{ row.dictCode }}
        </template>
        <template v-slot:dictName="{ row: row }">
          <Abbreviation :text="row.dictName" :maxTextLength="30"/>
        </template>
        <template v-slot:desc="{ row: row }">
          <span class="fs-8">{{ row.desc }}</span>
        </template>
        <template v-slot:modifiedTime="{ row: row }">
          <div class="fs-7">{{ DateTimeUtils.formatDateTime(row.createdTime) }}</div>
          <div class="fs-7">{{ DateTimeUtils.formatDateTime(row.modifiedTime) }}</div>
        </template>
        <template v-slot:enabled="{ row: row }">
          <YesOrNo :val="row.enabled"/>
        </template>
        <template v-slot:actions="{ row: row }">
          <div class="d-flex justify-content-end">
            <a class="btn btn-sm btn-icon btn-bg-light btn-light-primary me-1" 
              @click="openModal(row, true)" 
              data-bs-toggle="tooltip" 
              :title="$t('form.global.update')"
            >
              <KTIcon icon-name="pencil" icon-class="fs-3"/>
            </a>
            <ConfirmDeleteButton :record="row" :delete-callback="deleteRecord"/>
          </div>
        </template>
      </KTDatatable>
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { getAssetPath } from "@/helpers/assets";
import { defineComponent, ref, computed } from "vue";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import type { Sort } from "@/components/kt-datatable/domain/Sort";
import type { Column } from "@/components/kt-datatable/domain/Column";
import arraySort from "array-sort";
import { useI18n } from "vue-i18n";
import YesOrNo  from '@/components/utilities/yes-or-no.vue'
import DictModal from "./data-dict-modal.vue";
import { showModal } from "@/helpers/dom";
import { DateTimeUtils } from "@/helpers/DateTimeUtils";
import ConfirmDeleteButton  from '@/components/button/confirm-delete-button.vue';
import BatchDeleteButton  from '@/components/button/batch-delete-button.vue';
import Abbreviation  from '@/components/utilities/abbreviation.vue';
import UploadModal  from '@/components/upload/upload-modal.vue';
import SearchBox  from '@/components/search/search-box.vue';
import type { IDataDict } from '@/domain/DataDict';
import { cloneDeep } from "lodash";
import { DataDictService } from '@/services/services';
import { useRouter, useRoute } from "vue-router";
import { TableHelper } from "@/helpers/TableHelper";
import { StringUtils } from "@/helpers/StringUtils";
import Swal from "sweetalert2/dist/sweetalert2.js";

export default defineComponent({
  name: "data-dict-list",
  components: {
    KTDatatable,
    YesOrNo,
    DictModal,
    ConfirmDeleteButton,
    BatchDeleteButton,
    SearchBox,
    Abbreviation,
    UploadModal
  },
  props: {
    urlQueryEnabled: { type: Boolean, required: false, default: true },
  },
  setup(props) {
    const i18n = useI18n();
    const selectedIds = ref<Array<string>>([]);
    const initialTableData = ref<Array<IDataDict>>([]);
    const tableData = ref<Array<IDataDict>>([]);
    const tableTotalItems = ref(0);
    const modalOperation = ref('create');
    const router = useRouter();
    const route = useRoute();
    const currentPageNo = ref<number>(props.urlQueryEnabled ? StringUtils.toNumber(route.query.pageNo, 1) : 1);
    const currentPageSize = ref<number>(props.urlQueryEnabled ? StringUtils.toNumber(route.query.pageSize, 10) : 10);
    const targetCategoryCode = ref<string>("");

    const emptyModalData : IDataDict = { 
      id: "",
      num: "",
      categoryCode: "",
      dictCode: "",
      dictName: "",
      desc: "",
      enabled: true,
      updatedTime: ""
    };
    const modalData = ref(emptyModalData);
    const tableHeader = computed<Array<Column>>(() => {
      return [
      {
        columnName: i18n.t('form.global.id'),
        columnLabel: "id",
        sortEnabled: true,
      },
      {
        columnName: i18n.t('form.data-dict-list.category-code'),
        columnLabel: "categoryCode",
        sortEnabled: true,
      },
      {
        columnName: i18n.t('form.data-dict-list.dict-code'),
        columnLabel: "dictCode",
        sortEnabled: true,
      },
      {
        columnName: i18n.t('form.data-dict-list.dict-name'),
        columnLabel: "dictName",
        sortEnabled: true,
      },
      {
        columnName: i18n.t('form.global.description'),
        columnLabel: "desc",
        sortEnabled: false,
      },
      {
        columnName: i18n.t('form.global.enabled'),
        columnLabel: "enabled",
        sortEnabled: true,
      },
      {
        columnName: i18n.t('form.global.created-modified-time'),
        columnLabel: "modifiedTime",
        sortEnabled: true,
      },
      {
        columnName: i18n.t('form.global.actions'),
        columnLabel: "actions",
      }
    ]
    });
    const loadAll = () => {
      DataDictService.findAll().then(r => {
        initialTableData.value = r.data;
        const keyword = route.query.searchKeyword as string;
        tableData.value = keyword ? TableHelper.filter(r.data, keyword) : r.data;
        tableTotalItems.value = tableData.value.length;
      });
    };
    const updateTableData = (data: Array<any>) => {
      tableData.value = cloneDeep(data);
      tableTotalItems.value = data.length;
    };
    const selectItems = (selectedItems: Array<string>) => {
      selectedIds.value = selectedItems;
    };
    const changePage = (page: number, size: number) => {
      currentPageNo.value = page;
      currentPageSize.value = size;

      if(!props.urlQueryEnabled) {
        return;
      }
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
    const openModal = (row: any = null, editMode: boolean | null = null) => {
      if(!row && !editMode) {
        modalData.value = emptyModalData;
        modalOperation.value = "create";
        showModal("modal");
        return;
      }
      DataDictService.findById(row.id).then(r => {
        modalData.value = r.data;
        modalOperation.value = editMode ? "update" : "view";
        showModal("modal");
      });
    };
    const openUploadModal = () => {
      showModal("uploadModal");
    };
    const deleteRecord = (id: string) => {
      DataDictService.deleteById(id).then(r => {
        loadAll();
      })
    };
    const batchUpdate = () => {
      DataDictService.batchUpdate(selectedIds.value, targetCategoryCode.value).then(r => {
        Swal.fire({
          text: i18n.t("msg.global.batch-update-successfully"),
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
          heightAuto: false,
        }).then(() => {
          loadAll();
        });
      })
    };
    const afterSavedRecord = (operation: string) => {
      loadAll();
    };
    const afterUploadCallback = () => {
      loadAll();
    };

    loadAll();

    return {
      initialTableData,
      tableData,
      tableTotalItems,
      tableHeader,
      changeSort,
      selectItems,
      selectedIds,
      getAssetPath,
      deleteRecord,
      openModal,
      modalData,
      modalOperation,
      updateTableData,
      afterSavedRecord,
      currentPageNo,
      currentPageSize,
      changePage,
      DateTimeUtils,
      openUploadModal,
      targetCategoryCode,
      batchUpdate,
      afterUploadCallback,
      loadAll
    };
  }
});
</script>
