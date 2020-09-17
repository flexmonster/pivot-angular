import { Component, OnInit, ViewChild } from '@angular/core';
import { FlexmonsterPivot } from 'ng-flexmonster';

@Component({
    selector: 'app-updating-data',
    templateUrl: './updating-data.component.html',
    styleUrls: ['./updating-data.component.css']
})
export class UpdatingDataComponent implements OnInit {

    @ViewChild('pivot') pivot: FlexmonsterPivot;

    public data: Object[] = [
        {
            Category: "Accessories",
            Size: "262 oz",
            Color: "red",
            Destination: "Australia",
            "Business Type": "Specialty Bike Shop",
            Country: "Australia",
            Price: 100,
            Quantity: 225,
            Discount: 23,
        },
        {
            Category: "Components",
            Size: "235 oz",
            Color: "green",
            Destination: "Australia",
            "Business Type": "Warehouse",
            Country: "Australia",
            Price: 200,
            Quantity: 1950,
            Discount: 51,
        },
    ];

    constructor() { }

    ngOnInit(): void {
    }

    onReady() {
        // Connect Flexmonster to the data
        this.pivot.flexmonster.connectTo({ data: this.data });
    }

    updateTheData() {
        // If the data in Vue got updated, for example:
        this.data = [
            {
                Category: "Accessories",
                Size: "262 oz",
                Color: "red",
                Destination: "Australia",
                "Business Type": "Specialty Bike Shop",
                Country: "Australia",
                Price: Math.floor(Math.random() * Math.floor(1000)),
                Quantity: 225,
                Discount: 23,
            },
            {
                Category: "Components",
                Size: "307 oz",
                Color: "white",
                Destination: "United Kingdom",
                "Business Type": "Warehouse",
                Country: "Canada",
                Price: Math.floor(Math.random() * Math.floor(1000)),
                Quantity: 8212,
                Discount: 55,
            },
        ];
        // then the data needs to be updated in Flexmonster as well
        // this can be done via Flexmonster's updateData() API call:
        this.pivot.flexmonster.updateData({ data: this.data });
    }

}
