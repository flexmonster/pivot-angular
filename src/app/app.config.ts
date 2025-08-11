import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHighcharts } from "highcharts-angular";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHighcharts()],
};
