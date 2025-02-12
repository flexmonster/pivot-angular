import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-toggle-button',
    templateUrl: './toggle-button.component.html',
    styleUrls: ['./toggle-button.component.css'],
    standalone: false
})
export class ToggleButtonComponent implements OnInit {
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
