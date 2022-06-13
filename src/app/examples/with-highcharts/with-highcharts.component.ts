import { Component, OnInit, ViewChild } from '@angular/core';
import { FlexmonsterPivot } from 'ng-flexmonster';
import * as Highcharts from 'highcharts';
// Importing Flexmonster's connector for Highcharts
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

    public report: Object = {
        dataSource: {
            filename: "https://cdn.flexmonster.com/data/data.csv"
        },
        slice: {
            rows: [
                {
                    uniqueName: "Country"
                },
                {
                    uniqueName: "Business Type",
                    filter: {
                        exclude: ["business type.[value added reseller]"]
                    }
                },
                {
                    uniqueName: "[Measures]"
                }
            ],
            columns: [
                {
                    uniqueName: "Category",
                    filter: {
                        exclude: ["category.[cars]"]
                    }
                },
                {
                    uniqueName: "Color",
                    filter: {
                        exclude: ["color.[white]", "color.[purple]"]
                    }
                }
            ],
            measures: [
                {
                    uniqueName: "Price",
                    format: "empty"
                }
            ],
            expands: {
                rows: [
                    {
                        tuple: ["country.[united states]"]
                    },
                    {
                        tuple: ["country.[canada]"]
                    }
                ],
                columns: [
                    {
                        tuple: ["category.[accessories]"]
                    }
                ]
            }
        },
        conditions: [
            {
                formula: "#value < 5000",
                format: {
                    backgroundColor: "#009688",
                    color: "#FFFFFF"
                }
            }
        ],
        formats: [
            {
                name: "empty",
                currencySymbol: "$",
                nullValue: "-"
            }
        ]
    };

    onReady() {
        this.pivot.flexmonster.setReport(this.report);
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
        //this.pivot.flexmonster.drillUpCell("columns", [], "", "2018");
        //this.pivot.flexmonster.drillUpCell("columns", [], "", "2019");
        this.drawChart();
    }

}
