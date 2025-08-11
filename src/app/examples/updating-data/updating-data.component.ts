import { Component, viewChild } from "@angular/core";
import { FlexmonsterPivot, FlexmonsterPivotModule } from "ngx-flexmonster";

@Component({
  selector: "app-updating-data",
  templateUrl: "./updating-data.component.html",
  styleUrls: ["./updating-data.component.css"],
  imports: [FlexmonsterPivotModule],
  standalone: true,
})
export class UpdatingDataComponent {
  readonly pivot = viewChild.required<FlexmonsterPivot>("pivot");

  public data: Object[] = [
    {
      "Category": "Accessories",
      "Size": "262 oz",
      "Color": "red",
      "Destination": "Australia",
      "Business Type": "Specialty Bike Shop",
      "Country": "Australia",
      "Price": 100,
      "Quantity": 225,
      "Discount": 23,
    },
    {
      "Category": "Components",
      "Size": "235 oz",
      "Color": "green",
      "Destination": "Australia",
      "Business Type": "Warehouse",
      "Country": "Australia",
      "Price": 200,
      "Quantity": 1950,
      "Discount": 51,
    },
  ];

  customizeToolbar(toolbar: Flexmonster.Toolbar) {
    toolbar.showShareReportTab = true;
  }

  onReady() {
    // Connect Flexmonster to the data
    this.pivot().flexmonster.connectTo({ data: this.data });
  }

  updateTheData() {
    // If the data got updated, for example
    this.data = [
      {
        "Category": "Accessories",
        "Size": "262 oz",
        "Color": "red",
        "Destination": "Australia",
        "Business Type": "Specialty Bike Shop",
        "Country": "Australia",
        "Price": Math.floor(Math.random() * Math.floor(1000)),
        "Quantity": 225,
        "Discount": 23,
      },
      {
        "Category": "Components",
        "Size": "307 oz",
        "Color": "white",
        "Destination": "United Kingdom",
        "Business Type": "Warehouse",
        "Country": "Canada",
        "Price": Math.floor(Math.random() * Math.floor(1000)),
        "Quantity": 8212,
        "Discount": 55,
      },
      {
        "Category": "Clothes",
        "Size": "400 oz",
        "Color": "blue",
        "Destination": "Belgium",
        "Business Type": "Warehouse",
        "Country": "France",
        "Price": Math.floor(Math.random() * Math.floor(1000)),
        "Quantity": 7978,
        "Discount": 30,
      },
    ];
    // Then the data needs to be updated in Flexmonster as well
    // This can be done via Flexmonster's updateData() API call
    this.pivot().flexmonster.updateData({ data: this.data });
  }
}
