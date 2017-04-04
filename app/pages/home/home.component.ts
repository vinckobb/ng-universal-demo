import {Component, OnInit, HostBinding} from '@angular/core';
import {FlyInOutAnimation} from '@ng/animations';
import {BaseAnimatedComponent} from "app/misc/baseAnimatedComponent";

/**
 * Home component
 */
@Component(
{
    selector: 'home-view',
    templateUrl: 'home.component.html',
    animations: [FlyInOutAnimation]
})
export class HomeComponent extends BaseAnimatedComponent implements OnInit
{
    public static ngRoutes = [{path: '', component: HomeComponent}];
    //######################### public properties #########################
    public subs: string;
    public counter = 0;

    //######################### public properties - bindings #########################

    /**
     * Attach animation directly to component (enter, exit)
     */
    @HostBinding('@flyInOut') 
    public animatedComponent = true;

    /**
     * Class that is assigned for animated component
     */
    @HostBinding('class.fly-in-out')
    public animatedComponentClass = true;

    //######################### constructor #########################
    constructor()
    {
        super();
    }

    //######################### public methods #########################
    public ngOnInit()
    {
        this.subs = 'data';
    }

    public inc()
    {
        this.counter++;
    }
}
