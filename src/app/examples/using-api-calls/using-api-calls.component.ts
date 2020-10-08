import { Component, OnInit, ViewChild } from '@angular/core';
import { FlexmonsterPivot } from 'ng-flexmonster';

@Component({
    selector: 'app-using-api-calls',
    templateUrl: './using-api-calls.component.html',
    styleUrls: ['./using-api-calls.component.css']
})
export class UsingApiCallsComponent implements OnInit {

    @ViewChild('pivot') pivot: FlexmonsterPivot;

    public report: Flexmonster.Report = {
        dataSource: {
            filename: 'https://cdn.flexmonster.com/data/data.json',
        }
    };

    constructor() { }

    ngOnInit(): void {
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
        this.pivot.flexmonster.showCharts("column");
    }

    showGrid() {
        this.pivot.flexmonster.showGrid();
    }

    readOnly() {
        this.pivot.flexmonster.setOptions({
            grid: {
                showFilter: false,
                dragging: false,
            },
            chart: {
                showFilter: false,
                showMeasures: false,
            },
            configuratorButton: false,
            sorting: false,
            drillThrough: false,
        });
        this.hideContextMenu();
        this.pivot.flexmonster.refresh();
    }
    
    interactive() {
        this.pivot.flexmonster.setOptions({
            grid: {
                showFilter: true,
                dragging: true,
            },
            chart: {
                showFilter: true,
                showMeasures: true,
            },
            configuratorButton: true,
            sorting: true,
            drillThrough: true,
        });
        this.showContextMenu();
        this.pivot.flexmonster.refresh();
    }

    // readOnly() {
    //     this.pivot.flexmonster.setOptions({
    //         grid: {
    //             showFilter: false,
    //             dragging: false,
    //         },
    //         chart: {
    //             showFilter: false,
    //         },
    //         configuratorButton: false,
    //         sorting: "off",
    //         drillThrough: false,
    //     });
    //     this.showContextMenu();
    //     this.pivot.flexmonster.refresh();
    // }

    // interactive() {
    //     this.pivot.flexmonster.setOptions({
    //         grid: {
    //             showFilter: true,
    //             dragging: true,
    //         },
    //         chart: {
    //             showFilter: true,
    //         },
    //         configuratorButton: true,
    //         sorting: "on",
    //         drillThrough: true,
    //     });
    //     this.hideContextMenu();
    //     this.pivot.flexmonster.refresh();
    // }

    showContextMenu() {
        this.pivot.flexmonster.customizeContextMenu(() => {
            return [];
        });
    }

    hideContextMenu() {
        this.pivot.flexmonster.customizeContextMenu(null);
    }
}
