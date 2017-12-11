import {StaticProvider, FactoryProvider, Injector} from "@angular/core";
import {BEFORE_APP_SERIALIZED} from "@angular/platform-server";
import {StatusCodeService} from '@ng/common';
import * as fs from 'fs';

/**
 * Interface describing options for server render
 */
export interface ServerRenderOptions
{
    /**
     * Html document that should be rendered
     */
    document?: string;

    /**
     * Url that is being rendered
     */
    url?: string;

    /**
     * Extra providers
     */
    extraProviders?: StaticProvider[];
}

/**
 * This holds a cached version of each index used.
 */
const templateCache: {[key: string]: string} = {};

/**
 * Get the document at the file path
 */
function getDocument(filePath: string): string
{
    return templateCache[filePath] = templateCache[filePath] || fs.readFileSync(filePath).toString();
}

/**
 * Returns function used for rendering app on server
 * @param getRenderPromise Callback used for promise for rendered app into string
 * @param getProvidersCallback Callback called when trying to build server providers
 * @param extraProviders Extra providers used within mainModule
 */
export function serverRenderFactory<TAdditionalData>(getRenderPromise: (options: ServerRenderOptions) => Promise<string>,
                                                     getProvidersCallback?: (additionalData: TAdditionalData) => StaticProvider[],
                                                     extraProviders?: StaticProvider[]): (index: string, url: string, additionalData: TAdditionalData, callback: (error: string, result?: {html: string, statusCode?: number}) => void) => void
{
    extraProviders = extraProviders || [];
    getProvidersCallback = getProvidersCallback || (() => []);

    /**
     * Renders application
     */
    return function serverRender(indexPath: string, url: string, additionalData: TAdditionalData, callback: (error: string, result?: {html: string, statusCode?: number}) => void): void
    {
        let statusCode: number | null = null;

        try
        {
            extraProviders = extraProviders
                .concat(
                [
                    {
                        provide: StatusCodeService,
                        deps: []
                    },
                    <FactoryProvider>
                    {
                        provide: BEFORE_APP_SERIALIZED,
                        useFactory: (injector: Injector) =>
                        {
                            return () =>
                            {
                                let statusCodeService = injector.get(StatusCodeService);
                                
                                if(statusCodeService)
                                {
                                    statusCode = statusCodeService.statusCode;
                                }
                            };
                        },
                        deps: [Injector],
                        multi: true
                    }
                ])
                .concat(getProvidersCallback(additionalData));

            getRenderPromise({
                                 document: getDocument(indexPath),
                                 url,
                                 extraProviders
                             })
                .catch(rejection =>
                {
                    callback(rejection);
                })
                .then((html: string) =>
                {
                    callback(null,
                             {
                                 html: html,
                                 statusCode: statusCode
                             });
                });

            // if(progressLoader)
            // {
            //     let mainComponent = (moduleRef.injector.get(ApplicationRef) as ApplicationRef).components[0];
            //     let factory = moduleRef.injector.get(RendererFactory2) as RendererFactory2;
            //     let renderer = factory.createRenderer(mainComponent.location.nativeElement,
            //     {
            //         id: 'loaderRenderer',
            //         encapsulation: ViewEncapsulation.None,
            //         styles: [],
            //         data: {}
            //     });

            //     let div = renderer.createElement("div");
            //     let innerDiv = renderer.createElement("div");
            //     renderer.addClass(div, "loading-indicator");
            //     renderer.appendChild(div, innerDiv);
            //     renderer.appendChild(mainComponent.location.nativeElement, div);
            // }
        }
        catch (e)
        {
            callback(e);
        }
    }
}