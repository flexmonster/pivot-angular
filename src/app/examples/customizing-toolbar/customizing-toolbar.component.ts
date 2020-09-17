import { Component, OnInit, ViewChild } from '@angular/core';
import { FlexmonsterPivot } from 'ng-flexmonster';

@Component({
    selector: 'app-customizing-toolbar',
    templateUrl: './customizing-toolbar.component.html',
    styleUrls: ['./customizing-toolbar.component.css']
})
export class CustomizingToolbarComponent implements OnInit {

    @ViewChild('pivot') pivot: FlexmonsterPivot;

    constructor() { }

    ngOnInit(): void {
    }

    showInfo() {
        this.pivot.flexmonster.alert({
            title: "Customizing Flexmonster",
            message:
                "How to customize the Toolbar: <a style='text-decoration:underline; color:#00A45A' target='blank' href='https://www.flexmonster.com/doc/customizing-toolbar/'>https://www.flexmonster.com/doc/customizing-toolbar/</a> <br>",
            type: "info",
            blocking: false,
        });
    }

    customizeToolbar(toolbar: Flexmonster.Toolbar) {
        let tabs = toolbar.getTabs();
        toolbar.getTabs = () => {
            tabs = [];
            // add new tab
            tabs.push({
                id: "fm-tab-newtab",
                title: "New Tab",
                handler: () => this.showInfo(),
                icon: toolbar.icons.open,
            });
            return tabs;
        };
    }

}
