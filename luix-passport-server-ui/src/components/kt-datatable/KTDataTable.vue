<template>
  <div class="dataTables_wrapper dt-bootstrap4 no-footer intro-y">
    <TableContent
      :checkboxEnabled="checkboxEnabled"
      :checkboxColLabel="checkboxColLabel"
      :sortLabel="sortLabel"
      :sortOrder="sortOrder"
      :header="header"
      :data="dataToDisplay"
      :loading="loading"
      @onItemsSelect="selectItems"
      @onSortChange="changeSort"
    >
      <template v-for="(_, name) in $slots" v-slot:[name]="{ row: item }">
        <slot :name="name" :row="item"></slot>
      </template>
    </TableContent>
    <TableFooter
      :pageSizeDropdownEnabled="pageSizeDropdownEnabled"
      :pageNo="currentPageNo"
      v-model:pageSize="currentPageSize"
      :totalItems="totalItems"
      @onPageNoChange="changePageNo"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import TableContent from "@/components/kt-datatable/table-content/table-content.vue";
import TableFooter from "@/components/kt-datatable/table-content/table-footer/table-footer.vue";
import type { Sort } from "@/components/kt-datatable/domain/Sort";
import type { Column } from "@/components/kt-datatable/domain/Column";

export default defineComponent({
  name: "kt-datatable",
  props: {
    checkboxEnabled: { type: Boolean, required: false, default: false },
    checkboxColLabel: { type: String, required: false, default: "id" },
    sortLabel: { type: String, required: false, default: null },
    sortOrder: {
      type: String as () => "asc" | "desc",
      required: false,
      default: "asc",
    },
    header: { type: Array<Column>, required: true },
    data: { type: Array, required: true },
    totalItems: { type: Number, required: false },
    pageNo: { type: Number, required: false, default: 1 },
    pageSize: { type: Number, default: 10 },
    pageSizeDropdownEnabled: { type: Boolean, required: false, default: true },
    loading: { type: Boolean, required: false, default: false }
  },
  emits: [
    "onItemsSelect", // selectItems
    "onSortChange", // changeSort
    "onPageNoChange", // changePage
    "onPageSizeChange", // changePage
  ],
  components: {
    TableContent,
    TableFooter,
  },
  setup(props, { emit }) {
    const currentPageNo = ref<number>(props.pageNo);
    const currentPageSize = ref<number>(props.pageSize);

    watch(
      () => currentPageSize.value,
      (pageSizeValue) => {
        currentPageNo.value = 1;
        emit("onPageSizeChange", currentPageNo.value, pageSizeValue);
      }
    );
    const changePageNo = (newPageNo: number) => {
      currentPageNo.value = newPageNo;
      emit("onPageNoChange", newPageNo, currentPageSize.value);
    };
    const dataToDisplay = computed(() => {
      if (props.data) {
        if (props.data.length <= currentPageSize.value) {
          return props.data;
        } else {
          let sliceFrom = (currentPageNo.value - 1) * currentPageSize.value;
          return props.data.slice(sliceFrom, sliceFrom + currentPageSize.value);
        }
      }
      return [];
    });
    const totalItems = computed(() => {
      if (props.data) {
        if (props.data.length <= currentPageSize.value) {
          return props.totalItems;
        } else {
          return props.data.length;
        }
      }
      return 0;
    });
    const changeSort = (sort: Sort) => {
      emit("onSortChange", sort);
    };
    const selectItems = (selectedItems: any) => {
      emit("onItemsSelect", selectedItems);
    };

    return {
      changePageNo,
      dataToDisplay,
      changeSort,
      selectItems,
      currentPageNo,
      currentPageSize,
      totalItems,
    };
  },
});
</script>
