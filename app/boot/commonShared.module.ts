import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

/**
 * Common module for all other modules
 */
@NgModule(
{
    // declarations: [NavigationComponent],
    exports:
    [
        CommonModule,
        FormsModule,
        RouterModule,
        TranslateModule,
    ]
})
export class CommonSharedModule
{
}