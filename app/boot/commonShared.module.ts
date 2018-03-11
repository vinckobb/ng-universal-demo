import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BootstrapModule} from '@ng/bootstrap';
import {GridModule, GridLegacyModule, AdvancedTableBodyContentRendererComponent} from '@ng/grid';
import {CommonModule as NgCommonModule} from '@ng/common';
import {NotificationsModule} from '@ng/notifications';
import {InternalServerErrorModule, ServerValidationsModule} from '@ng/error-handling';
import {AuthorizationModule} from '@ng/authentication';
import {FancyTreeModule} from '@ng/treeview';
import {TranslateModule} from '@ngx-translate/core';
import { FloatTheadDirective } from '../components/directives/floatThead';
import { TestResolver } from '../misc/testResolver';

// import {NavigationComponent} from './components/navigation/navigation.component';

/**
 * Common module for all other modules
 */
@NgModule(
{
    // declarations: [NavigationComponent],
    declarations: [FloatTheadDirective],
    exports:
    [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgCommonModule,
        TranslateModule,
        NotificationsModule,
        GridLegacyModule,
        GridModule,
        AuthorizationModule,
        FancyTreeModule,
        InternalServerErrorModule,
        ServerValidationsModule,
        BootstrapModule,
        FloatTheadDirective
    ],
    providers: [TestResolver]
})
export class CommonSharedModule
{
}