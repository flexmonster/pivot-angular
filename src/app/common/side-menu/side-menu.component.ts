import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-side-menu",
  templateUrl: "./side-menu.component.html",
  styleUrls: ["./side-menu.component.css"],
  imports: [RouterLink, RouterLinkActive],
  standalone: true,
})
export class SideMenuComponent {}
