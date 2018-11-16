import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {IfComponent} from "../component";
import {NgDynamicCoreModule} from "../../../../ngDynamic-core";

/**
 * Module for if layout component
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
        IfComponent
    ],
    entryComponents: 
    [
        IfComponent
    ]
})
export class IfModule
{
}