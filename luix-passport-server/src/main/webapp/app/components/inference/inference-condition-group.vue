<template>
  <!--begin::logical operator-->
  <div 
    class="separator separator-dashed separator-content my-5" 
    :class="{'border-dark': themeMode === 'dark', 'border-light': themeMode === 'light'}"
    v-if="index !== 0"
  >
    <el-tooltip placement="top" v-bind:content="$t('form.trigger-list.click-to-change-logic-operator')" >
      <button
        type="button"
        class="btn min-w-90px btn-outline btn-outline-dashed btn-outline-primary "
        @click="toggleLogicalOperator(index)"
      >
        <span>{{ logicalOperators[index - 1] }}</span>
      </button>
    </el-tooltip>
  </div>
  <!--end::logical operator-->
  <!--begin::inference condition group-->
  <div class="card border border-dashed border-primary rounded mt-0 ribbon ribbon-start">
    <!--begin::delete condition group button-->
    <el-tooltip placement="top" v-bind:content="$t('form.trigger-list.del-condition-group')" >
      <button 
        type="button"
        class="btn w-10px h-10px btn-icon btn-color-danger ms-4 mt-5" 
        @click="clickDelConditionGroupCallback(index)"
      >
        <KTIcon icon-name="trash" icon-class="fs-1"/>
      </button>
    </el-tooltip>
    <!--end::delete condition group button-->
    
    <div class="d-flex flex-row mb-6">
      <!--begin::group number-->
      <div class="w-40px d-flex flex-column flex-row-auto border-end border-end-dashed">
        <!--begin::delete condition group index-->
        <div class="ribbon-label bg-primary">{{ index + 1 }}</div>
        <!--end::delete condition group index-->
      </div>
      <!--end::group number-->

      <!--begin::inference condition group-->
      <div class="d-flex flex-column flex-row-fluid px-5">
        <!--begin::Inference condition logical operator-->
        <LogicalOperatorRadio :groupData="conditionGroupData"/>
        <!--end::Inference condition logical operator-->
        
        <!--begin::Inference conditions-->
        <InferenceCondition 
          v-for="(condition, key) in conditionGroupData.inferenceConditions" 
          :asset-types="assetTypes"
          :index="key"
          :groupIndex="index"
          :conditionData="condition"
          :clickDelConditionCallback="clickDelConditionCallback"
        />
        <!--end::Inference conditions-->

        <!--begin::Add another condition button-->
        <AddAnotherConditionButton :groupIndex="index" :clickAddCallback="clickAddConditionCallback"/>
        <!--end::Add another condition button-->
      </div>
      <!--end::inference condition group-->
    </div>
  </div>
  <!--end::inference condition group-->
</template>

<script lang="ts">

import { defineComponent, computed } from "vue";
import InferenceCondition from "@/components/inference/inference-condition.vue";
import LogicalOperatorRadio from "@/components/inference/logical-operator-radio.vue";
import AddAnotherConditionButton from "@/components/inference/add-another-condition-button.vue";
import { useThemeStore } from "@/stores/theme";

export default defineComponent({
  name: "inference-condition-group",
  components: {
    InferenceCondition,
    LogicalOperatorRadio,
    AddAnotherConditionButton,
  },
  props: {
    assetTypes: { type: Array<String>, required: true },
    index: { type: Number, required: true },
    conditionGroupData: { type: Object, required: true },
    logicalOperators: { type: Array, required: true },
    clickAddConditionCallback: { type: Function, required: true },
    clickDelConditionCallback: { type: Function, required: true },
    clickDelConditionGroupCallback: { type: Function, required: true },
  },
  setup(props) {
    const themeStore = useThemeStore();

    const themeMode = computed(() => {
      return themeStore.mode;
    });

    const toggleLogicalOperator = (index: number) => {
      if('AND' === props.logicalOperators[index - 1]) {
        props.logicalOperators[index - 1] = 'OR';
      } else {
        props.logicalOperators[index - 1] = 'AND';
      }
    };
    return {
      themeMode,
      toggleLogicalOperator,
    };
  },
});
</script>
