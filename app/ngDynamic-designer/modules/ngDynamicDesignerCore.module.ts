import {NgModule} from "@angular/core";

import {DesignerComponentRendererDirective, DroppableDirective} from "../directives";
import {DesignerComponentHeaderComponent} from "../components";

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
        DroppableDirective,
        DesignerComponentHeaderComponent
    ],
    exports:
    [
        DesignerComponentRendererDirective,
        DroppableDirective,
        DesignerComponentHeaderComponent
    ]
})
export class NgDynamicDesignerModuleCore
{
}