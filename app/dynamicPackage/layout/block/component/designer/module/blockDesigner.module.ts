import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {BlockDesignerComponent} from "../component";
import {NgDynamicCoreModule} from "../../../../../../ngDynamic-core";

/**
 * Module for block designer layout component
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
        BlockDesignerComponent
    ],
    entryComponents: 
    [
        BlockDesignerComponent
    ]
})
export class BlockDesignerModule
{
}