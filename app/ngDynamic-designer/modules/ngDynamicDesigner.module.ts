import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {LayoutDesignerComponent, NodeDesignerComponent, designerComponentRoutes, designerComponents, OptionsComponent, ComponentPaletteComponent, ComponentPaletteItemComponent} from "../components";
import {DesignerComponentRendererDirective} from "../directives";
import {NodeDesignerComponent as D3NodeDesignerComponent} from "../../customPackage/designer/node/component";

/**
 * Module for ng dynamic designer 
 */
@NgModule(
{
    imports:
    [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(designerComponentRoutes)
    ],
    declarations: 
    [
        designerComponents,
        LayoutDesignerComponent,
        ComponentPaletteComponent,
        ComponentPaletteItemComponent,
        NodeDesignerComponent,
        OptionsComponent,
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