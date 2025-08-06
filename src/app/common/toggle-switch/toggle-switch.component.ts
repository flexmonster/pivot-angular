import { Component, input, output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-toggle-switch",
  templateUrl: "./toggle-switch.component.html",
  styleUrls: ["./toggle-switch.component.css"],
  imports: [FormsModule],
  standalone: true,
})
export class ToggleSwitchComponent {
  public readonly _id = input.required<string>();
  public readonly labelOn = input.required<string>();
  public readonly labelOff = input.required<string>();

  public readonly clicked = output<boolean>();

  public checked: boolean = true;

  onChange() {
    this.clicked.emit(this.checked);
  }
}
