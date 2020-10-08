import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.css']
})
export class ToggleButtonComponent implements OnInit {
  @Input() public _id: string;
  @Input() public labenOn: string;
  @Input() public labenOff: string;

  @Output() public clicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  public checked: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  onChange() {
    this.clicked.emit(this.checked);
  }

}
