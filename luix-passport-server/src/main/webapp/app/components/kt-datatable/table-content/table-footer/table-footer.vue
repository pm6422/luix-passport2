<template>
  <div class="row mt-2">
    <TablePageSizeDropdown
      :pageSizeDropdownEnabled=pageSizeDropdownEnabled
      :pageNo=pageNo
      :totalItems=totalItems
      v-model:pageSize="pageSize"
    />
    <TablePagination
      v-if="totalPages > 1"
      :pageNo=pageNo
      :totalPages=totalPages
      @onPageNoChange="changePageNo"
    />
  </div>
</template>

<script lang="ts">
import TablePageSizeDropdown from "./table-page-size-dropdown.vue";
import TablePagination from "./table-pagination.vue";
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  watch,
  type WritableComputedRef,
} from "vue";

export default defineComponent({
  name: "table-footer",
  components: {
    TablePageSizeDropdown,
    TablePagination
  },
  props: {
    pageSizeDropdownEnabled: { type: Boolean, required: false, default: true },
    totalItems: { type: Number, required: false, default: 5 },
    pageSize: { type: Number, default: 5 },
    pageNo: { type: Number, required: false, default: 1 },
  },
  emits: [
    "update:pageSize", 
    "onPageNoChange"
  ],
  setup(props, { emit }) {
    const pageNo = ref(props.pageNo);
    const inputPageSize = ref(props.pageSize);
  
    watch(
      () => props.totalItems,
      () => {
        // fixed bug: after deletion, pageNo reset to 1
        // pageNo.value = 1;
      }
    );

    watch(
      () => inputPageSize.value,
      () => {
        pageNo.value = 1;
      }
    );

    onMounted(() => {
      inputPageSize.value = props.pageSize;
    });

    const changePageNo = (newPageNo: number) => {
      pageNo.value = newPageNo;
      emit("onPageNoChange", newPageNo);
    };

    const pageSize: WritableComputedRef<number> = computed({
      get(): number {
        return props.pageSize;
      },
      set(value: number): void {
        inputPageSize.value = value;
        emit("update:pageSize", value);
      },
    });

    const totalPages = computed(() => {
      return Math.ceil(props.totalItems / pageSize.value);
    });

    return {
      changePageNo,
      totalPages,
      pageNo,
      pageSize,
      inputPageSize,
    };
  },
});
</script>
