import {NgModule, Component} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SamplesComponent} from "./samples.component";
import {sampleComponentRoutes, sampleComponents} from './samples.component.routes';
import {CommonSharedModule} from "../../boot/commonShared.module";

@NgModule(
{
    declarations: [SamplesComponent, ...sampleComponents],
    imports: 
    [
        CommonSharedModule,
        RouterModule.forChild([{path: '', component: SamplesComponent, children: sampleComponentRoutes}])
    ]
})
export class SamplesModule 
{
}
