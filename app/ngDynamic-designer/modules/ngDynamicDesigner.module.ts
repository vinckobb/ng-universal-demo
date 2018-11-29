import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {CdkTreeModule} from "@angular/cdk/tree";

import {LayoutDesignerComponent, NodeDesignerModeComponent, designerComponentRoutes, designerComponents, PropertiesComponent, ComponentPaletteComponent, ComponentPaletteItemComponent, NodeDesignerComponent, NodeComponentPaletteComponent, LayoutDesignerTreeComponent, PropertyComponent} from "../components";
import {DesignerComponentRendererDirective} from "../directives";

/**
 * Module for ng dynamic designer 
 */
@NgModule(
{
    imports:
    [
        CommonModule,
        ReactiveFormsModule,
        DragDropModule,
        CdkTreeModule,
        RouterModule.forChild(designerComponentRoutes)
    ],
    declarations: 
    [
        designerComponents,
        LayoutDesignerComponent,
        LayoutDesignerTreeComponent,
        ComponentPaletteComponent,
        ComponentPaletteItemComponent,
        NodeDesignerModeComponent,
        PropertiesComponent,
        PropertyComponent,
        NodeDesignerComponent,
        NodeComponentPaletteComponent,
        DesignerComponentRendererDirective
    ],
    exports:
    [
        DesignerComponentRendererDirective,
        DragDropModule
    ]
})
export class NgDynamicDesignerModule
{
}