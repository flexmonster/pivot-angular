import { Component, OnInit, ViewChild  } from '@angular/core';
import { FlexmonsterPivot } from 'ng-flexmonster';

import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.css']
})
export class HighchartsComponent implements OnInit {

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

  onReportComplete(): void {
    this.pivot.flexmonster.off('reportcomplete');
    this.createChart();
  }

  createChart(): void {
      this.pivot.flexmonster.highcharts.getData({
        type: "area"
      },
      function (data) {
        Highcharts.chart('highcharts-container', <Highcharts.Options>data);
      },
      function (data) {
        Highcharts.chart('highcharts-container', <Highcharts.Options>data);
      }

    );
  }

}
