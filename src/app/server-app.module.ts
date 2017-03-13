import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ServerTransferStateModule } from '../modules/transfer-state/server-transfer-state.module';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { TransferState } from '../modules/transfer-state/transfer-state';
import { BrowserModule } from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'my-app-id'
    }),
    ServerModule,
    ServerTransferStateModule,
    AppModule,
    NoopAnimationsModule
  ]
})
export class ServerAppModule {

  constructor(private transferState: TransferState) { }

  // Gotcha
  ngOnBootstrap = () => {
    this.transferState.inject();
  }
}
