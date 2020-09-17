import { Component, OnInit, ViewChild } from '@angular/core';
import { FlexmonsterPivot } from 'ng-flexmonster';

@Component({
    selector: 'app-using-api-calls',
    templateUrl: './using-api-calls.component.html',
    styleUrls: ['./using-api-calls.component.css']
})
export class UsingApiCallsComponent implements OnInit {

    @ViewChild('pivot') pivot: FlexmonsterPivot;

    constructor() { }

    ngOnInit(): void {
    }

    showChart() {
        this.pivot.flexmonster.showCharts("pie");
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
            },
            configuratorButton: false,
            sorting: "off",
            drillThrough: false,
        });
        this.showContextMenu();
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
            },
            configuratorButton: true,
            sorting: "on",
            drillThrough: true,
        });
        this.hideContextMenu();
        this.pivot.flexmonster.refresh();
    }

    showContextMenu() {
        this.pivot.flexmonster.customizeContextMenu(() => {
            return [];
        });
    }

    hideContextMenu() {
        this.pivot.flexmonster.customizeContextMenu(null);
    }
}
