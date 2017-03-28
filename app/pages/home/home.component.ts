import {Component, OnInit, HostBinding, HostListener} from '@angular/core';
import {AnimationEvent} from '@angular/animations';
import {ComponentRoute} from "@ng/common";
import {FlyInOutAnimation} from '@ng/animations';
import {DataService} from "../../services/api/data/data.service";
import {BaseAnimatedComponent} from "app/misc/baseAnimatedComponent";

/**
 * Home component
 */
@Component(
{
    selector: 'home-view',
    templateUrl: 'home.component.html',
    providers: [DataService],
    animations: [FlyInOutAnimation]
})
@ComponentRoute({path: ''})
export class HomeComponent extends BaseAnimatedComponent implements OnInit
{
    //######################### public properties #########################
    public subs: string;
    public counter = 0;

    //######################### constructor #########################
    constructor(private dataSvc: DataService)
    {
        super();
    }

    //######################### public methods #########################
    public ngOnInit()
    {
        this.dataSvc.getData().map(data =>
        {
            return `${data.greeting} ${data.name}`;
        }).subscribe(data =>
        {
            this.subs = data;
        });
    }

    public inc()
    {
        this.counter++;
    }
}
