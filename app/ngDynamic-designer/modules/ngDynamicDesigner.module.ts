import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {LayoutDesignerComponent, NodeDesignerComponent, designerComponentRoutes, designerComponents} from "../components";
import {DesignerComponentRendererDirective} from "../directives";
import {NodeDesignerComponent as D3NodeDesignerComponent} from "../../customPackage/designer/node/component";
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
        D3NodeDesignerComponent,
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