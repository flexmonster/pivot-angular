import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { FlexmonsterPivotModule } from 'ng-flexmonster';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MatTabsModule, FlexmonsterPivotModule
  ],
  exports: [MatTabsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
