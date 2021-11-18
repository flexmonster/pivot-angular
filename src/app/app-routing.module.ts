import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HandlingEventsComponent } from './examples/handling-events/handling-events.component';
import { CustomizingGridComponent } from './examples/customizing-grid/customizing-grid.component';
import { CustomizingToolbarComponent } from './examples/customizing-toolbar/customizing-toolbar.component';
import { PivotTableDemoComponent } from './examples/pivot-table-demo/pivot-table-demo.component';
import { UpdatingDataComponent } from './examples/updating-data/updating-data.component';
import { UsingApiCallsComponent } from './examples/using-api-calls/using-api-calls.component';
import { WithAmchartsComponent } from './examples/with-amcharts/with-amcharts.component';
import { WithHighchartsComponent } from './examples/with-highcharts/with-highcharts.component';

const routes: Routes = [
  { path: 'pivot-table-demo', component: PivotTableDemoComponent },
  { path: 'handling-events', component: HandlingEventsComponent },
  { path: 'using-api-calls', component: UsingApiCallsComponent },
  { path: 'updating-data', component: UpdatingDataComponent },
  { path: 'customizing-toolbar', component: CustomizingToolbarComponent },
  { path: 'customizing-grid', component: CustomizingGridComponent },
  { path: 'with-highcharts', component: WithHighchartsComponent },
  { path: 'with-amcharts', component: WithAmchartsComponent },
  { path: '**', redirectTo: 'pivot-table-demo' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
