import {HostBinding, HostListener} from '@angular/core';
import {AnimationEvent} from '@angular/animations';

/**
 * Base class that enables fly in out animation
 */
export class BaseAnimatedComponent
{
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