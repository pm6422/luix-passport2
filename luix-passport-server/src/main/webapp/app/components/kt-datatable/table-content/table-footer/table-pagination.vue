<template>
  <div class="col-sm-12 col-md-6 d-flex align-items-center justify-content-center justify-content-md-end">
    <div class="dataTables_paginate paging_simple_numbers">
      <ul class="pagination">
 <!-- <ul class="pagination pagination-circle"> -->
        <li
          class="paginate_button page-item"
          :class="{ disabled: isFirstPage }"
          :style="{ cursor: !isFirstPage ? 'pointer' : 'auto' }"
        >
          <a id="firstPageLink" class="page-link" @click="onClickFirstPage">
            <KTIcon icon-name="double-left" icon-class="fs-2" />
          </a>
        </li>

        <li
          class="paginate_button page-item"
          :class="{ disabled: isFirstPage }"
          :style="{ cursor: !isFirstPage ? 'pointer' : 'auto' }"
        >
          <a class="page-link" @click="onClickPreviousPage">
            <KTIcon icon-name="left" icon-class="fs-2" />
          </a>
        </li>

        <li
          v-for="(page, i) in pages"
          class="paginate_button page-item"
          :class="{
            active: isPageActive(page.name),
          }"
          :style="{ cursor: !page.isDisabled ? 'pointer' : 'auto' }"
          :key="i"
        >
          <a class="page-link" @click="onClickPage(page.name)">
            {{ page.name }}
          </a>
        </li>

        <li
          class="paginate_button page-item"
          :class="{ disabled: isLastPage }"
          :style="{ cursor: !isLastPage ? 'pointer' : 'auto' }"
        >
          <a class="paginate_button page-link" @click="onClickNextPage">
            <KTIcon icon-name="right" icon-class="fs-2" />
          </a>
        </li>

        <li
          class="paginate_button page-item"
          :class="{ disabled: isLastPage }"
          :style="{ cursor: !isLastPage ? 'pointer' : 'auto' }"
        >
          <a class="paginate_button page-link" @click="onClickLastPage">
            <KTIcon icon-name="double-right" icon-class="fs-2" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/helpers/assets";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "table-pagination",
  components: {},
  props: {
    pageNo: { type: Number, required: true },
    totalPages: { type: Number, required: true },
    maxVisibleButtons: { type: Number, required: false, default: 5 },
  },
  emits: ["onPageNoChange"],
  setup(props, { emit }) {
    const startPage = computed(() => {
      if (
        props.totalPages < props.maxVisibleButtons ||
        props.pageNo === 1 ||
        props.pageNo <= Math.floor(props.maxVisibleButtons / 2) ||
        (props.pageNo + 2 > props.totalPages &&
          props.totalPages === props.maxVisibleButtons)
      ) {
        return 1;
      }

      if (props.pageNo + 2 > props.totalPages) {
        return props.totalPages - props.maxVisibleButtons + 1;
      }

      return props.pageNo - 2;
    });

    const endPage = computed(() => {
      return Math.min(
        startPage.value + props.maxVisibleButtons - 1,
        props.totalPages
      );
    });

    const pages = computed(() => {
      const range: Array<{
        name: number;
        isDisabled: boolean;
      }> = [];

      for (let i = startPage.value; i <= endPage.value; i += 1) {
        range.push({
          name: i,
          isDisabled: i === props.pageNo,
        });
      }

      return range;
    });

    const isFirstPage = computed(() => {
      return props.pageNo === 1;
    });
    const isLastPage = computed(() => {
      return props.pageNo === props.totalPages;
    });
    const onClickFirstPage = () => {
      emit("onPageNoChange", 1);
    };
    const onClickPreviousPage = () => {
      emit("onPageNoChange", props.pageNo - 1);
    };
    const onClickPage = (page: number) => {
      emit("onPageNoChange", page);
    };
    const onClickNextPage = () => {
      emit("onPageNoChange", props.pageNo + 1);
    };
    const onClickLastPage = () => {
      emit("onPageNoChange", props.totalPages);
    };
    const isPageActive = (page: number) => {
      return props.pageNo === page;
    };

    return {
      startPage,
      endPage,
      pages,
      isFirstPage,
      isLastPage,
      onClickFirstPage,
      onClickPreviousPage,
      onClickPage,
      onClickNextPage,
      onClickLastPage,
      isPageActive,
      getAssetPath,
    };
  },
});
</script>

<style lang="scss">
.pagination .page-item .page-link i {
  font-size: 1.5rem;
}
</style>
