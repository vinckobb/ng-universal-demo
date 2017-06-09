import {Pipe, PipeTransform} from '@angular/core';

/**
 * Fake translate pipe for tests
 */
@Pipe({name: 'translate'})
export class FakeTranslatePipe implements PipeTransform
{
    //######################### public methods #########################
    
    /**
     * Does nothing with real value
     * @param {string} value Value to be returned
     */   
    public transform(value: string): string
    {
        return value;
    }
}

