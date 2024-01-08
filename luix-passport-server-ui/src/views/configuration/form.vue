<template>
  <Toast :icon="toastIcon" :style="toastStyle" :title="toastTitle" :message="toastMessage"/>
  <!--begin::Filter-->
  <el-form
    ref="filterForm"
    label-width="auto"
    label-position="top"
    size="large"
  >
    <div v-if="props.showFilters" class="card px-9 pt-4 pb-4 mb-4">
      <div class="row">
        <div class="col-md-2 pt-2 pb-2">
          <label class="form-label required" v-text="$t('form.vehicle-list.model')"></label>
          <select class="form-select" :disabled="!filter.enabled">
            <option value="" selected v-text="$t('form.global.select-option')"></option>
            <option v-for="(model, key) in data.vehicleModels" :value="model.name" :key="key">{{ model.name }}</option>
          </select>
        </div>
        <div class="col-md-3 pt-2 pb-2">
          <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
            <span class="required">{{ $t('form.detector-list.detector-name') }}</span>
            <el-tooltip placement="top" v-bind:content="$t('form.profile.change-avatar')" >
              <i class="fas fa-exclamation-circle ms-1 fs-7" ></i>
            </el-tooltip>
          </label>
          <el-form-item>
            <el-select
              v-bind:placeholder="$t('form.global.keyword-filter')"
              name="detector"
              v-model="filter.detector"
              :disabled="!filter.enabled"
              filterable
              clearable
            >
              <el-option v-for="(item, key) in detectors" :key="key" :value="item.name" :label="item.name">{{ item.name }}</el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="col-md-3 pt-2 pb-2">
          <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
            <span class="required">{{ $t('form.alert-list.severity') }}</span>
            <i
              class="fas fa-exclamation-circle ms-1 fs-7"
              data-bs-toggle="tooltip"
              :title="$t('form.profile.change-avatar')"
            ></i>
          </label>
          <el-form-item>
            <el-select
              v-bind:placeholder="$t('form.global.multi-select')"
              name="severity"
              v-model="filter.severities"
              :disabled="!filter.enabled"
              multiple
              collapse-tags
              collapse-tags-tooltip
              :max-collapse-tags="2"
              :multiple-limit=3
              filterable
              clearable
              allow-create
              default-first-option
            >
              <el-option v-for="(item, index) in getDicts('Severity')" 
                :key="index" 
                :value="item.dictCode" 
                :label="$t(`dropdown.severity.${item.dictCode}`)"
              >
                {{ $t(`dropdown.severity.${item.dictCode}`) }}
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="col-md-2 pt-2 pb-2">
          <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
            <span class="required">VIN</span>
          </label>
          <el-form-item>
            <el-input
              type="text"
              placeholder="VIN"
              :disabled="!filter.enabled"
            />
          </el-form-item>
        </div>
        <div class="col-md-2 pt-2 pb-2">
          <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
            <span class="required">VIN</span>
          </label>
          <el-form-item>
            <el-input-number
              v-model="filter.number"
              :precision="2"
              :min="1" 
              :max="10"
              :disabled="!filter.enabled"
            />
          </el-form-item>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 pt-2 pb-2">
          <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
            <span class="required">{{ $t('form.account.joined-time') }}</span>
          </label>
          <el-form-item>
            <el-col :span="11">
              <el-date-picker
                type="date"
                v-model="filter.datePart"
                :disabled="!filter.enabled"
                v-bind:placeholder="$t('form.global.date')"
                :format="DateTimeUtils.getCurrentDateFormat()"
                style="width: 100%"
              />
            </el-col>
            <el-col :span="2" class="text-center">
              <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="11">
              <el-time-picker
                v-model="filter.timePart"
                :disabled="!filter.enabled"
                v-bind:placeholder="$t('form.global.time')"
                :format="DateTimeUtils.getCurrentTimeFormat()"
                style="width: 100%"
              />
            </el-col>
          </el-form-item>
        </div>
        <div class="col-md-3 pt-2 pb-2">
          <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
            <span class="required">{{ $t('form.global.date') }}</span>
          </label>
          <el-form-item>
            <el-date-picker 
              type="daterange" 
              v-model="filter.dateRange"
              :disabled="!filter.enabled"
              :format="DateTimeUtils.getCurrentDateFormat()"
              >
            </el-date-picker>
          </el-form-item>
        </div>
        <div class="col-md-3 pt-2 pb-2">
          <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
            <span class="required">{{ $t('form.alert-list.severity') }}</span>
          </label>
          <el-form-item>
            <el-cascader 
              :options="options"
              :disabled="!filter.enabled"
              v-bind:placeholder="$t('form.global.select-option')"
              style="width: 100%"
              filterable
              :show-all-levels=false
            />
          </el-form-item>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 pt-2 pb-2">
          <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
            <span class="required">{{ $t('form.alert-list.severity') }}</span>
          </label>
          <el-form-item>
            <el-checkbox-group v-model="filter.severities" :disabled="!filter.enabled">
              <el-checkbox-button v-for="(item, index) in getDicts('Severity')" 
                :key="index"
                :value="item.dictCode" 
                :label="$t(`dropdown.severity.${item.dictCode}`)"
              >
              </el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
        </div>
        <div class="col-md-3 pt-2 pb-2">
          <label class="form-label required" v-text="$t('form.profile.gender')"></label>
          <div class="form-check form-check-custom form-check-solid form-check-lg gap-5">
            <div class="d-flex align-items-center">
              <input
                name="gender"
                class="form-check-input mb-1 mb-lg-0"
                type="radio"
                value="male"
                v-model="filter.gender"
                :disabled="!filter.enabled"
              />
              <label class="form-check-label" v-text="$t('form.profile.male')"></label>
            </div>
            <div class="d-flex align-items-center">
              <input
                name="gender"
                class="form-check-input mb-1 mb-lg-0"
                type="radio"
                value="female"
                v-model="filter.gender"
                :disabled="!filter.enabled"
              />
              <label class="form-check-label" v-text="$t('form.profile.female')"></label>
            </div>
          </div>
        </div>
        <div class="col-md-3 pt-2 pb-2">
          <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
            <span class="required">{{ $t('form.profile.gender') }}</span>
          </label>
          <el-form-item>
            <el-radio-group v-model="filter.gender" :disabled="!filter.enabled">
              <el-radio-button label="male">{{ $t('form.profile.male') }}</el-radio-button>
              <el-radio-button label="female">{{ $t('form.profile.female') }}</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3 pt-2 pb-2">
          <label class="form-label required" v-text="$t('form.global.enabled')"></label>
          <div class="form-check form-check-solid form-switch">
            <input
              class="form-check-input w-50px h-30px"
              type="checkbox"
              v-model="filter.enabled"
            />
          </div>
        </div>
        <div class="col-md-3 pt-2 pb-2">
          <div class="form-check form-check-custom form-check-solid form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="filter.enabled"
            />
            <label class="form-check-label" v-text="$t('form.global.enabled')"></label>
          </div>
        </div>
        <div class="col-md-3 pt-2 pb-2">
          <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
            <span class="required">{{ $t('form.global.enabled') }}</span>
          </label>
          <el-form-item>
            <el-switch v-model="filter.enabled" />
          </el-form-item>
        </div>
        <div class="col-md-3 pt-2 pb-2">
          <el-form-item>
            <el-switch v-model="filter.enabled" v-bind:label="$t('form.global.enabled')"/>
            <label class="ms-2" v-text="$t('form.global.enabled')"></label>
          </el-form-item>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3 pt-2 pb-2">
          <label class="form-label required" v-text="$t('form.global.enabled')"></label>
          <div class="form-check form-check-custom form-check-solid form-check-lg">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="filter.enabled"
            />
          </div>
        </div>
        <div class="col-md-3 pt-2 pb-2">
          <div class="form-check form-check-custom form-check-solid form-check-lg">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="filter.enabled"
            />
            <label class="form-check-label" v-text="$t('form.global.enabled')"></label>
          </div>
        </div>
        <div class="col-md-3 pt-2 pb-2">
          <label class="d-flex align-items-center fs-6 fw-semobold mb-2">
            <span class="required">{{ $t('form.global.enabled') }}</span>
          </label>
          <el-form-item>
            <el-checkbox name="type" v-model="filter.enabled" />
          </el-form-item>
        </div>
        <div class="col-md-3 pt-2 pb-2">
          <el-form-item>
            <el-checkbox v-bind:label="$t('form.global.enabled')" v-model="filter.enabled" />
          </el-form-item>
        </div>
      </div>

      <div class="row">
        <div class="col-md-3 pt-2 pb-2">
          <label class="form-label">Quick Search</label>
          <div class="d-flex">
            <el-select
              v-bind:placeholder="$t('form.signal-list.signal')"
              name="signalName"
              v-model="filter.signalName"
              filterable
              clearable
            >
              <el-option v-for="(item, key) in signals" :key="key" :value="item.name" :label="item.name">{{ item.name }}</el-option>
            </el-select>
            <button 
              type="button" 
              class="btn w-10px btn-icon btn-color-primary ms-4"
              data-kt-menu-trigger="click" 
              data-kt-menu-placement="bottom-start"
            >
              <KTIcon icon-name="magnifier" icon-class="fs-2"/>
            </button>
            <!--begin::Menu-->
            <div 
              class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold p-0 scroll w-600px" 
              data-kt-menu="true">
              <QuickSearchSignal v-model:selectedName="filter.signalName"/>
            </div>
            <!--end::Menu-->
          </div>
        </div>
        <div class="col-md-3 pt-2 pb-2">
          <label class="form-label">Popover</label>
          <div class="d-flex">
            <el-popover placement="bottom-start" :width="600" trigger="click" :visible="popoverVisible">
              <template #reference>
                <el-input
                  v-model="filter.signalName"
                  readonly
                >
                  <template #append>
                    <el-button :icon="Search" @click="popoverVisible = !popoverVisible"/>
                  </template>
                </el-input>
              </template>
              <QuickSearchSignal v-model:selectedName="filter.signalName" v-model:popoverVisible="popoverVisible"/>
            </el-popover>
          </div>
        </div>
        <div class="col-md-3 pt-2 pb-2">
          <button type="button" class="btn btn-primary" @click="showToast">showToast</button>
        </div>
      </div>

    </div>
  </el-form>
  <!--end::Filter-->

  <div class="card p-10">
    <div class="row g-10">
      <div class="col-lg-6 border-end border-end-dashed border-gray-300">
        <AmChartPie 
          unique-id="pie2021" 
          title-btn-text="2021"
          :data="data2021"
          :legend-enabled=true
          :total-enabled=false
          :legend-value-percent-text-enabled=true
        />
      </div>
      <div class="col-lg-6 border-end border-end-dashed border-gray-300">
        <AmChartPie 
          unique-id="pie2022" 
          title-btn-text="2022"
          :data="data2022"
          :legend-enabled=true
          :total-enabled=false
          :legend-value-percent-text-enabled=true
        />
      </div>
    </div>
    <div class="row g-10 mt-10">
      <div class="">
        <AmChartPie 
          unique-id="pie-part" 
          title-btn-text="零部件"
          :data="dataParts"
          :legend-enabled=true
          :total-enabled=false
          :legend-value-percent-text-enabled=true
        />
      </div>
    </div>
    <div class="row g-10 mt-10">
      <div class="">
        <AmChartPie 
          unique-id="pie-virus" 
          title-btn-text="汽车产业相关的勒索病毒"
          :data="dataVirus"
          :legend-enabled=true
          :total-enabled=false
          :legend-value-percent-text-enabled=true
        />
      </div>
    </div>
    <div class="row g-10 mt-10">
      <div class="">
        <AmChartPie 
          unique-id="pie-loss" 
          title-btn-text="近五年汽车安全问题损失"
          :data="dataLoss"
          :legend-enabled=true
          :total-enabled=false
          total-text="5050亿美金"
          :legend-value-percent-text-enabled=true
        />
      </div>
    </div>
    <div class="row g-10 mt-10">
      <div class="">
        <AmChartPie 
          unique-id="pie-virus-2" 
          title-btn-text="汽车产业相关的勒索病毒"
          :data="dataVirus"
          :legend-enabled=true
          :total-enabled=false
          :legend-value-percent-text-enabled=true
        />
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { getAssetPath } from "@/helpers/assets";
import {defineComponent, ref, computed, onMounted } from "vue";
import KTDatatable from "@/components/kt-datatable/KTDataTable.vue";
import { useI18n } from "vue-i18n";
import data, { getDicts } from "@/data/data";
import detectors from "@/data/json/detectors";
import fakers from "@/data/fakers";
import signals from "@/data/json/us-signals";
import { DateTimeUtils } from "@/helpers/DateTimeUtils";
import Toast from "@/components/toasts/toast.vue";
import { Search } from '@element-plus/icons-vue'
import QuickSearchSignal from "@/components/quick-search/quick-search-signal.vue";
import { remove } from "lodash";
import AmChartPie from '@/components/amchart/pie.vue'

