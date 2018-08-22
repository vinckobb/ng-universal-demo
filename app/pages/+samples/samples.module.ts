import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {sampleComponentRoutes, sampleComponents} from './samples.component.routes';
import {CommonSharedModule} from "../../boot/commonShared.module";
import {TypeaheadTagsSourceDirective, TypeaheadSourceDirective} from "../../components/directives/taSources";

@NgModule(
{
    declarations: [TypeaheadSourceDirective, TypeaheadTagsSourceDirective, ...sampleComponents],
    imports:
    [
        CommonSharedModule,
        RouterModule.forChild(sampleComponentRoutes)
    ]
})
export class SamplesModule
{
}
