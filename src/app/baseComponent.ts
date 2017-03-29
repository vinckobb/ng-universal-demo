import { HostBinding, Input } from "@angular/core";

export class BaseComponent
{
    /**
     * Attach animation directly to component (enter, exit)
     */
    @Input('@flyInOut') 
    public animatedComponent = true;
}