import { Component, viewChild } from "@angular/core";
import { FlexmonsterPivot, FlexmonsterPivotModule } from "ngx-flexmonster";

// Importing amCharts
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

// Importing Flexmonster Connector for amCharts
import "flexmonster/lib/flexmonster.amcharts.js";

@Component({
  selector: "app-with-amcharts",
  templateUrl: "./with-amcharts.component.html",
  styleUrls: ["./with-amcharts.component.css"],
  imports: [FlexmonsterPivotModule],
  standalone: true,
})
export class WithAmchartsComponent {
  readonly pivot = viewChild.required<FlexmonsterPivot>("pivot");
  private root!: am5.Root;

  drawChart() {
    this.pivot().flexmonster.amcharts?.getData({}, this.createChart.bind(this), this.updateChart.bind(this));
  }

  onReportComplete() {
    this.pivot().flexmonster.off("reportcomplete");
    this.drawChart();
  }

  createChart = (chartData: Flexmonster.GetDataValueObject, rawData: Flexmonster.GetDataValueObject) => {
    // Initializing the root element
    this.root = am5.Root.new("amcharts-container");
    // Applying the amCharts theme
    this.root.setThemes([am5themes_Animated.new(this.root)]);
    // Applying number format from Flexmonster
    this.root.numberFormatter.set("numberFormat", this.pivot().flexmonster.amcharts?.getNumberFormatPattern((rawData.meta as any).formats[0]));

    // Creating a chart instance
    const chart = this.root.container.children.push(
      am5percent.PieChart.new(this.root, {
        layout: this.root.verticalLayout,
        innerRadius: 100,
      })
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(this.root, {
        valueField: this.pivot().flexmonster.amcharts?.getMeasureNameByIndex(rawData, 0),
        categoryField: this.pivot().flexmonster.amcharts?.getCategoryName(rawData),
      })
    );

    series.children.push(
      am5.Label.new(this.root, {
        text: "[#999]TOTAL:[/]\n{valueSum.formatNumber()}",
        populateText: true,
        textAlign: "center",
        centerX: am5.p50,
        centerY: am5.p50,
        fontSize: 24,
        fontWeight: "500",
        fill: am5.color(0x555555),
        oversizedBehavior: "fit",
      })
    );

    series.slices.template.set("tooltipText", "{category}: {value} ({valuePercentTotal.formatNumber('0.00')}%)");
    series.labels.template.set("visible", false);
    series.ticks.template.set("visible", false);

    series.data.setAll(chartData.data);

    const legend = chart.children.push(am5.Legend.new(this.root, {
      centerX: am5.percent(50),
      x: am5.percent(50),
      layout: am5.GridLayout.new(this.root, {
        maxColumns: 3,
        fixedWidthGrid: true
      }),
      height: am5.percent(20),
      verticalScrollbar: am5.Scrollbar.new(this.root, {
        orientation: "vertical"
      }),
    }));
    legend.data.setAll(series.dataItems);
    legend.valueLabels.template.set("forceHidden", true);

    chart.appear(1000, 100);
    series.appear(1000, 100);
  };

  updateChart(chartData: Flexmonster.GetDataValueObject, rawData: Flexmonster.GetDataValueObject) {
    this.root?.dispose();
    this.createChart(chartData, rawData);
  }

  customizeToolbar(toolbar: Flexmonster.Toolbar) {
    toolbar.showShareReportTab = true;
  }

  ngOnDestroy() {
    // Disposing of the chart instance when the component is destroyed
    this.root?.dispose();
  }
}
