import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FlexmonsterPivot } from 'ng-flexmonster';

@Component({
    selector: 'app-calling-events',
    templateUrl: './calling-events.component.html',
    styleUrls: ['./calling-events.component.css']
})
export class CallingEventsComponent implements OnInit {

    @ViewChild('pivot') pivot: FlexmonsterPivot;
    @ViewChild('logsContainer') logsContainer: ElementRef<HTMLElement>;

    public logs: {
        date: Date,
        event: string
    }[] = [];

    public eventList = [
        "afterchartdraw",
        "aftergriddraw",
        "beforegriddraw",
        "beforetoolbarcreated",
        "cellclick",
        "celldoubleclick",
        "chartclick",
        "datachanged",
        "dataerror",
        "datafilecancelled",
        "dataloaded",
        "drillthroughclose",
        "drillthroughopen",
        "exportcomplete",
        "exportstart",
        "fieldslistclose",
        "fieldslistopen",
        "filterclose",
        "filteropen",
        "loadingdata",
        "loadinglocalization",
        "loadingolapstructure",
        "loadingreportfile",
        "localizationerror",
        "localizationloaded",
        "olapstructureerror",
        "olapstructureloaded",
        "openingreportfile",
        "printcomplete",
        "printstart",
        "querycomplete",
        "queryerror",
        "ready",
        "reportchange",
        "reportcomplete",
        "reportfilecancelled",
        "reportfileerror",
        "runningquery",
        "update",
    ];

    constructor() { }

    ngOnInit(): void {
    }

    printLog(log: string) {
        this.logs.push({
            date: new Date(),
            event: log
        });
        requestAnimationFrame(() => {
            this.logsContainer.nativeElement.scrollTop = this.logsContainer.nativeElement.scrollHeight;
        });
    }

    signOffAllEvents() {
        for (const eventName of this.eventList) {
            // remove all handlers for specified event
            this.pivot.flexmonster.off(eventName);
        }
    }

    signOnAllEvents() {
        for (const eventName of this.eventList) {
            // add handler for specified event
            this.pivot.flexmonster.on(eventName, () => {
                this.printLog(eventName);
            });
        }
    }

    clearLogs() {
        this.logs.length = 0;
    }
}
