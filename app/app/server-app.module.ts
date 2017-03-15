import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    ServerModule,
    AppModule
  ]
})
export class ServerAppModule {

  constructor() { }

  // Gotcha
  // ngOnBootstrap = () => {
  //   this.transferState.inject();
  // }
}
