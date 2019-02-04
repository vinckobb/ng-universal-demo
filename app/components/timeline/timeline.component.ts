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
            icon: 'fa fa-medkit',
            color: '#ef4f9a',
            title: 'Title 1',
            text: 'Text 1',
            data:
            {
                title: 'Opakovaný recept platný do 31.12.2018',
                liekNazov: 'Ventolin Inhaler N',
                doplatok: 0
            }
        },
        {
            type: NavstevaTimelineComponent,
            icon: 'fa fa-user-md',
            color: '#f4d522',
            title: 'Title 2',
            text: 'Text 2',
            data:
            {
                title: 'Hodnotenie návštevy u lekára',
                meno: 'MUDr. Ján Múdry',
                nazov: 'VŠEOBECNÉ LEKÁRSTVO'
            }
        }
    ];

    public ngOnInit()
    {

    }
}