<template>
<!--begin::-->
<div class="card">
  <!--begin::Body-->
  <div class="card-body pt-0 px-0">
    <!--begin::Layout-->
    <div class="d-flex flex-column flex-lg-row mb-10">
      <!--begin::Search criteria-->
      <div class="flex-lg-row-auto w-100 w-lg-275px w-xxl-300px me-0 me-lg-10 mb-10">
        <!--begin::Card-->
        <div class="card bg-light">
          <!--begin::Body-->
          <div class="card-body intro-y">
              <!--begin:Search-->
              <div class="position-relative">
                <h3 class="fw-bold me-5 my-1" v-text="$t('form.security-analytics.query-criteria')"></h3>
              </div>
              <!--end:Search-->
              <!--begin::Border-->
              <div class="separator separator-dashed my-8"></div>
              <!--end::Border-->
              <!--begin::Input group-->
              <el-form-item>
                <el-select
                  v-bind:placeholder="$t('form.security-analytics.select-detector')"
                  v-model="filter.detectors"
                  multiple
                  collapse-tags
                  collapse-tags-tooltip
                  :max-collapse-tags="0"
                  :multiple-limit=2
                  filterable
                  clearable
                >
                  <el-option v-for="(item, key) in detectors" :key="key" :value="item.name" :label="item.name">{{ item.name }}</el-option>
                </el-select>
              </el-form-item>
              <!--end::Input group-->
              <!--begin::Input group-->
              <el-form-item>
                <el-select
                  v-bind:placeholder="$t('form.security-analytics.select-region')"
                  v-model="filter.regions"
                  multiple
                  collapse-tags
                  collapse-tags-tooltip
                  :max-collapse-tags="1"
                  :multiple-limit=2
                  filterable
                  clearable
                >
                  <!-- <el-option v-for="(item, key) in data.regions" :key="key" :value="item.code" :label="item.code">{{ item.code }}</el-option> -->
                </el-select>
              </el-form-item>
              <!--end::Input group-->
              <!--begin::Input group-->
              <el-form-item>
                <el-select
                  v-bind:placeholder="$t('form.security-analytics.select-asset-type')"
                  v-model="filter.assetTypes"
                  clearable
                >
                  <el-option v-for="(item, index) in getDicts('AssetType')" 
                    :key="index" 
                    :value="item.dictCode" 
                    :label="$t(`dropdown.asset-type.${item.dictCode}`)"
                  >
                    {{ $t(`dropdown.asset-type.${item.dictCode}`) }}
                  </el-option>
                </el-select>
              </el-form-item>
              <!--end::Input group-->
              <!--begin::Input group-->
              <el-form-item>
                <el-select
                  v-bind:placeholder="$t('form.security-analytics.select-asset-group')"
                  v-model="filter.assetGroups"
                  clearable
                >
                  <el-option v-for="(item, key) in data.groups" 
                    :key="key" 
                    :value="item.name" 
                    :label="item.name">
                    {{ item.name }}
                  </el-option>
                </el-select>
              </el-form-item>
              <!--end::Input group-->
              <!--begin::Input group-->
              <el-form-item>
                <el-select
                  v-bind:placeholder="$t('form.security-analytics.select-model')"
                  v-model="filter.models"
                  multiple
                  collapse-tags
                  collapse-tags-tooltip
                  :max-collapse-tags="1"
                  :multiple-limit=2
                  filterable
                  clearable
                >
                  <el-option v-for="(item, key) in data.vehicleModels" :key="key" :value="item.name" :label="item.name">{{ item.name }}</el-option>
                </el-select>
              </el-form-item>
              <!--end::Input group-->
              <!--begin::Input group-->
              <el-form-item>
                <el-input
                  type="text"
                  v-bind:placeholder="$t('form.security-analytics.input-vin')"
                  v-model="filter.vin"
                />
              </el-form-item>
              <!--end::Input group-->
              <!--begin::Input group-->
              <el-form-item>
                <el-input
                  type="text"
                  v-bind:placeholder="$t('form.security-analytics.input-alert-number')"
                  v-model="filter.alertNum"
                />
              </el-form-item>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="mt-5 row">
                <div class="col-lg-6 fv-row">
                  <label class="form-label" v-text="$t('form.alert-list.severity')"></label>
                  <div class="">
                    <div class="form-check form-check-sm py-1" v-for="(item, key) in getDicts('Severity')" >
                      <input class="form-check-input" type="checkbox" :value="item.dictCode" v-model="filter.severities"/>
                      <label class="text-gray-600">{{$t(`dropdown.severity.${item.dictCode}`)}}</label>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6 fv-row">
                  <label class="form-label" v-text="$t('form.alert-list.status')"></label>
                  <div>
                    <div class="form-check form-check-sm py-1" v-for="(item, key) in getDicts('TicketStatus')">
                      <input class="form-check-input" type="checkbox" :value="item.dictCode" v-model="filter.ticketStatuses"/>
                      <label class="text-gray-600">{{$t(`dropdown.ticket-status.${item.dictCode}`)}}</label>
                    </div>
                  </div>
                </div>
              </div>
              <!--end::Input group-->
              <!--begin::Input group-->
              <div class="mt-5">
                <!--begin::Radio group-->
                <div class="nav-group nav-group-fluid">
                  <!--begin::Option-->
                  <label>
                    <input type="radio" class="btn-check" name="type" value="has" checked />
                    <span class="btn btn-sm btn-color-muted btn-active btn-active-primary fw-bold px-4" v-text="$t('form.security-analytics.today')"></span>
                  </label>
                  <!--end::Option-->
                  <!--begin::Option-->
                  <label>
                    <input type="radio" class="btn-check" name="type" value="users" />
                    <span class="btn btn-sm btn-color-muted btn-active btn-active-primary fw-bold px-4" v-text="$t('form.security-analytics.week')"></span>
                  </label>
                  <!--end::Option-->
                  <!--begin::Option-->
                  <label>
                    <input type="radio" class="btn-check" name="type" value="orders" />
                    <span class="btn btn-sm btn-color-muted btn-active btn-active-primary fw-bold px-4" v-text="$t('form.security-analytics.month')"></span>
                  </label>
                  <!--end::Option-->
                </div>
                <!--end::Radio group-->
              </div>
              <!--end::Input group-->
              <!--begin::Action-->
              <div class="mt-5 d-flex align-items-center justify-content-center">
                <button type="button" class="btn btn-primary btn-sm w-100">
                  <span v-text="$t('form.global.search')"></span>
                </button>
              </div>
              <!--end::Action-->
            </div>
            <!--end::Body-->
        </div>
        <!--end::Card-->
      </div>
      <!--end::Search criteria-->

      <!--begin::Chart-->
      <div class="flex-lg-row-fluid pt-10 px-3 intro-y">
        <!--begin::Statistics-->
        <div class="d-flex flex-center">
          <!--begin::Items-->
          <div class="d-flex flex-wrap flex-center justify-content-lg-between mb-10 mx-auto w-xl-900px">
            <!--begin::Item-->
            <div class="d-flex flex-column flex-center h-100px h-lg-150px w-200px w-lg-250px m-3 bgi-no-repeat bgi-position-center bgi-size-contain" style="background-image: url('media/svg/misc/octagon.svg')">
              <!--begin::Symbol-->
              <KTIcon
                icon-name="car-2"
                icon-class="fs-3tx text-white"
              />
              <!--end::Symbol-->
              <!--begin::Info-->
              <div class="mb-0">
                <!--begin::Value-->
                <div class="fs-lg-2hx fs-2x fw-bold text-white d-flex flex-center">
                  <div class="min-w-70px" data-kt-countup="true" data-kt-countup-value="9000" data-kt-countup-suffix="+">0</div>
                </div>
                <!--end::Value-->
                <!--begin::Label-->
                <span class="d-flex flex-center text-gray-600 fw-semibold fs-8 lh-0">Vehicles</span>
                <!--end::Label-->
              </div>
              <!--end::Info-->
            </div>
            <!--end::Item-->
            <!--begin::Item-->
            <div class="d-flex flex-column flex-center h-100px h-lg-150px w-200px w-lg-250px m-3 bgi-no-repeat bgi-position-center bgi-size-contain" style="background-image: url('media/svg/misc/octagon.svg')">
              <!--begin::Symbol-->
              <KTIcon
                icon-name="flash-circle"
                icon-class="fs-3tx text-white"
              />
              <!--end::Symbol-->
              <!--begin::Info-->
              <div class="mb-0">
                <!--begin::Value-->
                <div class="fs-lg-2hx fs-2x fw-bold text-white d-flex flex-center">
                  <div class="min-w-70px" data-kt-countup="true" data-kt-countup-value="80" data-kt-countup-suffix="K+">0</div>
                </div>
                <!--end::Value-->
                <!--begin::Label-->
                <span class="d-flex flex-center text-gray-600 fw-semibold fs-8 lh-0">Risk</span>
                <!--end::Label-->
              </div>
              <!--end::Info-->
            </div>
            <!--end::Item-->
            <!--begin::Item-->
            <div class="d-flex flex-column flex-center h-100px h-lg-150px w-200px w-lg-250px m-3 bgi-no-repeat bgi-position-center bgi-size-contain" style="background-image: url('media/svg/misc/octagon.svg')">
              <!--begin::Symbol-->
              <KTIcon
                icon-name="syringe"
                icon-class="fs-3tx text-white"
              />
              <!--end::Symbol-->
              <!--begin::Info-->
              <div class="mb-0">
                <!--begin::Value-->
                <div class="fs-lg-2hx fs-2x fw-bold text-white d-flex flex-center">
                  <div class="min-w-70px" data-kt-countup="true" data-kt-countup-value="35" data-kt-countup-suffix="K+">0</div>
                </div>
                <!--end::Value-->
                <!--begin::Label-->
                <span class="d-flex flex-center text-gray-600 fw-semibold fs-8 lh-0">Solution</span>
                <!--end::Label-->
              </div>
              <!--end::Info-->
            </div>
            <!--end::Item-->
          </div>
          <!--end::Items-->
        </div>
        <!--end::Statistics-->

        <!--begin::Row-->
        <div class="row g-10">
          <!--begin::Col-->
          <div class="col-lg-12 col-xl-6 col-xxl-4 border-end border-end-dashed border-gray-300">
            <!--begin::Stats-->
            <div class="row">
              <div class="d-flex flex-column">
                <!--begin::affected vehicle stat-->
                <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                  <!--begin::Number-->
                  <div class="d-flex align-items-center">
                    <KTIcon icon-name="arrow-up" icon-class="fs-3 text-success me-2"/>
                    <div
                      class="fs-2 fw-bold"
                      data-kt-countup="true"
                      data-kt-countup-value="42210"
                      data-kt-countup-prefix="$"
                    >
                      42,210
                    </div>
                  </div>
                  <!--end::Number-->
                  <!--begin::Label-->
                  <div class="fw-semobold fs-6 text-gray-700"><strong><span v-text="$t('form.security-analytics.affected-vehicle')"></span></strong></div>
                  <!--end::Label-->
                </div>
                <!--end::affected vehicle stat-->

                <!--begin::affected model stat-->
                <div class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                  <!--begin::Number-->
                  <div class="d-flex align-items-center">
                    <KTIcon icon-name="arrow-down" icon-class="fs-3 text-danger me-2"/>
                    <div
                      class="fs-2 fw-bold"
                      data-kt-countup="true"
                      data-kt-countup-value="219"
                    >
                      219
                    </div>
                  </div>
                  <!--end::Number-->
                  <!--begin::Label-->
                  <div class="fw-semobold fs-6 text-gray-700"><strong><span v-text="$t('form.security-analytics.affected-model')"></span></strong></div>
                  <!--end::Label-->
                </div>
                <!--end::affected model stat-->
              </div>
            </div>
            <!--end::Stats-->

            <div class="row mt-10">
              <!--begin::Table widget 11-->
              <div class="card card-flush">
                <!--begin::Header-->
                <div class="">
                  <!--begin::Title-->
                  <h3 class="card-title align-items-start flex-column">
                    <span class="card-label fw-bold text-gray-800" v-text="$t('form.security-analytics.top-5-alerts')"></span>
                  </h3>
                  <!--end::Title-->
                </div>
                <!--end::Header-->
                <!--begin::Body-->
                <div class="">
                  <!--begin::Block-->
                  <div class="mt-5"></div>
                  <!--end::Block-->
                  <!--begin::Table container-->
                  <div class="table-responsive mb-2">
                    <!--begin::Table-->
                    <table class="table table-row-dashed gs-0 gy-4">
                      <!--begin::Table head-->
                      <thead>
                        <tr class="fs-7 fw-bold border-0 text-gray-400">
                          <th class="min-w-100px" v-text="$t('form.alert-list.alert-name')"></th>
                          <th class="min-w-100px" v-text="$t('form.global.occurrence')"></th>
                        </tr>
                      </thead>
                      <!--end::Table head-->
                      <!--begin::Table body-->
                      <tbody>
                        <tr>
                          <td>
                            <a href="#" class="text-gray-600 fw-bold text-hover-primary mb-1 fs-7">Engine hours reduction</a>
                          </td>
                          <td class="d-flex align-items-center border-0">
                            <span class="fw-bold text-gray-800 fs-6 me-3">263</span>
                            <div class="progress rounded-start-0">
                              <div class="progress-bar bg-danger m-0" role="progressbar" style="height: 12px;width: 78px" aria-valuenow="166" aria-valuemin="0" aria-valuemax="166px"></div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="#" class="text-gray-600 fw-bold text-hover-primary mb-1 fs-7">Remote start abnormality</a>
                          </td>
                          <td class="d-flex align-items-center border-0">
                            <span class="fw-bold text-gray-800 fs-6 me-3">238</span>
                            <div class="progress rounded-start-0">
                              <div class="progress-bar bg-danger m-0" role="progressbar" style="height: 12px;width: 71px" aria-valuenow="158" aria-valuemin="0" aria-valuemax="158px"></div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="#" class="text-gray-600 fw-bold text-hover-primary mb-1 fs-7">Odometer reduction</a>
                          </td>
                          <td class="d-flex align-items-center border-0">
                            <span class="fw-bold text-gray-800 fs-6 me-3">189</span>
                            <div class="progress rounded-start-0">
                              <div class="progress-bar bg-danger m-0" role="progressbar" style="height: 12px;width: 69px" aria-valuenow="129" aria-valuemin="0" aria-valuemax="129px"></div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="#" class="text-gray-600 fw-bold text-hover-primary mb-1 fs-7">Unknown vehicle message</a>
                          </td>
                          <td class="d-flex align-items-center border-0">
                            <span class="fw-bold text-gray-800 fs-6 me-3">158</span>
                            <div class="progress rounded-start-0">
                              <div class="progress-bar bg-danger m-0" role="progressbar" style="height: 12px;width: 52px" aria-valuenow="112" aria-valuemin="0" aria-valuemax="112px"></div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a href="#" class="text-gray-600 fw-bold text-hover-primary mb-1 fs-7">Unreasonable vehicle location change</a>
                          </td>
                          <td class="d-flex align-items-center border-0">
                            <span class="fw-bold text-gray-800 fs-6 me-3">148</span>
                            <div class="progress rounded-start-0">
                              <div class="progress-bar bg-danger m-0" role="progressbar" style="height: 12px;width: 42px" aria-valuenow="107" aria-valuemin="0" aria-valuemax="107px"></div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                      <!--end::Table body-->
                    </table>
                    <!--end::Table-->
                  </div>
                  <!--end::Table container-->
                </div>
                <!--end::Body-->
              </div>
              <!--end::Table Widget 11-->
            </div>
          </div>
          <!--end::Col-->
          <!--begin::Col-->
          <div class="col-lg-12 col-xl-6 col-xxl-4 border-end border-end-dashed border-gray-300">
            <!--begin::alerts-->
            <AmChartPie 
              unique-id="securityAnalyticsAlerts" 
              :title-btn-text="$t('form.security-analytics.risk')"
              :data="alertPerSeverityData"
              :inner-radius=50
              :legend-enabled=true
              :label-enabled=false
            />
            <!--end::alerts-->
          </div>
          <!--end::Col-->
          <!--begin::Col-->
          <div class="col-lg-12 col-xl-6 col-xxl-4">
            <!--begin::ticket-->
            <AmChartPie 
              unique-id="securityAnalyticsTicket" 
              :title-btn-text="$t('form.security-analytics.solutions')"
              title-btn-color="success"
              :data="ticketData"
              :inner-radius=50
              :legend-enabled=true
              :label-enabled=false
            />
            <!--end::ticket-->
          </div>
          <!--end::Col-->
        </div>
        <!--end::Row-->
      </div>
      <!--end::Chart-->
    </div>
    <!--end::Layout-->

  </div>
  <!--end::Body-->
