import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {TextBlockComponent} from "../component";

/**
 * Module for text block component
 */
@NgModule(
{
    imports:
    [
        CommonModule
    ],
    declarations: 
    [
        TextBlockComponent
    ],
    entryComponents: 
    [
        TextBlockComponent
    ]
})
export class TextBlockModule
{
}