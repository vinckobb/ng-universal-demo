import {NgModule} from "@angular/core";

import {DesignerComponentRendererDirective, DroppableDirective} from "../directives";

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
        DesignerComponentRendererDirective,
        DroppableDirective
    ],
    exports:
    [
        DesignerComponentRendererDirective,
        DroppableDirective
    ]
})
export class NgDynamicDesignerModuleCore
{
}