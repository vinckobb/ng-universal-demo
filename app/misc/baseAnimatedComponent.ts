import {AnimationEvent} from '@angular/animations';
import {HostBinding, HostListener} from '@angular/core';

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
    
    /**
     * Called when animation has completed
     */
    @HostListener('@flyInOut.done', ['$event'])
    public animationDone(event: AnimationEvent)
    {
        this._animationDone(event);
    }

    //######################### protected methods #########################
    
    /**
     * Called when animation has finished its duration
     * @param {AnimationEvent} event Event of finished animation
     */
    protected _animationDone(event: AnimationEvent)
    {
    }
}