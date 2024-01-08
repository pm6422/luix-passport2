<template>
  <!--begin::Chart container-->
  <div 
    :id="`amchartBar-stacked-bar`"
    class="w-100 h-600px"
  ></div>
</template>

<script lang="ts">

import { defineComponent, watch, onMounted } from "vue";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import { useI18n } from "vue-i18n";
import { useThemeStore } from "@/stores/theme";
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

export default defineComponent({
  name: "amchart-stacked-bar",
  components: {
  },
  setup(props) {
    const i18n = useI18n();
    const themeStore = useThemeStore();
    var root;
    var data = [];

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
      var element = document.getElementById("amchartBar-stacked-bar");

		  // Create root element
      // https://www.amcharts.com/docs/v5/getting-started/#Root_element
      root = am5.Root.new(element as HTMLElement);

      var myTheme = am5.Theme.new(root);

      myTheme.rule("Grid", ["base"]).setAll({
        strokeOpacity: 0.1
      });


      // Set themes
      // https://www.amcharts.com/docs/v5/concepts/themes/
      root.setThemes([
        am5themes_Animated.new(root),
        myTheme
      ]);


      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panY",
        wheelY: "zoomY",
        layout: root.verticalLayout
      }));

      // Add scrollbar
      // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
      chart.set("scrollbarY", am5.Scrollbar.new(root, {
        orientation: "vertical"
      }));

      var data = [
        {
        "year": "2022",
        "数字钥匙": 24,
        "远程攻击": 22,
        "充电桩": 12,
        "应用程序/API": 12,
        "IVI": 6,
        "车辆": 6,
        "RTOS": 6,
        "CPU": 6,
        "后台": 2,
        "Rootkit": 2,
        "其他": 2
        },
        {
        "year": "2021",
        "数字钥匙": 26.09,
        "远程攻击": 8.7,
        "充电桩": 21.74,
        "应用程序/API": 4.35,
        "IVI": 13.04,
        "车辆": 8.7,
        "RTOS": 4.35,
        "CPU": 0,
        "后台": 8.7,
        "Rootkit": 0,
        "其他": 4.35
      }];

      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      var yRenderer = am5xy.AxisRendererY.new(root, {});
      var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "year",
        renderer: yRenderer,
        tooltip: am5.Tooltip.new(root, {})
      }));

      yRenderer.grid.template.setAll({
        location: 1
      })

      yAxis.data.setAll(data);

      var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererX.new(root, {
          strokeOpacity: 0.1
        })
      }));

      // Add legend
      // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
      var legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
      }));


      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      function makeSeries(name, fieldName) {
        var series = chart.series.push(am5xy.ColumnSeries.new(root, {
          name: name,
          stacked: true,
          xAxis: xAxis,
          yAxis: yAxis,
          baseAxis: yAxis,
          valueXField: fieldName,
          categoryYField: "year"
        }));

        series.columns.template.setAll({
          tooltipText: "{name}, {categoryY}: {valueX}",
          tooltipY: am5.percent(90)
        });
        series.data.setAll(data);

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear();

        series.bullets.push(function() {
          return am5.Bullet.new(root, {
            sprite: am5.Label.new(root, {
              text: "{valueX}%",
              fill: root.interfaceColors.get("alternativeText"),
              centerY: am5.p50,
              centerX: am5.p50,
              populateText: true
            })
          });
        });

        legend.data.push(series);
      }

      makeSeries("数字钥匙", "数字钥匙");
      makeSeries("远程攻击", "远程攻击");
      makeSeries("充电桩", "充电桩");
      makeSeries("应用程序/API", "应用程序/API");
      makeSeries("IVI", "IVI");
      makeSeries("车辆", "车辆");
      makeSeries("RTOS", "RTOS");

      makeSeries("CPU", "CPU");
      makeSeries("后台", "后台");
      makeSeries("Rootkit", "Rootkit");
      makeSeries("其他", "其他");


      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.appear(1000, 100);

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
