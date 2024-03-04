<template>

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
import { useThemeStore } from "@/stores/theme-store";
import AmChartPie from '@/components/amchart/pie.vue';
import { initCountUp } from "@/plugins/countup";

export default defineComponent({
  name: "dashboard",
  components: {
    AmChartPie
  },
  setup() {
    const i18n = useI18n();
    const store = useThemeStore();
    const { t } = useI18n();
    return {
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
