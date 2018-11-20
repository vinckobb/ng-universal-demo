import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {designerComponentRoutes, designerComponents} from "../pages";

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
        designerComponents
    ],
    exports:
    [
    ]
})
export class NgDynamicDesignerModule
{
}