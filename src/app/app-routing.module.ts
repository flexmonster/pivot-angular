import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PivoTableDemoComponent } from './examples/pivo-table-demo/pivo-table-demo.component';
import { CallingEventsComponent } from './examples/calling-events/calling-events.component';
import { UsingApiCallsComponent } from './examples/using-api-calls/using-api-calls.component';
import { UpdatingDataComponent } from './examples/updating-data/updating-data.component';
import { CustomizingToolbarComponent } from './examples/customizing-toolbar/customizing-toolbar.component';
import { CustomizingGridComponent } from './examples/customizing-grid/customizing-grid.component';
import { WithHighchartsComponent } from './examples/with-highcharts/with-highcharts.component';

const appRoutes: Routes = [
    { path: 'pivot-table-demo', component: PivoTableDemoComponent },
    { path: 'calling-events', component: CallingEventsComponent },
    { path: 'using-api-calls', component: UsingApiCallsComponent },
    { path: 'updating-data', component: UpdatingDataComponent },
    { path: 'customizing-toolbar', component: CustomizingToolbarComponent },
    { path: 'customizing-grid', component: CustomizingGridComponent },
    { path: 'with-highcharts', component: WithHighchartsComponent },
    { path: '**', redirectTo: 'pivot-table-demo' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }