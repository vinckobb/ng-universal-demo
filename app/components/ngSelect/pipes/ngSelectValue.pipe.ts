import {Pipe, PipeTransform} from '@angular/core';
import {isBlank} from '@ng/common';

/**
 * Pipe to transform ng select value
 */
@Pipe({name: 'ngSelectValue'})
export class NgSelectValuePipe implements PipeTransform
{
    //######################### public methods #########################
    
    /**
     * Transforms selected value into string
     * @param {any} value Value to be transformed
     * @param {(any) => string} valueSelector Function that performs transform
     * @param {string} nothingSelectedText Text displayed if nothing is selected
     */   
    public transform(value: any, valueSelector: (any) => string, nothingSelectedText: string): string
    {
        if(isBlank(value) || value === "")
        {
            return nothingSelectedText;
        }

        if(Array.isArray(value))
        {
            return value.map(valueSelector).join(', ');
        }

        return valueSelector(value);
    }
}

