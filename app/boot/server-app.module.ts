import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';
//import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ServerTransferStateRestModule, TransferStateService} from '@ng/rest';
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
        console.log("injecting");
        this.transferState.inject();
    }
}
