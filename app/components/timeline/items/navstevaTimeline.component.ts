import {Component, ChangeDetectionStrategy, Input, ChangeDetectorRef} from "@angular/core";
import {slideInOutTrigger} from "@ng/animations";

import {TimelineItem} from "../timeline.interface";

@Component(
    {
        selector: 'navsteva-timeline-item',
        templateUrl: 'navstevaTimeline.component.html',
        animations: [slideInOutTrigger],
        providers: [],
        changeDetection: ChangeDetectionStrategy.OnPush
    }
)
export class NavstevaTimelineComponent
{
    @Input()
    public data: TimelineItem;

    public contentVisible: boolean = false;

    constructor(private _changeDetector: ChangeDetectorRef)
    {
    }

    public toggleContent()
    {
        this.contentVisible = !this.contentVisible;

        this._changeDetector.detectChanges();
    }
}