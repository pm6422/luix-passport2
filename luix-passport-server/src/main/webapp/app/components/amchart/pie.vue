<template>
  <div v-if="titleBtnText" class="d-flex align-items-center justify-content-center">
    <button 
      type="button" 
      class="btn btn-sm w-100 w-xl-50"
      :class="`btn-${titleBtnColor}`"
    >
      <span>{{ titleBtnText }}</span>
    </button>
  </div>
  <!--begin::Chart container-->
  <div 
    :id="`amchartPie-${uniqueId}`"
    class="w-100 h-400px mt-5"
    :class="{'h-xl-550px': legendEnabled, 'h-xl-450px': !legendEnabled}"
  ></div>
  <!--end::Chart container-->
</template>

<script lang="ts">

import { defineComponent, computed, watch, onMounted } from "vue";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import { useI18n } from "vue-i18n";
import { useThemeStore } from "@/stores/theme-store";
import * as am5 from '@amcharts/amcharts5';
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { sumBy } from "lodash";

export default defineComponent({
  name: "amchart-pie",
  components: {
  },
  props: {
    uniqueId: { type: String, required: true },
    titleBtnText: { type: String, required: false, default: "" },
    titleBtnColor: { type: String, required: false, default: "danger" },
    data: { type: Array, required: true },
    colors: { type: Array<number>, required: false, default: () => [
      0xbb3059,
      0xf2552b,
      0xdc6967,
      0x423a9e,
      0xa9d066,
      0x0f7c52,
      0x30b0e0,
      0xa1cde5
    ] },
    legendEnabled: { type: Boolean, required: false, default: false },
    labelEnabled: { type: Boolean, required: false, default: true },
    totalEnabled: { type: Boolean, required: false, default: true },
    totalText: { type: String, required: false, default: "" },
    legendValuePercentTextEnabled: { type: Boolean, required: false, default: false },
    innerRadius: { type: Number, required: false, default: 50 },
  },
  setup(props) {
    const i18n = useI18n();
    const themeStore = useThemeStore();
    var root;

    watch(
		  () => props.data,
		  () => {
        if(root) {
          // Destroy chart
          root.dispose();
          // Re-init chart
          setTimeout(() => { init() }, 100);
        }
		  }
		);

    watch(
		  () => i18n.locale.value,
		  () => {
        if(root) {
          // Destroy chart
          root.dispose();
          // Re-init chart
          setTimeout(() => { init() }, 100);
        }
		  }
		);

    watch(
		  () => themeStore.mode,
		  () => {
        if(root) {
          // Destroy chart
          root.dispose();
          // Re-init chart
          setTimeout(() => { init() }, 100);
        }
		  }
		);

    const init = () => {
      var element = document.getElementById("amchartPie-" + props.uniqueId);

		  // Create root element
      // https://www.amcharts.com/docs/v5/getting-started/#Root_element
      root = am5.Root.new(element as HTMLElement);

      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([am5themes_Animated.new(root)]);

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
      // start and end angle must be set both for chart and series
      var chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          layout: root.verticalLayout,
          innerRadius: am5.percent(props.innerRadius),
        })
      );

      // Create series
      var series = chart.series.push(
        am5percent.PieSeries.new(root, {
          name: "Series",
          valueField: "value",
          categoryField: "category",
          alignLabels: false,
          legendLabelText: "[{fill}]{category}[/]",
          legendValueText: props.legendValuePercentTextEnabled ? "[bold {fill}]{value}%[/]" : "[bold {fill}]{value}[/]"
        })
      );

      // series.get("colors").set("colors", [
      //   am5.color(getCSSVariableValue('--bs-danger')),
      //   am5.color(getCSSVariableValue('--bs-info')),
      //   am5.color(getCSSVariableValue('--bs-warning')),
      //   am5.color(getCSSVariableValue('--bs-primary')),
      //   am5.color(getCSSVariableValue('--bs-success')),
      //   am5.color(getCSSVariableValue('--bs-gray-300')),
      // ]);

      const amChartColors = new Array();
      for(var i = 0; i < props.colors.length; i++) {
        amChartColors.push(am5.color(props.colors[i]));
      }

      series.get("colors").set("colors", amChartColors);

      series.slices.template.setAll({
        stroke: am5.color(getCSSVariableValue('--bs-body-bg')),
        strokeWidth: 3,
        tooltipText: "{category}: {valuePercentTotal.formatNumber('0.00')}% ({value})"
      });

      series.labels.template.setAll({
        forceHidden: !props.labelEnabled,
        fontWeight: "400",
        fontSize: 12,
        fill: am5.color(getCSSVariableValue('--bs-gray-700')),
        textType: "circular",
        inside: false,
      });

      series.slices.template.setAll({
        cornerRadius: 8
      });

      // Set data
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
      series.data.setAll(props.data);

      // Add legend
      var legend = chart.children.push( 
        am5.Legend.new(root, {
          forceHidden: !props.legendEnabled,
          centerX: am5.percent(50),
          x: am5.percent(56),
          layout: root.gridLayout,
        })
      );

      legend.markerRectangles.template.setAll({
        cornerRadiusTL: 10,
        cornerRadiusTR: 10,
        cornerRadiusBL: 10,
        cornerRadiusBR: 10
      });
      legend.data.setAll(series.dataItems);

      const valueSum = sumBy(props.data, 'value');

      // Add label
      series.children.push(am5.Label.new(root, {
        // text: "${valueSum}",
        text: props.totalEnabled ? valueSum : props.totalText,
        fill: am5.color(getCSSVariableValue('--bs-gray-700')),
        fontSize: 20,
        fontWeight: 400,
        centerX: am5.percent(50),
        centerY: am5.percent(50),
        populateText: true
      }));
      // root.tooltipContainer.children.push(am5.Label.new(root, {
      //   forceHidden: false,
      //   x: am5.p50,
      //   y: am5.percent(50),
      //   centerX: am5.p50,
      //   centerY: am5.percent(50),
      //   fill: am5.color(getCSSVariableValue('--bs-gray-700')),
      //   fontWeight: "400",
      //   fontSize: 15,
      //   text: "${valueSum}"
      // }));

      series.appear(1000, 100);
		};

    onMounted(() => {
      am5.ready(function () {
        init();
      });
    });

    return {
    };
  },
});
</script>
