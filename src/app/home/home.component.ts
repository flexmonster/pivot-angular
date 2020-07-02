import { Component, OnInit, ViewChild } from '@angular/core';
import { FlexmonsterPivot } from 'ng-flexmonster';
import * as Flexmonster from 'flexmonster';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('pivot') pivot: FlexmonsterPivot;
  public pivotReport = {
    dataSource: {
      filename: 'https://cdn.flexmonster.com/data/data.csv'
    },
    slice: {
      rows: [
        { uniqueName: 'Destination' },
        { uniqueName: 'Color' },
        { uniqueName: '[Measures]' }
      ],
      columns: [
        { uniqueName: 'Category' },
        { uniqueName: 'Country' }
      ],
      measures: [
        { uniqueName: 'Price', aggregation: 'sum' },
        { uniqueName: 'Quantity', aggregation: 'sum' }
      ]
    }
  };

  ngOnInit(): void {
  }

  onPivotReady(pivot: Flexmonster.Pivot): void {
    console.log('[ready] FlexmonsterPivot', this.pivot);
  }

  showInfo(): void {
    this.pivot.flexmonster.alert({
      title: "Customizing Flexmonster",
      message: "1) How to customize the Toolbar: <a style='text-decoration:underline; color:blue' href='https://www.flexmonster.com/doc/customizing-toolbar/'>see guide</a>",
      type: "info",
      blocking: false
    });
  }

  customizeToolbar(toolbar: Flexmonster.Toolbar): void {

    // Get all tabs
    var tabs = toolbar.getTabs();
    // The reference to the handler method
    var newTabHandler = this.showInfo.bind(this);

    toolbar.getTabs = function () {
      let newTab = {
        id: "fm-tab-newtab",
        title: "New Tab",
        handler: newTabHandler,
        icon: toolbar.icons.open
      }

      // Add new tab
      tabs.unshift(newTab);

      return tabs;
    }

  }

  onCustomizeCell(cell: Flexmonster.CellBuilder, data: Flexmonster.CellData): void {
    // console.log("[customizeCell] FlexmonsterPivot");
    if (data.isClassicTotalRow) {
      cell.addClass('fm-total-classic-r');
    }
    if (data.isGrandTotalRow) {
      cell.addClass('fm-grand-total-r');
    }
    if (data.isGrandTotalColumn) {
      cell.addClass('fm-grand-total-c');
    }
  }

  onReportComplete(): void {
    this.pivot.flexmonster.off('reportcomplete');
    this.pivot.flexmonster.setReport({
      dataSource: {
        dataSourceType: 'json',
        filename: 'https://cdn.flexmonster.com/data/data.json'
      }
    });
  }

}
