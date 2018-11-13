import {NgModule} from "@angular/core";

import {ComponentRendererDirective} from "../directives";

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
        ComponentRendererDirective
    ],
    exports:
    [
        ComponentRendererDirective
    ]
})
export class NgDynamicCoreModule
{
}