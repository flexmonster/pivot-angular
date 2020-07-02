import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HighchartsComponent } from './highcharts/highcharts.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'highcharts', component: HighchartsComponent },
    { path: '**', redirectTo: 'home' }
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