import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TopMenuComponent } from "./common/top-menu/top-menu.component";
import { SideMenuComponent } from "./common/side-menu/side-menu.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  imports: [RouterOutlet, TopMenuComponent, SideMenuComponent],
  standalone: true,
})
export class AppComponent {
  title = "pivot-angular";
}
