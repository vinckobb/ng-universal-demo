import {EventEmitter} from "@angular/core";

/**
 * Creates dynamic output for property
 */
export function DynamicOutput(): PropertyDecorator
{
    return function(target: any, propertyKey: string)
    {
        target[`${propertyKey}Change`] = new EventEmitter<void>();

        Object.defineProperty(target,
                              propertyKey,
                              {
                                  get: function()
                                  {
                                      return this[`ɵ${propertyKey}`];
                                  },
                                  set: function(value:any)
                                  {
                                      this[`ɵ${propertyKey}`] = value;
                                      this[`${propertyKey}Change`].emit();
                                  }
                              });
    };
}