import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {CdkTreeModule} from "@angular/cdk/tree";

import {LayoutDesignerComponent, NodeDesignerModeComponent, designerComponentRoutes, designerComponents, PropertiesComponent, ComponentPaletteComponent, ComponentPaletteItemComponent, NodeDesignerComponent, NodeComponentPaletteComponent, LayoutDesignerTreeComponent, PropertyComponent, CodeEditorComponent, OnlyVisiblePipe} from "../components";
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
        CodeEditorComponent,
        NodeDesignerComponent,
        NodeComponentPaletteComponent,
        DesignerComponentRendererDirective,
        OnlyVisiblePipe
    ],
    exports:
    [
        DesignerComponentRendererDirective
    ]
})
export class NgDynamicDesignerModule
{
}