import {Component} from '@angular/core';
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
                //style({'background-color': "#FFFFFF"}),
                animate(1500, style({'background-color': "#00FFFF"}))
            ])
        ])
    ]
})
export class HomeComponent
{
    public static ngRoutes = [{path:'', component: HomeComponent}];
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
