import {Injectable} from '@angular/core';
import {GlobalizationService as GlobalizationServiceInterface} from '@ng/common';

import {Observable} from 'rxjs/Observable';

/**
 * Globalization service that is used for obtaining globalization language
 */
@Injectable()
export class GlobalizationService extends GlobalizationServiceInterface
{
    /**
     * Gets current name of locale, that is used within picker
     */
    public getLocale(): string
    {
        return "sk";
    }
    
    /**
     * Gets observable that emits data when locale changes and change should be applied to picker
     */
    public getLocaleChange(): Observable<string>
    {
        return Observable.empty<string>();
    }
}