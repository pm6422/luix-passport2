<template>
  <div class="col-sm-12 col-md-6 d-flex align-items-center justify-content-center justify-content-md-start">
    <label for="tablePageSizeDropdown">
      <select
        v-if="pageSizeDropdownEnabled"
        id="tablePageSizeDropdown"
        name="tablePageSizeDropdown"
        class="form-select form-select-sm form-select-solid"
        v-model="pageSize"
      >
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="25">25</option>
        <option :value="50">50</option>
      </select>
    </label>
    <span class="px-5 text-gray-700" v-if="totalItems > 0 && endIndexOfPage >= startIndexOfPage">{{$t('msg.global.table-record-show', {start: startIndexOfPage, end: endIndexOfPage, total: totalItems})}}</span>
    <span class="px-5 text-gray-700" v-else>{{$t('msg.global.table-total-show', {total: totalItems})}}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type WritableComputedRef } from "vue";

export default defineComponent({
  name: "table-page-size-dropdown",
  components: {},
  props: {
    pageSizeDropdownEnabled: { type: Boolean, required: false, default: true },
    pageNo: { type: Number, required: true },
    totalItems: { type: Number, required: true },
    pageSize: { type: Number, required: false, default: 10 },
  },
  emits: ["update:pageSize"],
  setup(props, { emit }) {

    const pageSize: WritableComputedRef<number> = computed({
      get(): number {
        return props.pageSize;
      },
      set(value: number): void {
        emit("update:pageSize", value);
      },
    });

    const startIndexOfPage = computed(() => {
      return (props.pageNo - 1) * props.pageSize + 1;
    });

    const endIndexOfPage = computed(() => {
      return Math.min(props.pageNo * props.pageSize, props.totalItems);
    });

    return {
      pageSize,
      startIndexOfPage,
      endIndexOfPage
    };
  },
});
</script>
