<template>
  <InferenceConditionSignal v-if="'currentMsg' === conditionData.sourceType || 'currentState' === conditionData.sourceType || 'prevState' === conditionData.sourceType"
    :assetTypes="assetTypes"
    :groupIndex="groupIndex"
    :index="index"
    :conditionData="conditionData"
    :clickDelConditionCallback="clickDelConditionCallback"
  />
  <InferenceConditionEvent v-if="'event' === conditionData.sourceType"
    :assetTypes="assetTypes"
    :groupIndex="groupIndex"
    :index="index"
    :conditionData="conditionData"
    :clickDelConditionCallback="clickDelConditionCallback"
  />
  <InferenceConditionAnomaly v-if="'anomaly' === conditionData.sourceType"
    :assetTypes="assetTypes"
    :groupIndex="groupIndex"
    :index="index"
    :conditionData="conditionData"
    :clickDelConditionCallback="clickDelConditionCallback"
  />
  
</template>

<script lang="ts">

import { defineComponent } from "vue";
import InferenceConditionSignal from "@/components/inference/inference-condition-signal.vue";
import InferenceConditionEvent from "@/components/inference/inference-condition-event.vue";
import InferenceConditionAnomaly from "@/components/inference/inference-condition-anomaly.vue";

export default defineComponent({
  name: "inference-condition",
  components: {
    InferenceConditionSignal,
    InferenceConditionEvent,
    InferenceConditionAnomaly
  },
  props: {
    assetTypes: { type: Array<String>, required: true },
    groupIndex: { type: Number, required: true },
    index: { type: Number, required: true },
    conditionData: { type: Object, required: true },
    clickDelConditionCallback: { type: Function, required: true },
  },
  setup(props) {
   
    return {
    };
  },
});
</script>

