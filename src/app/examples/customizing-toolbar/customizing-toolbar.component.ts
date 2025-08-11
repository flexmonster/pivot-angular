import { Component, viewChild } from "@angular/core";
import { FlexmonsterPivot, FlexmonsterPivotModule } from "ngx-flexmonster";

@Component({
  selector: "app-customizing-toolbar",
  templateUrl: "./customizing-toolbar.component.html",
  styleUrls: ["./customizing-toolbar.component.css"],
  imports: [FlexmonsterPivotModule],
  standalone: true,
})
export class CustomizingToolbarComponent {
  readonly pivot = viewChild.required<FlexmonsterPivot>("pivot");

  showInfo() {
    this.pivot().flexmonster.alert({
      title: "Customizing Flexmonster",
      message:
        "How to customize the Toolbar: <a style='text-decoration:underline; color:#00A45A' target='blank' href='https://www.flexmonster.com/doc/customizing-toolbar/?r=rm_ng'>https://www.flexmonster.com/doc/customizing-toolbar/</a> <br>",
      type: "info",
      blocking: false,
    });
  }

  customizeToolbar(toolbar: Flexmonster.Toolbar) {
    let tabs = toolbar.getTabs();
    toolbar.getTabs = () => {
      tabs = [];
      // Add a new tab
      tabs.push({
        id: "fm-tab-newtab",
        title: "New Tab",
        handler: () => this.showInfo(),
        icon: toolbar.icons.open,
      });
      return tabs;
    };
  }
}
