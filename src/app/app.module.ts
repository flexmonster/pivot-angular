import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexmonsterPivotModule } from 'ngx-flexmonster';
import { SideMenuComponent } from './common/side-menu/side-menu.component';
import { ToggleButtonComponent } from './common/toggle-button/toggle-button.component';
import { ToggleSwitchComponent } from './common/toggle-switch/toggle-switch.component';
import { TopMenuComponent } from './common/top-menu/top-menu.component';
import { HandlingEventsComponent } from './examples/handling-events/handling-events.component';
import { CustomizingGridComponent } from './examples/customizing-grid/customizing-grid.component';
import { CustomizingToolbarComponent } from './examples/customizing-toolbar/customizing-toolbar.component';
import { UpdatingDataComponent } from './examples/updating-data/updating-data.component';
import { UsingApiCallsComponent } from './examples/using-api-calls/using-api-calls.component';
import { WithAmcharts4Component } from './examples/with-amcharts4/with-amcharts4.component';
import { WithAmchartsComponent } from './examples/with-amcharts/with-amcharts.component';
import { WithHighchartsComponent } from './examples/with-highcharts/with-highcharts.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    SideMenuComponent,
    HandlingEventsComponent,
    UsingApiCallsComponent,
    UpdatingDataComponent,
    CustomizingToolbarComponent,
    CustomizingGridComponent,
    WithHighchartsComponent,
    WithAmcharts4Component,
    WithAmchartsComponent,
    ToggleButtonComponent,
    ToggleSwitchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexmonsterPivotModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
