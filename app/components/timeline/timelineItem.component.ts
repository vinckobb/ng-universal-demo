import {Component, ChangeDetectionStrategy, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, ChangeDetectorRef} from "@angular/core";
import {TimelineItem} from "./timeline.interface";

@Component(
    {
        selector: 'timeline-item',
        templateUrl: 'timelineItem.component.html',
        providers: [],
        changeDetection: ChangeDetectionStrategy.OnPush
    }
)
export class TimelineItemComponent
{
    private _data: TimelineItem;

    @ViewChild('content', { read: ViewContainerRef }) _vcr: ViewContainerRef;
    
    @Input()
    public set data(data: TimelineItem)
    {
        this._data = data;

        console.log(this._vcr);
        if (this._vcr)
        {
            this._vcr.clear();
            
            let componentFactory = this._componentFactoryResolver.resolveComponentFactory(this.data.type);

            let componentRef = this._vcr.createComponent(componentFactory, 0);
            (<any>componentRef.instance).data = this.data;

            this._changeDetector.detectChanges();
        }
    }
    public get data(): TimelineItem
    {
        return this._data;
    }

    constructor(private _componentFactoryResolver: ComponentFactoryResolver,
                private _changeDetector: ChangeDetectorRef)
    {
    }
}