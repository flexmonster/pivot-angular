import { Component, OnInit, ViewChild } from '@angular/core';
import { FlexmonsterPivot } from 'ng-flexmonster';

@Component({
    selector: 'app-customizing-grid',
    templateUrl: './customizing-grid.component.html',
    styleUrls: ['./customizing-grid.component.css']
})
export class CustomizingGridComponent implements OnInit {

    @ViewChild('pivot') pivot!: FlexmonsterPivot;

    constructor() { }

    ngOnInit(): void {
    }

    customizeToolbar(toolbar: Flexmonster.Toolbar) {
        toolbar.showShareReportTab = true;
    }

    customizeCellFunction(cell: Flexmonster.CellBuilder, data: Flexmonster.CellData) {
        if (data.measure && data.measure.uniqueName == "Price") {
            let backgroundColor = "#00A45A";
            let textShadowColor = "#095231";
            let borderColor = "#009552";
            cell.style = {
                ...cell.style,
                "background-color": backgroundColor,
                "color": "white",
                "font-weight": "bold",
                "text-shadow": `0px 2px 3px ${textShadowColor}`,
                "border-bottom": `1px solid ${borderColor}`,
                "border-right": `1px solid ${borderColor}`
            };
        }
    }

    removeCustomization() {
        this.pivot.flexmonster.customizeCell(() => null);
    }

    applyCustomization() {
        this.pivot.flexmonster.customizeCell(this.customizeCellFunction);
    }

    toggleCustomization(checked: boolean) {
        if (checked) {
            this.applyCustomization();
        } else {
            this.removeCustomization();
        }
    }
}
