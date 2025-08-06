import { Component, viewChild } from "@angular/core";
import { FlexmonsterPivot, FlexmonsterPivotModule } from "ngx-flexmonster";
import { ToggleSwitchComponent } from "../../common/toggle-switch/toggle-switch.component";

@Component({
  selector: "app-using-api-calls",
  templateUrl: "./using-api-calls.component.html",
  styleUrls: ["./using-api-calls.component.css"],
  imports: [ToggleSwitchComponent, FlexmonsterPivotModule],
  standalone: true,
})
export class UsingApiCallsComponent {
  readonly pivot = viewChild.required<FlexmonsterPivot>("pivot");

  customizeToolbar(toolbar: Flexmonster.Toolbar) {
    toolbar.showShareReportTab = true;
  }

  toggleView(checked: boolean) {
    if (checked) {
      this.showGrid();
    } else {
      this.showChart();
    }
  }

  toggleMode(checked: boolean) {
    if (checked) {
      this.interactive();
    } else {
      this.readOnly();
    }
  }

  showChart() {
    this.pivot().flexmonster.showCharts("column");
  }

  showGrid() {
    this.pivot().flexmonster.showGrid();
  }

  readOnly() {
    this.pivot().flexmonster.setOptions({
      readOnly: true,
    });
    this.pivot().flexmonster.refresh();
  }

  interactive() {
    this.pivot().flexmonster.setOptions({
      readOnly: false,
    });
    this.pivot().flexmonster.refresh();
  }
}
