<template>
  <el-input v-if="'String' === valueType"
    v-model="modalData.targetSpecifiedVal"
    size="small"
  />
  <el-input-number v-if="'Long' === valueType"
    class="w-100 w-md-175px"
    :precision="0"
    :min="-999999" 
    :max="999999"
    v-model="modalData.targetSpecifiedVal"
    size="small"
  />
  <el-input-number v-if="'Double' === valueType"
    class="w-100 w-md-175px"
    :precision="2"
    :min="-999999" 
    :max="999999"
    v-model="modalData.targetSpecifiedVal"
    size="small"
  />
  <el-select v-if="'Boolean' === valueType"
    v-model="modalData.targetSpecifiedVal"
    size="small"
  >
    <el-option value=true key=true />
    <el-option value=false key=false />
  </el-select>
  <!-- <el-radio-group v-model="modalData.targetSpecifiedVal" size="small" v-if="'Boolean' === valueType">
    <el-radio-button label="true" value=true>True</el-radio-button>
    <el-radio-button label="false" value=false>False</el-radio-button>
  </el-radio-group> -->
  <!-- <el-switch v-model="modalData.targetSpecifiedVal" size="default" v-if="'Boolean' === valueType" /> -->
  <el-input-number v-if="'Timestamp' === valueType"
    class="w-100 w-md-175px"
    :precision="0"
    :min="0" 
    :max="9999999999"
    v-model="modalData.targetSpecifiedVal"
    size="small"
  />

</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  name: "value-type-input",
  components: {
  },
  props: {
    valueType: { type: String, required: true },
    modalData: { type: Object, required: true },
  },
  setup(props) {
    return {
    };
  },
});
</script>
