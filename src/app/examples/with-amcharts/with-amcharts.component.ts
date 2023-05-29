import { Component, ViewChild, OnInit } from '@angular/core';
import { FlexmonsterPivot } from 'ngx-flexmonster';

// amCharts imports
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

// Importing Flexmonster Connector for amCharts
import "flexmonster/lib/flexmonster.amcharts.js";

@Component({
    selector: 'app-with-amcharts',
    templateUrl: './with-amcharts.component.html',
    styleUrls: ['./with-amcharts.component.css']
})
export class WithAmchartsComponent implements OnInit {
    @ViewChild('pivot') pivot!: FlexmonsterPivot;

    private flexmonster!: Flexmonster.Pivot;
    private root!: am5.Root;

    public report: Flexmonster.Report = {
        dataSource: {
            filename: 'https://cdn.flexmonster.com/data/data.csv'
        },
        slice: {
            rows: [{
                uniqueName: 'Country'
            }],
            columns: [{
                uniqueName: '[Measures]'
            }],
            measures: [{
                uniqueName: 'Price',
                aggregation: 'sum'
            }]
        }
    };

    constructor() { }

    ngOnInit(): void {
    }

    customizeToolbar(toolbar: Flexmonster.Toolbar) {
        toolbar.showShareReportTab = true;
    }

    drawChart() {
        this.pivot.flexmonster.amcharts?.getData(
            {},
            this.createChart.bind(this),
            this.updateChart.bind(this)
        );
    }

    onReportComplete() {
        this.pivot.flexmonster.off("reportcomplete");
        this.drawChart();
    }

    createChart = (chartData: Flexmonster.GetDataValueObject, rawData: Flexmonster.GetDataValueObject) => {

        /* Create root element and chart instance */
        this.root = am5.Root.new("amcharts-container");
        let chart = this.root.container.children.push(am5xy.XYChart.new(this.root, {
        }));

        /* Apply amCharts theme */
        this.root.setThemes([
            am5themes_Animated.new(this.root),
        ]);

        /* Apply number format from Flexmonster */
        this.root.numberFormatter.set("numberFormat", this.pivot.flexmonster.amcharts?.getNumberFormatPattern((rawData.meta as any).formats[0]));

        /* Create and configure Y axis */
        let yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(this.root, {
            categoryField: this.pivot.flexmonster.amcharts?.getCategoryName(rawData)!,
            renderer: am5xy.AxisRendererY.new(this.root, {
                cellStartLocation: 0.1,
                cellEndLocation: 0.9
            })
        }));

        /* Create and configure X axis */
        let xAxis = chart.xAxes.push(am5xy.ValueAxis.new(this.root, {
            renderer: am5xy.AxisRendererX.new(this.root, {}),
        }));

        xAxis.set("numberFormatter", am5.NumberFormatter.new(this.root, {
            "numberFormat": "#a"
        }));

        /* Create and configure series for a bar chart */
        let series = chart.series.push(am5xy.ColumnSeries.new(this.root, {
            name: this.pivot.flexmonster.amcharts?.getMeasureNameByIndex(rawData, 0),
            xAxis: xAxis,
            yAxis: yAxis as any,
            sequencedInterpolation: true,
            valueXField: this.pivot.flexmonster.amcharts?.getMeasureNameByIndex(rawData, 0),
            categoryYField: this.pivot.flexmonster.amcharts?.getCategoryName(rawData),
            tooltip: am5.Tooltip.new(this.root, {
                labelText: '{name}: [bold]{valueX}[/]'
            })
        }));

        chart.set("cursor", am5xy.XYCursor.new(this.root, {
            behavior: "none",
            xAxis: xAxis,
            yAxis: yAxis
          }));

        /* Add data processed by Flexmonster to the chart */
        yAxis.data.setAll(chartData.data);
        series.data.setAll(chartData.data);

        /* Create initial animation */
        series.appear(1000);
        chart.appear(1000, 100);
    }

    updateChart(chartData: Flexmonster.GetDataValueObject, rawData: Flexmonster.GetDataValueObject) {
        this.root.dispose();
        this.createChart(chartData, rawData)
    }

    ngOnDestroy() {
        // Clean up this.chart when the component is removed
        if (this.root) {
            this.root.dispose();
        }
    }

}
