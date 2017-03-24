import {Provider, ValueProvider} from "@angular/core";
import {SERVER_BASE_URL} from '@ng/common';

/**
 * Additional data passed for with request to render server
 */
export interface AdditionalData
{
    /**
     * Base url of running server
     */
    baseUrl: string;
}

/**
 * Gets additional providers
 * @param additionalData Additional data
 */
export function getAdditionalProviders(additionalData: AdditionalData): Provider[]
{
    return [
        <ValueProvider>
        {
            provide: SERVER_BASE_URL,
            useValue: additionalData.baseUrl
        }
    ];
}