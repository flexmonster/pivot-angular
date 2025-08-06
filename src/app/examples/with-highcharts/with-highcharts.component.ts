import { Component, viewChild } from "@angular/core";
import { FlexmonsterPivot, FlexmonsterPivotModule } from "ngx-flexmonster";

// Importing Highcharts
import { HighchartsChartComponent } from "highcharts-angular";
import "highcharts/esm/modules/accessibility";

// Importing Flexmonster Connector for Highcharts
import "flexmonster/lib/flexmonster.highcharts.js";

@Component({
  selector: "app-with-highcharts",
  templateUrl: "./with-highcharts.component.html",
  styleUrls: ["./with-highcharts.component.css"],
  imports: [FlexmonsterPivotModule, HighchartsChartComponent],
  standalone: true,
})
export class WithHighchartsComponent {
  readonly pivot = viewChild.required<FlexmonsterPivot>("pivot");
  chartOptions: Highcharts.Options = {};
  updateFlag: boolean = false;

  customizeToolbar(toolbar: Flexmonster.Toolbar) {
    toolbar.showShareReportTab = true;
  }

  onReportComplete() {
    this.pivot().flexmonster.off("reportcomplete");
    this.drawChart();
  }

  drawChart() {
    this.pivot().flexmonster.highcharts?.getData(
      {
        type: "spline",
      },
      (data: Flexmonster.GetDataValueObject) => {
        this.chartOptions = <Highcharts.Options>data;
        this.updateFlag = true;
      },
      (data: Flexmonster.GetDataValueObject) => {
        this.chartOptions = <Highcharts.Options>data;
        this.updateFlag = true;
      }
    );
  }
}