</div>
<!--end::-->
</template>

<script lang="ts">
import { getAssetPath } from "@/helpers/assets";
import { defineComponent, ref, computed, onMounted, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import data, { getDicts } from "@/data/data";
import detectors from "@/data/json/detectors";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import type VueApexCharts from "vue3-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useThemeStore } from "@/stores/theme";
import AmChartPie from '@/components/amchart/pie.vue';
import { initCountUp } from "@/plugins/countup";

export default defineComponent({
  name: "security-analytics",
  components: {
    AmChartPie
  },
  setup() {
    const i18n = useI18n();
    const store = useThemeStore();
    const { t } = useI18n();

    onMounted(() => {
      initCountUp();
    });

    // todo: query alert by criteria
    const alertPerSeverityData = computed<Array<any>>(() => {
      return [
        {
          category: t("dropdown.severity.Critical"),
          value: 2322,
        },
        {
          category: t("dropdown.severity.High"),
          value: 938,
        },
        {
          category: t("dropdown.severity.Medium"),
          value: 641,
        },
        {
          category: t("dropdown.severity.Low"),
          value: 391,
        },
        {
          category: t("dropdown.severity.Info"),
          value: 1783,
        },
        {
          category: t("dropdown.severity.TestMode"),
          value: 329,
        },
      ]
    });

    // todo: query alert by criteria
    const ticketData = computed<Array<any>>(() => {
      return [
        {
          category: t("dropdown.ticket-status.New"),
          value: 2781,
        },
        {
          category: t("dropdown.ticket-status.Investigating"),
          value: 3981,
        },
        {
          category: t("dropdown.ticket-status.Confirmed"),
          value: 256,
        },
        {
          category: t("dropdown.ticket-status.Misreported"),
          value: 1872,
        },
        {
          category: t("dropdown.ticket-status.Duplicated"),
          value: 492,
        },
        {
          category: t("dropdown.ticket-status.Resolved"),
          value: 1882,
        },
        {
          category: t("dropdown.ticket-status.Failed"),
          value: 89,
        },
        {
          category: t("dropdown.ticket-status.Reopened"),
          value: 1999,
        },
      ]
    });

    const alertChartRef = ref<typeof VueApexCharts | null>(null);
    const ticketChartRef = ref<typeof VueApexCharts | null>(null);
    const alertChartHeight = "180";
    const ticketChartHeight = "180";
    const alertChartData = ref([22322, 12538, 7641, 6391, 9391, 3245]);
    const ticketChartData = ref([13177, 7982, 18298, 39891, 11895, 6891]);

    const filter = ref({
      detectors: [],
      regions: [],
      assetTypes: [],
      assetGroups: [],
      models: [],
      vin: "",
      alertNum: "",
      severities: [],
      ticketStatuses: [],
      dateRange: [],
    });

    const dangerColor = getCSSVariableValue("--bs-danger");
    const infoColor = getCSSVariableValue("--bs-info");
    const warningColor = getCSSVariableValue("--bs-warning");
    const primaryColor = getCSSVariableValue("--bs-primary");
    const successColor = getCSSVariableValue("--bs-success");
    const grayColor = getCSSVariableValue("--bs-gray-300");
    
    const alertColors = [dangerColor, infoColor, warningColor, primaryColor, successColor, grayColor];
    const alertLabels = ["Critical", "High", "Medium", "Low", "Info", "Test Mode"];

    const alertChartOptions = computed<ApexOptions>(() => {
      return PieChartOptions(i18n.t('form.alert-list.alert'), alertColors, alertLabels);
    })

    const ticketColors = [dangerColor, infoColor, warningColor, primaryColor, successColor, grayColor];

    const ticketLabels = ["Unhandled", "Investigating", "Misreported", "Duplicated", "Resolved", "Failed"];
    const ticketChartOptions = computed<ApexOptions>(() => {
      return PieChartOptions(i18n.t('form.ticket-list.ticket'), ticketColors, ticketLabels);
    })


    return {
      data,
      detectors,
      getDicts,
      getAssetPath,
      alertChartOptions,
      alertChartHeight,
      alertChartData,
      alertChartRef,
      ticketChartOptions,
      ticketChartHeight,
      ticketChartData,
      ticketChartRef,
      filter,
      alertPerSeverityData,
      ticketData
    };
  },
});


const PieChartOptions = (
  totolLabel: string,
  chartColors: Array<string> = [],
  chartLabels: Array<string> = [],
): ApexOptions => {

  const borderColor = getCSSVariableValue("--bs-gray-800");
  // todo: computed total label

  return {
    chart: {
      fontFamily: "inherit",
      type: "donut",
    },
    dataLabels: {
      enabled: false // hide data label
    },
    colors: chartColors,
    plotOptions: {
      pie: {
        donut: {
          size: "90%", // donut thickness
          labels: {
            show: true,
            total: {
              showAlways: false,
              show: true,
              label: totolLabel,
              color: "#BCC1C8"
            }
          }
        },
      }
    },
    stroke: {
      colors: [borderColor], // border color
      show: false, // show/hide border
      width: 3 // border width
    },
    legend: {
      show: false,
      position: 'bottom',
    },
    labels: chartLabels,
  };
};


</script>
