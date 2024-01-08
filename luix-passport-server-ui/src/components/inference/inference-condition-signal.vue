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
        <!--begin::signal select-->
        <div class="w-100 w-md-175px">
          <!--begin::Hint-->
          <div class="form-text mt-0 fs-9">{{ sourceSignalValType ? $t('form.trigger-list.source-signal') + ': ' +  sourceSignalValType : $t('form.trigger-list.source-signal') }}</div>
          <!--end::Hint-->
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
        <!--end::signal select-->
        <!--begin::operator select-->
        <div class="w-100 w-md-175px">
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
                v-for="(item, index) in operators" 
                :key="index"
                :value="item.dictCode" 
                :label="item.dictName">
                {{ item.dictName }}
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <!--end::operator select-->
        <!--begin::dest source select-->
        <div
          class="w-100 w-md-150px" 
          v-if="conditionData.operator != 'IsNotNull' 
          && conditionData.operator != 'IsNull'"
        >
          <!--begin::Hint-->
          <div class="form-text mt-0 fs-9" v-text="$t('form.trigger-list.target-type')"></div>
          <!--end::Hint-->
          <el-form-item
            :prop="'inferenceConditionGroup.children.' + groupIndex + '.inferenceConditions.' + index + '.targetType'"
            :rules="{
              required: true,
              message: i18n.t('validation.global.required'),
              trigger: 'change',
            }"
          >
            <el-select
              v-bind:placeholder="$t('form.trigger-list.target-type')"
              v-model="conditionData.targetType"
              clearable
              size="small"
            >
              <el-option value="currentMsg" key="currentMsg" :label="$t('dropdown.detection-source-type.currentMsg')" />
              <el-option value="currentState" key="currentState" :label="$t('dropdown.detection-source-type.currentState')" />
              <el-option value="prevState" key="prevState" :label="$t('dropdown.detection-source-type.prevState')" />
              <el-option value="specifiedValue" key="specifiedValue" :label="$t('form.trigger-list.specified-value')">
                <span>
                  <button type="button" class="btn w-10px btn-icon btn-active-color-primary me-2">
                    <KTIcon icon-name="pencil" icon-class="fs-3"/>
                  </button>
                  {{ $t('form.trigger-list.specified-value') }}
                </span>
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <!--end::dest source select-->
        <!--begin::signal select-->
        <div
          class="w-100 w-md-175px" 
          v-if="conditionData.operator != 'IsNotNull' 
          && conditionData.operator != 'IsNull'
          && conditionData.targetType != 'specifiedValue'"
        >
          <!--begin::Hint-->
          <div class="form-text mt-0 fs-9" v-text="$t('form.trigger-list.target-signal')"></div>
          <!--end::Hint-->
          <el-form-item
            :prop="'inferenceConditionGroup.children.' + groupIndex + '.inferenceConditions.' + index + '.targetSignal'"
            :rules="{
              required: true,
              message: i18n.t('validation.global.required'),
              trigger: 'change',
            }"
          >
            <el-select
              v-model="conditionData.targetSignal"
              filterable
              clearable
              size="small"
            >
              <el-option v-for="(item, key) in targetSignals" :key="key" :value="item.num" :label="item.name">{{ item.name }}</el-option>
            </el-select>
          </el-form-item>
        </div>
        <!--end::signal select-->
        <!--begin::target specified val-->
        <div 
          class="w-100 w-md-175px"
          v-if="conditionData.operator != 'IsNotNull' 
          && conditionData.operator != 'IsNull'
          && conditionData.targetType === 'specifiedValue'"
        >
          <!--begin::Hint-->
          <div class="form-text mt-0 fs-9">{{ sourceSignalValType ? $t('form.trigger-list.target-specified-value') + ': ' +  sourceSignalValType : $t('form.trigger-list.target-specified-value') }}</div>
          <!--end::Hint-->
          <el-form-item
            :prop="'inferenceConditionGroup.children.' + groupIndex + '.inferenceConditions.' + index + '.targetSpecifiedVal'"
            :rules="{
              required: true,
              message: i18n.t('validation.global.required'),
              trigger: 'change',
            }"
          >
            <ValueTypeInput :valueType="sourceSignalValType" :modalData="conditionData"/>
          </el-form-item>
        </div>
        <!--end::target specified val-->
      </div>
    </div>
  </div>
  <!--end::inference condition-->
</template>

<script lang="ts">

import { defineComponent, computed, ref, watch } from "vue";
import { Search } from '@element-plus/icons-vue'
import { useI18n } from "vue-i18n";
import ValueTypeInput from "@/components/input/value-type-input.vue";
import { find, filter, isEmpty, intersection } from "lodash";
import type { IDataDict } from '@/domain/DataDict';
import type { ISignal } from '@/domain/Signal';
import { SignalService, DataDictService } from '@/services/services';

export default defineComponent({
  name: "inference-condition-signal",
  components: {
    Search,
    ValueTypeInput
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
    const sourceSignalValType = ref("");
    const operators = ref<Array<IDataDict>>([]);
    const targetSignals = ref<Array<ISignal>>([]);  

    SignalService.findAll().then(r => {
      allSignals.value = r.data;

      initDropdowns();
    });

    const availableSignals = computed(() => {
      if(isEmpty(allSignals.value)) {
        return;
      }
      return filter(allSignals.value, function(signal) { 
        return !isEmpty(intersection(signal.assetTypes, props.assetTypes)); 
      });
    });

    watch(
      () => props.assetTypes,
      () => {
        props.conditionData.sourceSignal = "";
      }
    );

    watch(
      () => props.conditionData.sourceSignal,
      () => {
        initDropdowns();
      }
    );

    const initDropdowns = () => {
      if(isEmpty(allSignals.value)) {
        return;
      }
      const signal = find(allSignals.value, { 'num': props.conditionData.sourceSignal });
      if(!signal) {
        sourceSignalValType.value = "";
        operators.value = [];
        targetSignals.value = [];
        return;
      }

      sourceSignalValType.value = signal.valueType;

      DataDictService.lookup('Operator' + signal.valueType, true).then(r => {
        var typeSignals = r.data;
        if(typeSignals) {
          operators.value = typeSignals;
        } else {
          operators.value = [];
        }

        var sameTypeSignals = filter(allSignals.value, function(s) { 
          return s.valueType === signal.valueType && !isEmpty(intersection(s.assetTypes, props.assetTypes)); 
        });
        if(sameTypeSignals) {
          targetSignals.value = sameTypeSignals;
        } else {
          targetSignals.value = [];
        }
      });
    };

    return {
      i18n,
      availableSignals,
      Search,
      sourceSignalValType,
      operators,
      targetSignals
    };
  },
});
</script>
