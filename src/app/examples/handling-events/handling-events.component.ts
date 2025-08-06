import { Component, viewChild, ElementRef } from "@angular/core";
import { FlexmonsterPivot, FlexmonsterPivotModule } from "ngx-flexmonster";
import { ToggleButtonComponent } from "../../common/toggle-button/toggle-button.component";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-handling-events",
  templateUrl: "./handling-events.component.html",
  styleUrls: ["./handling-events.component.css"],
  imports: [ToggleButtonComponent, FlexmonsterPivotModule, DatePipe],
  standalone: true,
})
export class HandlingEventsComponent {
  readonly pivot = viewChild.required<FlexmonsterPivot>("pivot");
  readonly logsContainer = viewChild.required<ElementRef<HTMLElement>>("logsContainer");

  public logs: {
    id?: string;
    date: Date;
    event: string;
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

  customizeToolbar(toolbar: Flexmonster.Toolbar) {
    toolbar.showShareReportTab = true;
  }

  printLog(log: string) {
    this.logs.push({
      date: new Date(),
      event: log,
      id: new Date().getTime() + log,
    });
    requestAnimationFrame(() => {
      this.logsContainer().nativeElement.scrollTop = this.logsContainer().nativeElement.scrollHeight;
    });
  }

  toggleEvents(checked: boolean) {
    if (checked) {
      this.signOnAllEvents();
    } else {
      this.signOffAllEvents();
    }
  }

  signOffAllEvents() {
    for (const eventName of this.eventList) {
      // Remove all handlers for the specified event
      this.pivot().flexmonster.off(eventName);
    }
  }

  signOnAllEvents() {
    for (const eventName of this.eventList) {
      // Add a handler for the specified event
      this.pivot().flexmonster.on(eventName, () => {
        this.printLog(eventName);
      });
    }
  }

  clearLogs() {
    this.logs.length = 0;
  }
}
