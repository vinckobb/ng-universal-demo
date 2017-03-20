import {Injectable} from '@angular/core';
import {ReportingExceptionHandlerService} from '@ng/error-handling';

/**
 * Service that is used for logging client errors
 */
@Injectable()
export class LoggingService extends ReportingExceptionHandlerService
{
    //######################### constructor #########################
    constructor()
    {
        super();
    }
    
    //######################### public methods - overriden ReportingExceptionHandlerService #########################
    
    /**
     * Sends report to server for loging purposes
     * @param  {string} exceptionMessage Message of occured exception
     * @param  {string} exceptionStackTrace Stack trace to occured exception
     * @param  {string} pageHtml Html of captured page state in time of exception
     * @param  {string} pageScreenShotBase64 Screenshot of captured page in time of exception as of base64 string
     */
    sendReport(exceptionMessage: string, exceptionStackTrace: string, pageHtml: string, pageScreenShotBase64: string): void
    {
        //TODO - implement your logging here
    }
}