export default defineComponent({
  name: "form-demo",
  components: {
    KTDatatable,
    Toast,
    Search,
    QuickSearchSignal,
    AmChartPie
  },
  props: {
    showFilters: {
      type: Boolean,
      default: true,
    }
  },
  setup(props) {
    const i18n = useI18n();
    const selectedIds = ref<Array<string>>([]);
    const tableData = ref(fakers[0].alerts);
    // todo: get total items from api
    const tableTotalItems = ref(tableData.value.length);

    const toastIcon = ref('shield-tick');
    const toastStyle = ref('text-danger');
    const toastTitle = ref('AUTOMOTIVE CYBERSECURITY');
    const toastMessage = ref('Toast Message');
    const popoverVisible = ref(false);

    const counter = ref(1);

    const showToast= () => {
      toastIcon.value = "security-user";
      toastStyle.value = "text-warning";
      toastTitle.value = "Welcome back, Louis";
      toastMessage.value = "Last login at: 2023/18/23 18:23:45";
      setTimeout(() => {
        document.getElementById('toastTriggerBtn')?.click();
      }, 50);
    }

    const filter = ref({
      detector: "",
      dateRange: [],
      severities: [],
      enabled: true,
      gender: "male",
      datePart: '',
      timePart: '',
      number: 0,
      signalName: '',
      targetSpecifiedVal: '',
    });

    const options = [
      {
        value: 'guide',
        label: 'Guide',
        disabled: true,
        children: [
          {
            value: 'disciplines',
            label: 'Disciplines',
            children: [
              {
                value: 'consistency',
                label: 'Consistency',
              },
            ],
          },
          {
            value: 'navigation',
            label: 'Navigation',
            children: [
              {
                value: 'side nav',
                label: 'Side Navigation',
              },
              {
                value: 'top nav',
                label: 'Top Navigation',
              },
            ],
          },
        ],
      },
      {
        value: 'component',
        label: 'Component',
        children: [
          {
            value: 'basic',
            label: 'Basic',
            children: [
              {
                value: 'layout',
                label: 'Layout',
              }
            ],
          },
          {
            value: 'form',
            label: 'Form',
            children: [
              {
                value: 'radio',
                label: 'Radio',
              },
              {
                value: 'checkbox',
                label: 'Checkbox',
              },
            ],
          },
        ],
      },
      {
        value: 'resource',
        label: 'Resource',
        children: [
          {
            value: 'axure',
            label: 'Axure Components',
          }
        ],
      },
    ];

    const data2021 = computed<Array<any>>(() => {
      return [
        {
          category: '数字钥匙',
          value: 26.08,
        },
        {
          category: '远程攻击',
          value: 8.7,
        },
        {
          category: '充电桩',
          value: 21.74,
        },
        {
          category: '应用程序/API',
          value: 4.35,
        },
        {
          category: 'IVI',
          value: 13.04,
        },
        {
          category: '车辆',
          value: 8.7,
        },
        {
          category: 'RTOS',
          value: 4.35,
        },
        {
          category: '后台',
          value: 8.7,
        },
        {
          category: '其他',
          value: 4.35,
        }
      ]
    });

    const data2022 = computed<Array<any>>(() => {
      return [
        {
          category: '数字钥匙',
          value: 24,
        },
        {
          category: '远程攻击',
          value: 22,
        },
        {
          category: '充电桩',
          value: 12,
        },
        {
          category: '应用程序/API',
          value: 12,
        },
        {
          category: 'IVI',
          value: 6,
        },
        {
          category: '车辆',
          value: 6,
        },
        {
          category: 'RTOS',
          value: 6,
        },
        {
          category: 'CPU',
          value: 6,
        },
        {
          category: '后台',
          value: 2,
        },
        {
          category: 'Rootkit',
          value: 2,
        },
        {
          category: '其他',
          value: 2,
        }
      ]
    });

    const dataParts = computed<Array<any>>(() => {
      return [
        {
          category: 'TSP服务',
          value: 52.1,
        },
        {
          category: '智能座舱',
          value: 19.7,
        },
        {
          category: '充电服务',
          value: 12.7,
        },
        {
          category: '车主APP',
          value: 4.9,
        },
        {
          category: 'PEPS',
          value: 4.2,
        },
        {
          category: 'ODB',
          value: 2.5,
        },
        {
          category: 'GPS',
          value: 1.8,
        },
        {
          category: 'TBox APN 网络',
          value: 1.4,
        },
        {
          category: '安全气囊',
          value: 0.4,
        },
        {
          category: '网关CAN网络',
          value: 0.4,
        },
      ]
    });

    const dataVirus = computed<Array<any>>(() => {
      return [
        {
          category: 'BlackCat',
          value: 2.33,
        },
        {
          category: 'Black Basta',
          value: 9.3,
        },
        {
          category: 'Clop',
          value: 4.65,
        },
        {
          category: 'Conti',
          value: 32.56,
        },
        {
          category: 'Cuba',
          value: 4.65,
        },
        {
          category: 'Hive',
          value: 13.95,
        },
        {
          category: 'Lapsus$',
          value: 2.33,
        },
        {
          category: 'LockBit',
          value: 23.26,
        },
        {
          category: 'Pandora',
          value: 2.33,
        },
        {
          category: 'Snatch',
          value: 2.33,
        },
        {
          category: 'Stormous',
          value: 2.33,
        }
      ]
    });

    const dataLoss = computed<Array<any>>(() => {
      return [
        {
          category: '数据/隐私泄露',
          value: 31,
        },
        {
          category: '服务/业务中断',
          value: 23,
        },
        {
          category: '汽车/财务被窃',
          value: 22,
        },
        {
          category: '非法控制车辆',
          value: 13,
        },
        {
          category: '各位欺诈',
          value: 3,
        },
        {
          category: '系统被篡改',
          value: 3,
        },
        {
          category: '位置被追踪',
          value: 3,
        },
        {
          category: '政策违规',
          value: 1,
        },
        {
          category: '其他',
          value: 1,
        }
      ]
    });

    return {
      data,
      detectors,
      getDicts,
      tableData,
      tableTotalItems,
      selectedIds,
      getAssetPath,
      props,
      filter,
      options,
      DateTimeUtils,
      showToast,
      toastIcon,
      toastStyle,
      toastTitle,
      toastMessage,
      Search,
      fakers,
      signals,
      popoverVisible,
      data2021,
      data2022,
      dataParts,
      dataVirus,
      dataLoss
    };
  },
});
</script>
