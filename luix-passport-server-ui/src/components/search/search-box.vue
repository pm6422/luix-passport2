<template>
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
      v-bind:placeholder="$t('form.global.keyword-filter')"
      @input="search()"
    />
  </div>
  <!--end::Search-->
</template>
  
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { isString } from "lodash";
import { TableHelper } from "@/helpers/TableHelper";

export default defineComponent({
  name: "search-box",
  components: {
  },
  props: {
    initTableData: { type: Array<Object>, required: true },
    urlQueryEnabled: { type: Boolean, required: false, default: true }
  },
  emits: [
    "onUpdateTableData",
  ],
  setup(props, { emit }) {
    const router = useRouter();
    const route = useRoute();
    const searchKeyword = ref<string>(route.query.searchKeyword as string);

    watch(
      () => searchKeyword.value,
      () => {
        if(props.urlQueryEnabled) {
          changeUrlSearchKeyword(searchKeyword.value);
        }
      }
    );

    const search = () => {
      // Copy props.initTableData to props.tableData
      emit("onUpdateTableData", props.initTableData);
      
      if (searchKeyword.value !== "") {
        let results = TableHelper.filter(props.initTableData, searchKeyword.value);
        emit("onUpdateTableData", results);
      }
    };

    const changeUrlSearchKeyword = (keyword: string) => {
      if(!keyword) {
        let newQuery = JSON.parse(JSON.stringify(route.query));
        delete newQuery.searchKeyword;
        router.replace({ query: newQuery });
      } else {
        router.replace({ query: { ...route.query, searchKeyword: keyword } })
      }
    };

    if(searchKeyword.value) {
      search();
    }

    return {
      props,
      searchKeyword,
      search
    };
  },
});
</script>