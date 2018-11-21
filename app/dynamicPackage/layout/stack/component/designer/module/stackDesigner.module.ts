import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {StackDesignerComponent} from "../component";
import {NgDynamicCoreModule} from "../../../../../../ngDynamic-core";

/**
 * Module for stack designer layout component
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
        StackDesignerComponent
    ],
    entryComponents: 
    [
        StackDesignerComponent
    ]
})
export class StackDesignerModule
{
}