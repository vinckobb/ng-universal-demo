import {NgModule, Component} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CommonSharedModule} from "../../boot/commonShared.module";
import {TypeaheadTagsSourceDirective, TypeaheadSourceDirective} from "../../components/directives/taSources";
import {FilterComponent} from './filter.component';
import {filterComponents, filterComponentRoutes} from './filter.component.routes';

@NgModule(
{
    declarations: [FilterComponent, ...filterComponents],
    imports: 
    [
        CommonSharedModule,
        RouterModule.forChild([{path: '', component: FilterComponent, children: filterComponentRoutes}])
    ]
})
export class FilterModule 
{
}
