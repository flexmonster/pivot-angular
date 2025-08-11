import { Component, input, output } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-toggle-button",
  templateUrl: "./toggle-button.component.html",
  styleUrls: ["./toggle-button.component.css"],
  imports: [FormsModule],
  standalone: true,
})
export class ToggleButtonComponent {
  public readonly _id = input.required<string>();
  public readonly labelOn = input.required<string>();
  public readonly labelOff = input.required<string>();

  public readonly clicked = output<boolean>();

  public checked: boolean = true;

  onChange() {
    this.clicked.emit(this.checked);
  }
}
