<template>
  <div class="card" ref="menuRef">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">{{$t('form.threat-simulator.scenario')}}</span>
        <span class="text-muted mt-1 fw-semobold fs-7">{{$t('form.global.total')}}: {{ tableData.length }}</span>
      </h3>

      <div
        class="card-toolbar gap-3"
      >
        <input
          type="text"
          class="form-control form-control-solid w-200px"
          v-bind:placeholder="$t('form.threat-simulator.scenario-name')"
          v-model="signalNameKeyword"
          @input="search()"
        />
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <!--begin::Table container-->
      <div class="table-responsive h-400px">
        <!--begin::Table-->
        <table
          class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4"
        >
          <!--begin::Table head-->
          <thead>
            <tr class="fw-bold text-uppercase">
              <th class="min-w-150px">{{$t('form.threat-simulator.scenario-name')}}</th>
              <th class="min-w-50px">{{$t('form.alert-list.asset-type')}}</th>
              <th class="min-w-100px">{{$t('form.global.messages')}}</th>
              <th class="min-w-80px text-end">{{$t('form.global.select')}}</th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <template v-for="(row, index) in tableData" :key="index">
              <tr>
                <td>
                  <div class="d-flex flex-column">
                    <Abbreviation :text="row.name" :maxTextLength="30" class="fs-6 text-dark text-hover-primary"/>
                    <Abbreviation :text="row.desc" :maxTextLength="70" class="fs-7 text-muted"/>
                  </div>
                </td>
                <td>
                  <div class="badge badge-light">
                    {{ row.assetType }}
                  </div>
                </td>
                <td>
                  {{ random(1, 10) }}
                </td>
                <td class="text-end">
                  <button 
                    type="button" 
                    class="btn btn-icon btn-light-primary me-2"
                    data-bs-toggle="tooltip" 
                    :title="$t('form.global.select')"
                    @click="selectRow(row)"
                  >
                    <KTIcon icon-name="check" icon-class="fs-3"/>
                  </button>
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
    <!--begin::Body-->
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/helpers/assets";
import { defineComponent, ref } from "vue";
import detectors from "@/data/json/detectors";
import Abbreviation  from '@/components/utilities/abbreviation.vue'
import { isBoolean, isString, isArray, cloneDeep, toLower, random } from "lodash";

export default defineComponent({
  name: "quick-search-simulator",
  components: {
    Abbreviation
  },
  props: {
    selectedNum: { type: String, required: true },
  },
  emits: [
    "update:selectedNum",
  ],
  setup(props, { emit }) {
    const menuRef = ref<null | HTMLElement>(null);
    const signalNameKeyword = ref<string>('');
    const tableData = ref(cloneDeep(detectors));

    const searchRow = (row: any, col: string, keyword: string): boolean => {
      for (let colName in row) {
        if(colName !== col) {
          continue;
        }
        if (!Number.isInteger(row[colName]) && !isBoolean(row[colName]) && !(typeof row[colName] === "object")) {
          if(isString(row[colName]) && toLower(row[colName]).indexOf(keyword) != -1) {
            return true;
          } else if (row[colName].indexOf(keyword) != -1) {
            // field value contains keyword
            return true;
          }
        } else if (isArray(row[colName]) && isString(row[colName][0])) {
          for (let i=0; i<row[colName].length; i++) {
            if(toLower(row[colName][i]).indexOf(keyword) != -1) {
              return true;
            }
          }
        } 
      }
      return false;
    };

    const search = () => {
      tableData.value = cloneDeep(detectors);
      if (signalNameKeyword.value !== "") {
        let results: Array<any> = [];
        for (let i = 0; i < tableData.value.length; i++) {
          if (searchRow(tableData.value[i], 'name', signalNameKeyword.value)) {
            results.push(tableData.value[i]);
          }
        }
        // Copy results to props.tableData
        tableData.value = cloneDeep(results);
      }
    };

    const selectRow = (row: any) => {
      emit("update:selectedNum", row.num);
      menuRef.value?.parentElement?.classList.remove('show');
    };

    return {
      getAssetPath,
      menuRef,
      tableData,
      signalNameKeyword,
      search,
      selectRow,
      random
    };
  },
});
</script>
