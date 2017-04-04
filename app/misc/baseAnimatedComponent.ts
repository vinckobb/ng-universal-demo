import { HostBinding, HostListener, Injectable } from '@angular/core';
import {AnimationEvent} from '@angular/animations';

/**
 * Base class that enables fly in out animation
 */
@Injectable()
export class BaseAnimatedComponent
{
    //######################### public properties - bindings #########################

    /**
     * Attach animation directly to component (enter, exit)
     */
    @HostBinding('@flyInOut') 
    public animatedComponent = true;
}