import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {NodeDesignerComponent} from "../component";

/**
 * Module for node designer component
 */
@NgModule(
{
    imports:
    [
        CommonModule
    ],
    declarations: 
    [
        NodeDesignerComponent
    ],
    entryComponents: 
    [
        NodeDesignerComponent
    ]
})
export class NodeDesignerModule
{
}