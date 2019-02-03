import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BootstrapModule} from '@ng/bootstrap';
import {GridModule} from '@ng/grid';
import {CommonModule as NgCommonModule} from '@ng/common';
import {NotificationsModule} from '@ng/notifications';
import {InternalServerErrorModule, ServerValidationsModule} from '@ng/error-handling';
import {AuthorizationModule} from '@ng/authentication';
import {FancyTreeModule} from '@ng/treeview';
import {NgSelectModule} from '@ng/select';
import {TranslateModule} from '@ngx-translate/core';
import {TimelineComponent} from '../components/timeline/timeline.component';
import {TimelineItemComponent} from '../components/timeline/timelineItem.component';
import {LiekTimelineComponent} from '../components/timeline/items/liekTimeline.component';
import {NavstevaTimelineComponent} from '../components/timeline/items/navstevaTimeline.component';

/**
 * Common module for all other modules
 */
@NgModule(
{
    // declarations: [NavigationComponent],
    imports: [
        CommonModule
    ],
    declarations: [TimelineComponent, TimelineItemComponent, LiekTimelineComponent, NavstevaTimelineComponent],
    exports:
    [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgCommonModule,
        TranslateModule,
        NotificationsModule,
        GridModule,
        AuthorizationModule,
        FancyTreeModule,
        NgSelectModule,
        InternalServerErrorModule,
        ServerValidationsModule,
        BootstrapModule,
        TimelineComponent,
        TimelineItemComponent
    ],
    entryComponents: [LiekTimelineComponent, NavstevaTimelineComponent]
})
export class CommonSharedModule
{
}