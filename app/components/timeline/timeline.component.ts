import {OnInit, ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {TimelineItem} from "./timeline.interface";
import {LiekTimelineComponent} from "./items/liekTimeline.component";
import {NavstevaTimelineComponent} from "./items/navstevaTimeline.component";

@Component(
    {
        selector: 'timeline',
        templateUrl: 'timeline.component.html',
        providers: [],
        changeDetection: ChangeDetectionStrategy.OnPush
    })
export class TimelineComponent implements OnInit
{
    @Input()
    public items: TimelineItem[] = [
        {
            type: LiekTimelineComponent,
            icon: 'fa fa-check',
            title: 'Title 1',
            text: 'Text 1'
        },
        {
            type: NavstevaTimelineComponent,
            icon: 'fa fa-bars',
            title: 'Title 2',
            text: 'Text 2'
        }
    ];

    public ngOnInit()
    {

    }
}