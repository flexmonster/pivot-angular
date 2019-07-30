import { Component, ViewChild } from '@angular/core';
import { FlexmonsterPivot } from 'ng-flexmonster';
import * as Flexmonster from 'flexmonster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('pivot', {static: false}) pivot: FlexmonsterPivot;
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

  onPivotReady(pivot: Flexmonster.Pivot): void {
    console.log('[ready] FlexmonsterPivot', this.pivot);
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
