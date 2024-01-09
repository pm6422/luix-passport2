<template>
  <!--begin::inference condition-->
  <div class="row">
    <div class="d-flex flex-column gap-3">
      <div class="form-group d-flex flex-wrap align-items-center gap-5">
        <!--begin::Delete button-->
        <el-tooltip placement="top" v-bind:content="$t('form.trigger-list.del-condition')" >
          <button type="button" class="btn w-10px btn-icon btn-color-danger" @click="clickDelConditionCallback(groupIndex, index)">
            <KTIcon icon-name="trash" icon-class="fs-4"/>
          </button>
        </el-tooltip>
        <!--end::Delete button-->
        
        <!--begin::source select-->
        <div class="w-100 w-md-150px">
          <!--begin::Hint-->
          <div class="form-text mt-0 fs-9" v-text="$t('form.trigger-list.source-type')"></div>
          <!--end::Hint-->
          <el-form-item
            :prop="'inferenceConditionGroup.children.' + groupIndex + '.inferenceConditions.' + index + '.sourceType'"
            :rules="{
              required: true,
              message: i18n.t('validation.global.required'),
              trigger: 'change',
            }"
          >
            <el-select
              v-bind:placeholder="$t('form.trigger-list.source-type')"
              v-model="conditionData.sourceType"
              clearable
              disabled
              size="small"
            >
              <el-option value="currentMsg" key="currentMsg" :label="$t('dropdown.detection-source-type.currentMsg')" selected/>
              <el-option value="currentState" key="currentState" :label="$t('dropdown.detection-source-type.currentState')" />
              <el-option value="prevState" key="prevState" :label="$t('dropdown.detection-source-type.prevState')" />
              <el-option value="event" key="event" :label="$t('dropdown.detection-source-type.event')" />
              <el-option value="anomaly" key="anomaly" :label="$t('dropdown.detection-source-type.anomaly')" />
            </el-select>
          </el-form-item>
        </div>
        <!--end::source select-->
        <!--begin::event select-->
        <div class="w-100 w-md-175px">
          <el-form-item
            :prop="'inferenceConditionGroup.children.' + groupIndex + '.inferenceConditions.' + index + '.sourceSignal'"
            :rules="{
              required: true,
              message: i18n.t('validation.global.required'),
              trigger: 'change',
            }"
          >
            <el-select
              v-model="conditionData.sourceSignal"
              filterable
              clearable
              default-first-option
              size="small"
            >
              <el-option v-for="(item, key) in availableSignals" 
                :key="key" 
                :value="item.num" 
                :label="item.name"
              >
                {{ item.name }}
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <!--end::event select-->
        <!--begin::time window-->
        <div class="w-100 w-md-175px">
          <!--begin::Hint-->
          <div class="form-text mt-0 fs-9" v-text="timeframeTitle"></div>
          <!--end::Hint-->
          <el-form-item
            :prop="'inferenceConditionGroup.children.' + groupIndex + '.inferenceConditions.' + index + '.timeframe'"
            :rules="{
              required: true,
              message: i18n.t('validation.global.required'),
              trigger: 'change',
            }"
          >
            <el-input-number
              class="w-100 w-md-175px"
              :precision="0"
              :min="1" 
              :max="maxTimeframe"
              v-model="conditionData.timeframe"
              size="small"
            />
          </el-form-item>
        </div>
        <!--end::time window-->
        <!--begin::operator select-->
        <div class="w-100 w-md-150px">
          <!--begin::Hint-->
          <div class="form-text mt-0 fs-9" v-text="$t('form.trigger-list.operator')"></div>
          <!--end::Hint-->
          <el-form-item
            :prop="'inferenceConditionGroup.children.' + groupIndex + '.inferenceConditions.' + index + '.operator'"
            :rules="{
              required: true,
              message: i18n.t('validation.global.required'),
              trigger: 'change',
            }"
          >
            <el-select
              v-bind:placeholder="$t('form.trigger-list.operator')"
              v-model="conditionData.operator"
              filterable
              clearable
              size="small"
            >
              <el-option 
                v-for="(item, index) in operatorEventLookup" 
                :key="index"
                :value="item.dictCode" 
                :label="item.dictName">
                {{ item.dictName }}
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <!--end::operator select-->
        <!--begin::signal select-->
        <div class="w-100 w-md-175px">
          <!--begin::Hint-->
          <div class="form-text mt-0 fs-9" v-text="$t('form.global.occurrences')"></div>
          <!--end::Hint-->
          <el-form-item
            :prop="'inferenceConditionGroup.children.' + groupIndex + '.inferenceConditions.' + index + '.occurrence'"
            :rules="{
              required: true,
              message: i18n.t('validation.global.required'),
              trigger: 'change',
            }"
          >
            <el-input-number
              class="w-100 w-md-175px"
              :precision="0"
              :min="1" 
              :max="999999"
              v-model="conditionData.occurrence"
              size="small"
            />
          </el-form-item>
        </div>
        <!--end::signal select-->
      </div>
    </div>
  </div>
  <!--end::inference condition-->
</template>

<script lang="ts">

import { defineComponent, computed, ref, watch } from "vue";
import type { IDataDict } from '@/domain/DataDict';
import type { ISignal } from '@/domain/Signal';
import { useI18n } from "vue-i18n";
import { filter, isEmpty, intersection } from "lodash";
import { SignalService, DataDictService } from '@/services/services';

export default defineComponent({
  name: "inference-condition-anomaly",
  components: {
  },
  props: {
    assetTypes: { type: Array<String>, required: true },
    groupIndex: { type: Number, required: true },
    index: { type: Number, required: true },
    conditionData: { type: Object, required: true },
    clickDelConditionCallback: { type: Function, required: true },
  },
  setup(props) {
    const i18n = useI18n();
    const allSignals = ref<Array<ISignal>>([]);
    const operatorEventLookup = ref<Array<IDataDict>>([]);

    SignalService.findAll().then(r => {
      allSignals.value = r.data;
    });

    DataDictService.lookup('OperatorEvent').then(r => {
      operatorEventLookup.value = r.data;
    });  

    const availableSignals = computed(() => {
      if(isEmpty(allSignals.value)) {
        return;
      }
      return filter(allSignals.value, function(signal) { 
        return !isEmpty(intersection(signal.assetTypes, props.assetTypes)) && signal.modelEnabled; 
      });
    });

    watch(
      () => props.assetTypes,
      () => {
        props.conditionData.sourceSignal = "";
      }
    );

    const timeframeTitle = ref(i18n.t('form.event-list.timeframe', {unit: 'hour'}));
    const maxTimeframe = ref(24);

    return {
      i18n,
      operatorEventLookup,
      availableSignals,
      timeframeTitle,
      maxTimeframe
    };
  },
});
</script>
