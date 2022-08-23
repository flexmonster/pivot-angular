import { Component, ViewChild, OnInit } from '@angular/core';
import { FlexmonsterPivot } from 'ng-flexmonster';

// Importing amCharts
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

// Importing Flexmonster Connector for amCharts
import "flexmonster/lib/flexmonster.amcharts.js";

@Component({
    selector: 'app-with-amcharts',
    templateUrl: './with-amcharts.component.html',
    styleUrls: ['./with-amcharts.component.css']
})
export class WithAmchartsComponent implements OnInit {
    @ViewChild('pivot') pivot!: FlexmonsterPivot;

    chart!: am4charts.PieChart;

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

    createChart(chartData: Flexmonster.GetDataValueObject, rawData: Flexmonster.GetDataValueObject) {

        /* Apply amCharts theme */
        am4core.useTheme(am4themes_animated);

        /* Create chart instance */
        let chart = am4core.create("amcharts-container", am4charts.PieChart);

        /* Add data processed by Flexmonster to the chart */
        chart.data = chartData.data;

        /* Set an inner radius to transform a pie chart into a donut chart */
        chart.innerRadius = am4core.percent(50);

        /* Create and configure series for a pie chart */
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.category = this.pivot.flexmonster.amcharts?.getCategoryName(rawData);
        pieSeries.dataFields.value = this.pivot.flexmonster.amcharts?.getMeasureNameByIndex(rawData, 0);
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;

        /* Create initial animation */
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;

        this.chart = chart;
    }

    updateChart(chartData: Flexmonster.GetDataValueObject, rawData: Flexmonster.GetDataValueObject) {
        this.chart.dispose();
        this.createChart(chartData, rawData)
    }

    ngOnDestroy() {
        // Clean up this.chart when the component is removed
        if (this.chart) {
            this.chart.dispose();
        }
    }

}
