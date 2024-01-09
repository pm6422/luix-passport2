<template>
  <div class="table-responsive">
    <table
      :class="[loading && 'overlay overlay-block']"
      class="table align-middle table-row-dashed table-striped table-hover fs-6 gy-4 dataTable no-footer"
    >
      <TableHead
        :checkboxEnabled="checkboxEnabled"
        :allSelected="allSelected"
        :sortLabel="sortLabel"
        :sortOrder="sortOrder"
        :header="header"
        @onAllSelect="selectAll"
        @onSortChange="changeSort"
      />
      <TableBody
        v-if="data.length !== 0"
        :checkboxEnabled="checkboxEnabled"
        :checkboxColLabel="checkboxColLabel"
        :header="header"
        :data="data"
        :selectedItems="selectedItems"
        @onItemSelect="selectItems"
      >
        <template v-for="(_, name) in $slots" v-slot:[name]="{ row: item }">
          <slot :name="name" :row="item" ></slot>
        </template>
      </TableBody>
      <template v-else>
        <tr class="odd">
          <td colspan="7" class="dataTables_empty">
            {{ $t('msg.global.no-data-found') }}
          </td>
        </tr>
      </template>
      <Loading v-if="loading" />
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import TableHead from "@/components/kt-datatable/table-content/table-head.vue";
import TableBody from "@/components/kt-datatable/table-content/table-body.vue";
import Loading from "@/components/kt-datatable/table-content/loading.vue";
import type { Sort } from "@/components/kt-datatable/domain/Sort";
import type { Column } from "@/components/kt-datatable/domain/Column";

export default defineComponent({
  name: "table-content",
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
    loading: { type: Boolean, required: false, default: false },
  },
  emits: [
    "onItemsSelect",
    "onSortChange"
  ],
  components: {
    TableHead,
    TableBody,
    Loading,
  },
  setup(props, { emit }) {
    const selectedItems = ref<Array<unknown>>([]);
    const allSelectedItems = ref<Array<unknown>>([]);
    const allSelected = ref<boolean>(false);

    onMounted(() => {
      selectedItems.value = [];
      allSelectedItems.value = [];
      allSelected.value = false;
      // eslint-disable-next-line
      props.data.forEach((item: any) => {
        if (item[props.checkboxColLabel]) {
          allSelectedItems.value.push(item[props.checkboxColLabel]);
        }
      });
    });

    watch(
      () => props.data,
      () => {
        selectedItems.value = [];
        allSelectedItems.value = [];
        allSelected.value = false;
        // eslint-disable-next-line
        props.data.forEach((item: any) => {
          if (item[props.checkboxColLabel]) {
            allSelectedItems.value.push(item[props.checkboxColLabel]);
          }
        });
      }
    );

    watch(
      () => [...selectedItems.value],
      (currentValue) => {
        if (currentValue) {
          emit("onItemsSelect", currentValue);
        }
      }
    );

    // eslint-disable-next-line
    const selectAll = (checked: any) => {
      allSelected.value = checked;
      if (checked) {
        selectedItems.value = [
          ...new Set([...selectedItems.value, ...allSelectedItems.value]),
        ];
      } else {
        selectedItems.value = [];
      }
    };

    //eslint-disable-next-line
    const selectItems = (value: any) => {
      selectedItems.value = [];
      //eslint-disable-next-line
      value.forEach((item: any) => {
        if (!selectedItems.value.includes(item)) { 
          selectedItems.value.push(item);
        }
      });
    };

    const changeSort = (sort: Sort) => {
      emit("onSortChange", sort);
    };

    return {
      changeSort,
      selectAll,
      selectItems,
      selectedItems,
      allSelected,
    };
  },
});
</script>
