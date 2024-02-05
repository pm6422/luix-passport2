<template>
  <OauthClientModal id="modal" :modalData="modalData" :operation="modalOperation" :afterSaveCallback="afterSavedRecord" />
  <!--begin::Card-->
  <div class="card">
    <!--begin::Card header-->
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <SearchBox :initTableData="initTableData" @onUpdateTableData="updateTableData"/>
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
          </div>
        </div>
        <div v-show="selectedIds.length > 0">
          <div class="d-flex justify-content-end align-items-center">
            <BatchDeleteButton :selectedIds="selectedIds" :deleteRecordCallback="deleteRecord"/>
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
        <template v-slot:clientId="{ row : row }">
          <div class="badge badge-light">
            {{ row.clientId }}
          </div>
        </template>
        <template v-slot:clientName="{ row: row }">
          {{ row.clientName }}
        </template>
        <template v-slot:clientAuthenticationMethods="{ row: row }">
          <OneOrMore :values="row.clientAuthenticationMethods"/>
        </template>
        <template v-slot:authorizationGrantTypes="{ row: row }">
          <OneOrMore :values="row.authorizationGrantTypes"/>
        </template>
        <template v-slot:redirectUris="{ row: row }">
          <OneOrMore :values="row.redirectUris"/>
        </template>
        <template v-slot:postLogoutRedirectUris="{ row: row }">
          <OneOrMore :values="row.postLogoutRedirectUris"/>
        </template>
        <template v-slot:scopes="{ row: row }">
          <OneOrMore :values="row.scopes"/>
        </template>
        <template v-slot:clientIdIssuedAt="{ row: row }">
          <div class="fs-7">{{ DateTimeUtils.formatDateTime(row.clientIdIssuedAt) }}</div>
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
import YesOrNo  from '@/components/utilities/yes-or-no.vue';
import OauthClientModal from "./oauth-client-modal.vue";
import { showModal } from "@/helpers/dom";
import { DateTimeUtils } from "@/helpers/DateTimeUtils";
import ConfirmDeleteButton  from '@/components/button/confirm-delete-button.vue';
import BatchDeleteButton  from '@/components/button/batch-delete-button.vue';
import Abbreviation  from '@/components/utilities/abbreviation.vue';
import SearchBox  from '@/components/search/search-box.vue';
import type { IOauthClient } from '@/domain/OauthClient';
import { cloneDeep } from "lodash";
import { OauthClientService } from '@/services/services';
import { useRouter, useRoute } from "vue-router";
import { TableHelper } from "@/helpers/TableHelper";
import OneOrMore from "@/components/utilities/one-or-more.vue";

export default defineComponent({
  name: "teams",
  components: {
    OneOrMore,
    KTDatatable,
    YesOrNo,
    OauthClientModal,
    ConfirmDeleteButton,
    BatchDeleteButton,
    SearchBox,
    Abbreviation
  },
  setup() {
    const i18n = useI18n();
    const selectedIds = ref<Array<string>>([]);
    const initTableData = ref<Array<IOauthClient>>([]);
    const tableData = ref<Array<IOauthClient>>([]);
    const tableTotalItems = ref(0);
    const modalOperation = ref('create');
    const router = useRouter();
    const route = useRoute();
    const currentPageNo = ref<number>( 1);
    const currentPageSize = ref<number>(10);

    const emptyModalData : IOauthClient = {
      id: "",
      clientId: "",
      clientName: "",
      rawClientSecret: "",
      clientAuthenticationMethods: [],
      authorizationGrantTypes: [],
      redirectUris: [""],
      postLogoutRedirectUris: [],
      scopes: [],
      clientSettings: "",
      tokenSettings: "",
      clientIdIssuedAt: "",
      clientSecretExpiresAt: "",
    };
    const modalData = ref(emptyModalData);
    const tableHeader = computed<Array<Column>>(() => {
      return [
        {
          columnName: i18n.t('form.oauth-client.client-id'),
          columnLabel: "clientId",
          sortEnabled: true,
        },
        {
          columnName: i18n.t('form.oauth-client.client-name'),
          columnLabel: "clientName",
          sortEnabled: true,
        },
        {
          columnName: i18n.t('form.oauth-client.client-authentication-methods'),
          columnLabel: "clientAuthenticationMethods",
          sortEnabled: false,
        },
        {
          columnName: i18n.t('form.oauth-client.authorization-grant-types'),
          columnLabel: "authorizationGrantTypes",
          sortEnabled: true,
        },
        {
          columnName: i18n.t('form.oauth-client.redirect-uris'),
          columnLabel: "redirectUris",
          sortEnabled: true,
        },
        {
          columnName: i18n.t('form.oauth-client.scopes'),
          columnLabel: "scopes",
          sortEnabled: true,
        },
        {
          columnName: i18n.t('form.oauth-client.client-id-issued-at'),
          columnLabel: "clientIdIssuedAt",
          sortEnabled: true,
        },
        {
          columnName: i18n.t('form.global.actions'),
          columnLabel: "actions",
        }
      ]
    });
    const loadAll = () => {
      OauthClientService.findAll().then(r => {
        initTableData.value = r.data;
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
      OauthClientService.findById(row.id).then(r => {
        modalData.value = r.data;
        modalOperation.value = editMode ? "update" : "view";
        showModal("modal");
      });
    };
    const deleteRecord = (id: string) => {
      OauthClientService.deleteById(id).then(r => {
        loadAll();
      })
    };
    const afterSavedRecord = (operation: string) => {
      loadAll();
    };

    loadAll();

    return {
      initTableData,
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
      loadAll
    };
  }
});
</script>
