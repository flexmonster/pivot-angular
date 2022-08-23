import { Component, OnInit, ViewChild } from '@angular/core';
import { FlexmonsterPivot } from 'ng-flexmonster';
// Importing Highcharts
import * as Highcharts from 'highcharts';
// Importing Flexmonster Connector for Highcharts
import "flexmonster/lib/flexmonster.highcharts.js";

@Component({
    selector: 'app-with-highcharts',
    templateUrl: './with-highcharts.component.html',
    styleUrls: ['./with-highcharts.component.css']
})
export class WithHighchartsComponent implements OnInit {

    @ViewChild('pivot') pivot!: FlexmonsterPivot;

    constructor() { }

    ngOnInit(): void {
    }

    customizeToolbar(toolbar: Flexmonster.Toolbar) {
        toolbar.showShareReportTab = true;
    }

    drawChart() {
        this.pivot.flexmonster.highcharts?.getData(
            {
                type: "spline"
            },
            (data: Flexmonster.GetDataValueObject) => {
                Highcharts.chart('highcharts-container', <Highcharts.Options>data);
            },
            (data: Flexmonster.GetDataValueObject) => {
                Highcharts.chart('highcharts-container', <Highcharts.Options>data);
            }
        );
    }

    onReportComplete() {
        this.pivot.flexmonster.off("reportcomplete");
        this.drawChart();
    }
}
