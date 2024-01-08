<template>
  <!-- <button type="button" class="btn btn-primary" @click="convert">Convert</button> -->
  <!--begin::Row-->
  <div class="row">
    <div class="col-xl-12">
      <!--begin::Card Body-->
      <div class="card-body p-5">
        <h1 class="anchor fw-bold" id="overview">Source</h1>
        <CodeHighlighter :obj=sourceJson lang="json"/>
        <!-- <VueJsoneditor v-model="sourceJson" mode="text"/> -->
      </div>
      <!--end::Card Body-->
    </div>

    <!-- <div class="col-xl-6">
      <div class="card-body p-5">
        <h1 class="anchor fw-bold" id="overview">Target</h1>
        <CodeHighlighter :obj=targetJson lang="json"/>
      </div>
    </div> -->
  </div>
  <!--end::Row-->
</template>
<script lang="ts">
import { getAssetPath } from "@/helpers/assets";
import { defineComponent, ref, computed, onMounted } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useI18n } from "vue-i18n";
import CodeHighlighter from "@/components/highlighters/CodeHighlighter.vue";
import triggers from "@/data/json/triggers";
import VueJsoneditor from 'vue3-ts-jsoneditor';
import jsonPath from 'jsonpath';
import { LocalDataLoaderService } from '@/services/services';
import { DataTransformer } from "@/helpers/DataTransformer";
import data from "@/data/data";
import fakers from "@/data/fakers";
import detectors from "@/data/json/detectors";

export default defineComponent({
  name: "json-parser",
  components: {
    CodeHighlighter,
    VueJsoneditor,
    VForm,
    ErrorMessage,
    Field,
  },
  setup() {
    const sourceJson = ref<Object>({});
    const localDataLoaderService = new LocalDataLoaderService();
    // localDataLoaderService.load('us-profile-app.json').then(jsonObj => {
    //   sourceJson.value = DataTransformer.transformSignalModel(jsonObj);
    // });
    sourceJson.value = data.dicts;

    const targetJson = ref<Object>({});

    let rules = {
      "description": "desc",    
      // "level1.level2.newField": "$.level1.level2.age",
      // "level1.level2.newField2": "newValue2" 
    };

    const jsonPathTransform = (json, rules) => {
      for (let key in rules) {
        let value;
        if (rules[key].startsWith('$')) {  
          value = jsonPath.query(json, rules[key]);  
        } else {
          value = rules[key];  
        }
        jsonPath.apply(json, key, value);  
      }
    };

    const convert = () => {
      let arrays = JSON.parse(JSON.stringify(sourceJson)); 
      for (let key in arrays) {
        jsonPathTransform(arrays[key], rules);
      }
      targetJson.value = arrays;
    };

    return {
      getAssetPath,
      sourceJson,
      targetJson,
      convert
    }
  }
});
</script>


