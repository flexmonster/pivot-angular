import { Component, viewChild } from "@angular/core";
import { FlexmonsterPivot, FlexmonsterPivotModule } from "ngx-flexmonster";

// Importing amCharts
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
// Applying the amCharts theme
am4core.useTheme(am4themes_animated);

// Importing Flexmonster Connector for amCharts
import "flexmonster/lib/flexmonster.amcharts.js";

@Component({
  selector: "app-with-amcharts4",
  templateUrl: "./with-amcharts4.component.html",
  styleUrls: ["./with-amcharts4.component.css"],
  imports: [FlexmonsterPivotModule],
  standalone: true,
})
export class WithAmcharts4Component {
  readonly pivot = viewChild.required<FlexmonsterPivot>("pivot");
  chart!: am4charts.PieChart;

  customizeToolbar(toolbar: Flexmonster.Toolbar) {
    toolbar.showShareReportTab = true;
  }

  drawChart() {
    this.pivot().flexmonster.amcharts?.getData({}, this.createChart.bind(this), this.updateChart.bind(this));
  }

  onReportComplete() {
    this.pivot().flexmonster.off("reportcomplete");
    this.drawChart();
  }

  createChart(chartData: Flexmonster.GetDataValueObject, rawData: Flexmonster.GetDataValueObject) {
    // Creating a chart instance
    let chart = am4core.create("amcharts-container", am4charts.PieChart);

    // Adding data processed by Flexmonster to the chart
    chart.data = chartData.data;

    // Creating and configuring series for a pie chart
    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.category = this.pivot().flexmonster.amcharts?.getCategoryName(rawData);
    pieSeries.dataFields.value = this.pivot().flexmonster.amcharts?.getMeasureNameByIndex(rawData, 0);
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 3;
    pieSeries.slices.template.strokeOpacity = 1;

    // Creating initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

    this.chart = chart;
  }

  updateChart(chartData: Flexmonster.GetDataValueObject, rawData: Flexmonster.GetDataValueObject) {
    this.chart?.dispose();
    this.createChart(chartData, rawData);
  }

  ngOnDestroy() {
    this.chart?.dispose();
  }
}
