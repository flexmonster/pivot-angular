import { Component, OnInit } from '@angular/core';
import { FlexmonsterPivotModule } from 'ngx-flexmonster';

@Component({
    selector: 'app-pivot-table-demo',
    templateUrl: './pivot-table-demo.component.html',
    styleUrls: ['./pivot-table-demo.component.css'],
    imports: [FlexmonsterPivotModule],
    standalone: true
})
export class PivotTableDemoComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    customizeToolbar(toolbar: Flexmonster.Toolbar) {
        toolbar.showShareReportTab = true;
    }

}
