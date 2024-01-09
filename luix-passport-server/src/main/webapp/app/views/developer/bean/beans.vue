<template>
    <div class="card">
    <!--begin::Header-->
    <div class="card-header border-1 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-2 mb-1">Spring Beans</span>
      </h3>
      <div class="card-toolbar gap-3">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <KTIcon
            icon-name="magnifier"
            icon-class="fs-1 position-absolute ms-6"
          />
          <input
            type="text"
            class="form-control form-control-solid w-250px ps-15"
            v-model="searchKeyword"
            placeholder="Filter by keyword"
            @input="search()"
          />
        </div>
        <!--end::Search-->
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body">
      <!--begin::Table container-->
      <div class="table-responsive py-5 px-6">
        <!--begin::Table-->
        <table class="table table-striped table-row-dashed table-row-gray-300 align-middle">
          <!--begin::Table head-->
          <thead>
            <tr class="fw-bold text-uppercase row">
              <th class="col-md-4" :class="`${columnLabelAndOrder.label === 'bean' ? `table-sort-${columnLabelAndOrder.order}` : ''}`" @click="changeSort('bean')">Bean</th>
              <th class="col-md-4" :class="`${columnLabelAndOrder.label === 'type' ? `table-sort-${columnLabelAndOrder.order}` : ''}`" @click="changeSort('type')">Type</th>
              <th class="col-md-1" :class="`${columnLabelAndOrder.label === 'scope' ? `table-sort-${columnLabelAndOrder.order}` : ''}`" @click="changeSort('scope')">Scope</th>
              <th class="col-md-3">Dependencies</th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <template v-for="(row, index) in items" :key="index">
              <tr class="row text-gray-800">
                <td class="col-md-4">
                  <span class="fs-7">
                    {{ row.bean }}
                  </span>
                </td>
                <td class="col-md-4">
                  <span class="fs-7">
                    {{ row.type }}
                  </span>
                </td>
                <td class="col-md-1">
                  <span class="fs-7">
                    {{ row.scope }}
                  </span>
                </td>
                <td class="col-md-3">
                  <div class="row" v-for="(dependency, index) in row.dependencies" :key="index">
                    <div class="col-md-12">
                      <span class="fs-8 badge-light-warning px-1">{{ dependency }}</span>
                    </div>
                    <div class="separator separator-dashed mt-3 mb-3" v-if="index < row.dependencies.length -1"></div>
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
    <!--begin::Body-->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ManagementService } from '@/services/services';
import { forEach } from "lodash";
import { TableHelper } from "@/helpers/TableHelper";
import arraySort from "array-sort";
import type { Sort } from "@/components/kt-datatable/domain/Sort";

export default defineComponent({
  name: "beans",
  components: {
  },
  setup() {
    const searchKeyword = ref("");
    const items = ref<any>([]);
    const initItems = ref<any>([]);
    const columnLabelAndOrder = ref<Sort>({
      label: "",
      order: "desc",
    });


    const loadAll = () => {
      ManagementService.getBeans()
      .then(res => {
        forEach(res.data['contexts']['tsap-api']['beans'], function (val, key) {
          items.value.push({bean: key, type: val.type, scope: val.scope, dependencies: val.dependencies});
        });
        initItems.value = items.value;
      })
      .catch(error => {

      });
    };

    const search = () => {
      if (searchKeyword.value !== "") {
        items.value = TableHelper.filter(initItems.value, searchKeyword.value);
      } else {
        items.value = initItems.value;
      }
    }

    const changeSort = (label: string) => {
      if (columnLabelAndOrder.value.label === label) {
        if (columnLabelAndOrder.value.order === "asc") {
          columnLabelAndOrder.value.order = "desc";
        } else {
          if (columnLabelAndOrder.value.order === "desc") {
            columnLabelAndOrder.value.order = "asc";
          }
        }
      } else {
        columnLabelAndOrder.value.order = "asc";
        columnLabelAndOrder.value.label = label;
      }
      const reverse: boolean = columnLabelAndOrder.value.order === "desc";
      if (label) {
        arraySort(items.value, label, { reverse });
      }
    };

    loadAll();

    return {
      items,
      searchKeyword,
      search,
      changeSort,
      columnLabelAndOrder
    };
  },
});
</script>
