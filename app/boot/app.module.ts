import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../pages/app.component';
import { HomeView } from '../pages/home/home-view.component';


@NgModule({
	imports: [
    BrowserModule.withServerTransition({
      appId: 'my-app-id'
    }),
    CommonModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: HomeView, pathMatch: 'full'},
      { path: 'lazy', loadChildren: '../pages/+lazy/lazy.module#LazyModule'}
    ])
	],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/'}
  ],
	declarations: [ AppComponent, HomeView ],
  exports: [ AppComponent ]
})
export class AppModule {}
