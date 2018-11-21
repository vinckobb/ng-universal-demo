import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {designerComponentRoutes, designerComponents} from "../pages";
import {DesignerComponentRendererDirective} from "../directives";

/**
 * Module for ng dynamic designer 
 */
@NgModule(
{
    imports:
    [
        RouterModule.forChild(designerComponentRoutes)
    ],
    declarations: 
    [
        designerComponents,
        DesignerComponentRendererDirective
    ],
    exports:
    [
        DesignerComponentRendererDirective
    ]
})
export class NgDynamicDesignerModule
{
}