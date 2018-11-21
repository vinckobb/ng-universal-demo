import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {designerComponentRoutes, designerComponents} from "../pages";
import {LayoutDesignerComponent} from "../pages/layoutDesigner/layoutDesigner.component";
import {DesignerComponentRendererDirective} from "../directives";
import {NodeDesignerComponent} from "../pages/nodeDesigner/nodeDesigner.component";
import {CommonModule} from "@angular/common";

/**
 * Module for ng dynamic designer 
 */
@NgModule(
{
    imports:
    [
        CommonModule,
        RouterModule.forChild(designerComponentRoutes)
    ],
    declarations: 
    [
        designerComponents,
        LayoutDesignerComponent,
        NodeDesignerComponent,
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