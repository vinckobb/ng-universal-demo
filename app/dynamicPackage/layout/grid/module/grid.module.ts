import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {GridComponent} from "../component";
import {NgDynamicCoreModule} from "../../../../ngDynamic-core";

/**
 * Module for grid layout component
 */
@NgModule(
{
    imports:
    [
        CommonModule,
        NgDynamicCoreModule
    ],
    declarations: 
    [
        GridComponent
    ],
    entryComponents: 
    [
        GridComponent
    ]
})
export class GridModule
{
}