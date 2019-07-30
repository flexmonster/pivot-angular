import { Component, OnInit, ViewChild } from '@angular/core';
import { FlexmonsterPivot } from 'ng-flexmonster';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  @ViewChild('pivot1', {static: false}) pivot1: FlexmonsterPivot;
  @ViewChild('pivot2', {static: false}) pivot2: FlexmonsterPivot;

  constructor() { }

  ngOnInit() {
  }

  onTabChange(index) {
    console.log('tab change', index);
    index++;
    if (this['pivot' + index]) {
      this['pivot' + index].flexmonster.refresh();
    }
  }

}
