import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {SimpleComponent} from "../component";

/**
 * Module for simple component showcase
 */
@NgModule(
{
    imports:
    [
        CommonModule
    ],
    declarations: 
    [
        SimpleComponent
    ],
    entryComponents: 
    [
        SimpleComponent
    ]
})
export class SimpleModule
{
}