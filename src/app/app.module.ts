import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpModule, XHRBackend, RequestOptions, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeView } from './home/home-view.component';
import { TransferHttpModule } from '../modules/transfer-http/transfer-http.module';
import { InterceptableHttp } from "./customHttp";


export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions)
{
    console.log("backend", backend, "options", defaultOptions);
    return new InterceptableHttp(backend, defaultOptions);
}

@NgModule({
	imports: [
    CommonModule,
    HttpModule,
    TransferHttpModule,
    RouterModule.forRoot([
      { path: '', component: HomeView, pathMatch: 'full'},
      { path: 'lazy', loadChildren: './+lazy/lazy.module#LazyModule'}
    ])
	],
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    },
    { provide: APP_BASE_HREF, useValue: '/'}
  ],
	declarations: [ AppComponent, HomeView ],
  exports: [ AppComponent ]
})
export class AppModule {}
