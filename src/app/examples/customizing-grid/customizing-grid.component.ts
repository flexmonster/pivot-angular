import { Component, OnInit, ViewChild } from '@angular/core';
import { FlexmonsterPivot } from 'ng-flexmonster';

@Component({
    selector: 'app-customizing-grid',
    templateUrl: './customizing-grid.component.html',
    styleUrls: ['./customizing-grid.component.css']
})
export class CustomizingGridComponent implements OnInit {

    @ViewChild('pivot') pivot: FlexmonsterPivot;

    public report: Flexmonster.Report = {
        dataSource: {
            filename: 'https://cdn.flexmonster.com/data/data.csv'
        },
        slice: {
            rows: [{
                uniqueName: 'Category'
            }, {
                uniqueName: '[Measures]'
            }],
            columns: [{
                uniqueName: 'Color'
            }],
            measures: [{
                uniqueName: 'Price',
                aggregation: 'sum'
            }, {
                uniqueName: 'Discount',
                aggregation: 'sum'
            }, {
                uniqueName: 'Quantity',
                aggregation: 'sum'
            }]
        }
    };

    constructor() { }

    ngOnInit(): void {
    }

    customizeCellFunction(cell: Flexmonster.CellBuilder, data: Flexmonster.CellData) {
        if (data.measure && data.measure.uniqueName == "Price") {
            let backgroundColor = "#00A45A";
            let textShadowColor = "#095231";
            let borderColor = "#009552";
            cell.style["background-color"] = backgroundColor;
            cell.style["color"] = "white";
            cell.style["font-weight"] = "bold";
            cell.style["text-shadow"] = `0px 2px 3px ${textShadowColor}`;
            cell.style["border-bottom"] = `1px solid ${borderColor}`;
            cell.style["border-right"] = `1px solid ${borderColor}`;
        }
    }

    removeCustomization() {
        this.pivot.flexmonster.customizeCell(null);
    }

    applyCustomization() {
        this.pivot.flexmonster.customizeCell(this.customizeCellFunction);
    }

}
