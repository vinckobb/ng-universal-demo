import {Component} from '@angular/core';
import {ComponentRoute, NgComponentOutletEx} from "@ng/common";
import {Authorize, AuthGuard} from '@ng/authentication';
import {trigger, animate, style, query, transition, group, state} from '@angular/animations';

/**
 * Home component
 */
@Component(
{
    selector: 'home-view',
    templateUrl: 'home.component.html',
    animations: 
    [
        trigger("test",
        [
            transition("* => *",
            [
                style({'background-color': "*"}),
                animate(1500, style({'background-color': "#00FFFF"}))
            ])
        ])
    ]
})
@ComponentRoute({path: ''})
export class HomeComponent
{
    //######################### public properties #########################
    public counter = 0;

    public trigger = "in";

    //######################### public methods - implementation of AfterViewInit #########################
    
    public inc()
    {
        this.trigger = this.trigger == 'in' ? 'out' : 'in';
        this.counter++;
    }
}
