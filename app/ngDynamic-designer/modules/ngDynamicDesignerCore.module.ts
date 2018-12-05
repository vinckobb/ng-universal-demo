import {NgModule} from "@angular/core";

import {DesignerComponentRendererDirective} from "../directives";

/**
 * Core module for ng dynamic designer 
 */
@NgModule(
{
    imports:
    [
    ],
    declarations: 
    [
        DesignerComponentRendererDirective
    ],
    exports:
    [
        DesignerComponentRendererDirective
    ]
})
export class NgDynamicDesignerModuleCore
{
}