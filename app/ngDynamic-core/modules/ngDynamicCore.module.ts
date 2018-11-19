import {NgModule} from "@angular/core";

import {ComponentRendererDirective} from "../directives";
import {DynamicComponentPageComponent} from "../dynamicComponentPage";

/**
 * Module for ng dynamic core 
 */
@NgModule(
{
    imports:
    [
    ],
    declarations: 
    [
        ComponentRendererDirective,
        DynamicComponentPageComponent
    ],
    exports:
    [
        ComponentRendererDirective
    ]
})
export class NgDynamicCoreModule
{
}