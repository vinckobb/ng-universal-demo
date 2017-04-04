import {Component, HostBinding} from '@angular/core';
import { BaseAnimatedComponent } from "app/misc/baseAnimatedComponent";
import { FlyInOutAnimation } from "app/misc/animations";

/**
 * Component used for displaying access denied page
 */
@Component(
{
    templateUrl: "accessDenied.component.html",
    animations: [FlyInOutAnimation]
})
export class AccessDeniedComponent extends BaseAnimatedComponent
{
public static ngRoutes = [{path:'accessDenied', component: AccessDeniedComponent}];
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
}