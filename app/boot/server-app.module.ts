import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';
//import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TransferStateService} from '@ng/rest';
import {ServerTransferStateRestModule} from '@ng/server-stuff';
import {AppComponent} from './app.component';
import {AppModule} from './app.module';

@NgModule(
{
    bootstrap: [AppComponent],
    imports: [ServerModule, AppModule, ServerTransferStateRestModule.forRoot()]
})
export class ServerAppModule 
{
    constructor(private transferState: TransferStateService) 
    {
    }
// Gotcha
    ngOnBootstrap = () => 
    {
        this.transferState.inject();
    }
}
