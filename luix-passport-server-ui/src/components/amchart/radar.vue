<template>
  <!--begin::Chart container-->
  <div :id="`amchartRadar-${uniqueId}`" class="w-100 h-450px"></div>
  <!--end::Chart container-->
</template>

<script lang="ts">

import { defineComponent, computed, onMounted } from "vue";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import { useI18n } from "vue-i18n";
import * as am5 from '@amcharts/amcharts5';
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5radar from "@amcharts/amcharts5/radar";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

export default defineComponent({
  name: "amchart-radar",
  components: {
  },
  props: {
    uniqueId: { type: String, required: true },
    modalData: { type: Object, required: true },
  },
  setup(props) {
    const i18n = useI18n();
    const { t } = useI18n();

    const data = computed<Array<any>>(() => {
      return [
          {
            category: t("dropdown.severity.TestMode"),
            value: 19,
            full: 100,
            columnSettings: {
              fillOpacity: 0.8,
              fill: am5.color(getCSSVariableValue('--bs-gray-300')),
            },
          },
          {
            category: t("dropdown.severity.Info"),
            value: 9,
            full: 100,
            columnSettings: {
              fillOpacity: 0.8,
              fill: am5.color(getCSSVariableValue('--bs-success')),
            },
          },
          {
            category: t("dropdown.severity.Low"),
            value: 8,
            full: 100,
            columnSettings: {
              fillOpacity: 0.8,
              fill: am5.color(getCSSVariableValue('--bs-primary')),
            },
          },
          {
            category: t("dropdown.severity.Medium"),
            value: 29,
            full: 100,
            columnSettings: {
              fillOpacity: 0.8,
              fill: am5.color(getCSSVariableValue('--bs-warning')),
            },
          },
          {
            category: t("dropdown.severity.High"),
            value: 12,
            full: 100,
            columnSettings: {
              fillOpacity: 0.8,
              fill: am5.color(getCSSVariableValue('--bs-info')),
            },
          },
          {
            category: t("dropdown.severity.Critical"),
            value: 26,
            full: 100,
            columnSettings: {
              fillOpacity: 0.8,
              fill: am5.color(getCSSVariableValue('--bs-danger')),
            },
          },
        ]
    });


    onMounted(() => {
      var element = document.getElementById("amchartRadar-" + props.uniqueId);
      if (!element) {
          return;
      }
      am5.ready(function () {
        // Create root element
        // https://www.amcharts.com/docs/v5/getting-started/#Root_element
        var root = am5.Root.new(element as HTMLElement);

        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([am5themes_Animated.new(root)]);

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/radar-chart/
        var chart = root.container.children.push(
          am5radar.RadarChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            innerRadius: am5.percent(5),
            startAngle: -90,
            endAngle: 0,
          })
        );

        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
        var cursor = chart.set(
          "cursor",
          am5radar.RadarCursor.new(root, {
            behavior: "zoomX",
          })
        );

        cursor.lineY.set("visible", false);

        // Create axes and their renderers
        // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
        var xRenderer = am5radar.AxisRendererCircular.new(root, {
            //minGridDistance: 50
        });

        xRenderer.labels.template.setAll({
            radius: 10
        });

        xRenderer.grid.template.setAll({
            forceHidden: true,
        });

        var xAxis = chart.xAxes.push(
          am5xy.ValueAxis.new(root, {
            renderer: xRenderer,
            min: 0,
            max: 100,
            strictMinMax: true,
            numberFormat: "#'%'",
            tooltip: am5.Tooltip.new(root, {})
          })
        );

        xAxis.get("renderer").labels.template.setAll({
          fill: am5.color(getCSSVariableValue('--bs-gray-500')),
          fontWeight: "500",
          fontSize: 16,
        });

        var yRenderer = am5radar.AxisRendererRadial.new(root, {
          minGridDistance: 20,
        });

        yRenderer.labels.template.setAll({
          centerX: am5.p100,
          fontWeight: "500",
          fontSize: 18,
          fill: am5.color(getCSSVariableValue('--bs-gray-500')),
          templateField: "columnSettings",
        });

        yRenderer.grid.template.setAll({
          forceHidden: true,
        });

        var yAxis = chart.yAxes.push(
          am5xy.CategoryAxis.new(root, {
            categoryField: "category",
            renderer: yRenderer,
          })
        );

        yAxis.data.setAll(data.value);

        // Create series
        // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
        var series1 = chart.series.push(
          am5radar.RadarColumnSeries.new(root, {
            xAxis: xAxis,
            yAxis: yAxis,
            clustered: false,
            valueXField: "full",
            categoryYField: "category",
            fill: root.interfaceColors.get("alternativeBackground"),
          })
        );

        series1.columns.template.setAll({
          width: am5.p100,
          fillOpacity: 0.08,
          strokeOpacity: 0,
          cornerRadius: 20,
        });

        series1.data.setAll(data.value);

        var series2 = chart.series.push(
          am5radar.RadarColumnSeries.new(root, {
            xAxis: xAxis,
            yAxis: yAxis,
            clustered: false,
            valueXField: "value",
            categoryYField: "category",
          })
        );

        series2.columns.template.setAll({
          width: am5.p100,
          strokeOpacity: 0,
          tooltipText: "{category}: {valueX}%",
          cornerRadius: 20,
          templateField: "columnSettings",
        });

        series2.data.setAll(data.value);

        // Animate chart and series in
        // https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
        series1.appear(1000);
        series2.appear(1000);
        chart.appear(1000, 100);
      });
    });

    return {
    };
  },
});
</script>
