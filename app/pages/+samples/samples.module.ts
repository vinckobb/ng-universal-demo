import {NgModule, Component} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SamplesComponent} from "./samples.component";
import {sampleComponentRoutes, sampleComponents} from './samples.component.routes';
import {CommonSharedModule} from "../../boot/commonShared.module";
import {TypeaheadTagsSourceDirective, TypeaheadSourceDirective} from "../../components/directives/taSources";
import { AdvancedTableBodyContentRendererComponent } from '@ng/grid';
import {TableModule} from 'primeng/table';

@NgModule(
{
    declarations: [SamplesComponent, TypeaheadSourceDirective, TypeaheadTagsSourceDirective, ...sampleComponents],
    imports: 
    [
        CommonSharedModule,
        TableModule,
        RouterModule.forChild([{path: '', component: SamplesComponent, children: sampleComponentRoutes, data: {testxxx: 'ahoj kuko'}}])
    ]
})
export class SamplesModule 
{
}
