<template>
  <thead>
    <tr class="text-start text-gray-800 fw-bold fs-7 text-uppercase gs-0">
      <th v-if="checkboxEnabled">
        <div
          class="form-check form-check-sm form-check-custom form-check-solid ms-2 me-3"
        >
          <input
            class="form-check-input"
            type="checkbox"
            v-model="allSelected"
            @change="selectAll()"
            data-bs-toggle="tooltip" 
            :title="$t('form.global.select-all')"
          />
        </div>
      </th>
      <template v-for="(column, i) in header" :key="i">
        <th
          :class="{
            'text-end': i === header.length - 1,
          }"
          @click="changeSort(column.columnLabel, column.sortEnabled)"
          :style="{
            minWidth: column.columnWidth ? `${column.columnWidth}px` : '0',
            width: 'auto',
            cursor: column.sortEnabled ? 'pointer' : 'auto',
          }"
        >
          {{ column.columnName }}
          <span
            v-if="columnLabelAndOrder.label === column.columnLabel && column.sortEnabled"
            v-html="showSortArrow"
          ></span>
          <!-- <el-tooltip 
            v-if="column.tooltip"
            placement="top" 
            v-bind:content="column.tooltip" 
          > 
            <i class="fas fa-exclamation-circle ms-1 fs-7" ></i>
          </el-tooltip> -->
          <i v-tooltip 
            v-if="column.tooltip"
            class="fas fa-exclamation-circle ms-1 fs-7" 
            :title="column.tooltip"
          ></i>
        </th>
      </template>
    </tr>
  </thead>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import type { Sort } from "@/components/kt-datatable/domain/Sort";
import type { Column } from "@/components/kt-datatable/domain/Column";

export default defineComponent({
  name: "table-head",
  components: {},
  props: {
    checkboxEnabled: { type: Boolean, required: false, default: false },
    allSelected: { type: Boolean, required: false, default: false },
    sortLabel: { type: String, required: false, default: null },
    sortOrder: {
      type: String as () => "asc" | "desc",
      required: false,
      default: "asc",
    },
    header: { type: Array as () => Array<Column>, required: true },
  },
  emits: [
    "onAllSelect", 
    "onSortChange"
  ],
  setup(props, { emit }) {
    const allSelected = ref<boolean>(false);
    const columnLabelAndOrder = ref<Sort>({
      label: props.sortLabel,
      order: props.sortOrder,
    });

    watch(
      () => props.allSelected,
      (currentValue) => {
        allSelected.value = currentValue;
      }
    );

    const selectAll = () => {
      emit("onAllSelect", allSelected.value);
    };

    const changeSort = (label: string, sortEnabled: boolean | undefined) => {
      if (sortEnabled) {
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
        emit("onSortChange", columnLabelAndOrder.value);
      }
    };

    const showSortArrow = computed(() => {
      return columnLabelAndOrder.value.order === "asc"
        ? "&#x2191;"
        : "&#x2193;";
    });

    return {
      selectAll,
      changeSort,
      allSelected,
      showSortArrow,
      columnLabelAndOrder,
    };
  },
});
</script>
