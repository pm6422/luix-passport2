<template>
  <!--begin::Chart container-->
  <div 
    :id="`amchartBar-${uniqueId}`"
    class="w-100 h-400px"
  ></div>
  <!--end::Chart container-->
  <div v-if="tip" class="text-gray-600 mt-5 fw-semibold fs-6 text-center">{{tip}}</div>
</template>

<script lang="ts">

import { defineComponent, watch, onMounted } from "vue";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import { useI18n } from "vue-i18n";
import { useThemeStore } from "@/stores/theme";
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { lt } from "lodash";

export default defineComponent({
  name: "amchart-bar",
  components: {
  },
  props: {
    uniqueId: { type: String, required: true },
    data: { type: Array, required: true },
    errorThreshold: { type: Number, required: false, default: 0.01 },
    tip: { type: String, required: false, default: "" },
  },
  setup(props) {
    const i18n = useI18n();
    const themeStore = useThemeStore();
    var root;

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

    const init = () => {
      var element = document.getElementById("amchartBar-" + props.uniqueId);

		  // Create root element
      // https://www.amcharts.com/docs/v5/getting-started/#Root_element
      root = am5.Root.new(element as HTMLElement);

      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([am5themes_Animated.new(root)]);

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      let chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none"
      }));

      // We don't want zoom-out button to appear while animating, so we hide it
      chart.zoomOutButton.set("forceHidden", true);

      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      let yRenderer = am5xy.AxisRendererY.new(root, {
        minGridDistance: 30,
      });

      yRenderer.grid.template.setAll({
        location: 1,
        visible: false
      })

      yRenderer.labels.template.setAll({
        fill: am5.color(getCSSVariableValue('--bs-gray-700')),
        fontWeight: "400",
        fontSize: 12,
      });

      let xRenderer = am5xy.AxisRendererX.new(root, {
        strokeOpacity: 0.1
      });

      xRenderer.grid.template.setAll({
        stroke: am5.color(getCSSVariableValue('--bs-gray-700')),
        // strokeWidth: 2,
      });

      xRenderer.labels.template.setAll({
        fill: am5.color(getCSSVariableValue('--bs-gray-700')),
        fontWeight: "400",
        fontSize: 12,
      });

      let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
        maxDeviation: 0,
        categoryField: "signalValue",
        renderer: yRenderer,
        tooltip: am5.Tooltip.new(root, { themeTags: ["axis"] }),
      }));

      let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 0,
        max: 100,
        numberFormat: "#'%'",
        // extraMax: 0.1,
        renderer: xRenderer
      }));

      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      let series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueXField: "percentage",
        categoryYField: "signalValue",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "left",
          labelText: "{valueX}"
        })
      }));

      // Rounded corners for columns
      series.columns.template.setAll({
        cornerRadiusTR: 30,
        cornerRadiusBR: 30,
        strokeOpacity: 0
      });

      // Make each column to be of a different color
      series.columns.template.adapters.add("fill", function (fill, target) {
        if (lt(target.dataItem.get("valueX") , props.errorThreshold )) {
          return am5.color(getCSSVariableValue('--bs-danger'));
        }
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      });

      series.columns.template.adapters.add("stroke", function(stroke, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      });

      // Add Label bullet
      // series.bullets.push(function () {
      //   return am5.Bullet.new(root, {
      //     locationX: 1,
      //     sprite: am5.Label.new(root, {
      //       text: "{valueXWorking.formatNumber('#.')}",
      //       fill: root.interfaceColors.get("alternativeText"),
      //       centerY: am5.p50,
      //       centerX: am5.p100,
      //       populateText: true
      //     })
      //   });
      // });

      yAxis.data.setAll(props.data);
      series.data.setAll(props.data);

      chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "none",
        xAxis: xAxis,
        yAxis: yAxis,
      }));
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
