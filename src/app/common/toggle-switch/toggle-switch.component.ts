import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-toggle-switch',
    templateUrl: './toggle-switch.component.html',
    styleUrls: ['./toggle-switch.component.css'],
    standalone: false
})
export class ToggleSwitchComponent implements OnInit {
  @Input() public _id!: string;
  @Input() public labelOn!: string;
  @Input() public labelOff!: string;

  @Output() public clicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  public checked: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  onChange() {
    this.clicked.emit(this.checked);
  }

}
