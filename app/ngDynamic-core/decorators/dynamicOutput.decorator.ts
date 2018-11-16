import {Subject} from "rxjs";

/**
 * Creates dynamic output for property
 */
export function DynamicOutput(): PropertyDecorator
{
    return function(target: any, propertyKey: string)
    {
        target[`${propertyKey}Change`] = new Subject<void>();

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
                                      this[`${propertyKey}Change`].next();
                                  }
                              });
    };
}