import {Provider, NgModuleRef, ApplicationRef} from "@angular/core";
import {renderModule, renderModuleFactory, INITIAL_CONFIG, platformServer, platformDynamicServer, PlatformState} from "@angular/platform-server";
import * as fs from 'fs';

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
 * @param aot Indication that it is aot build
 * @param mainModule Main module to be bootstrapped
 * @param extraProviders Extra providers used within mainModule
 */
export function serverRenderFactory<T>(aot: boolean, mainModule: any, extraProviders?: Provider[]): (index: string, url: string, callback: (error: string, result?: string) => void) => void
{
    extraProviders = extraProviders || [];

    /**
     * Renders application
     */
    return function serverRender(indexPath: string, url: string, callback: (error: string, result?: string) => void)
    {
        try 
        {
            extraProviders = extraProviders.concat(
            [
                {
                    provide: INITIAL_CONFIG,
                    useValue: 
                    {
                        document: getDocument(indexPath),
                        url: url
                    }
                }
            ]);

            const moduleRefPromise = aot ? platformServer(extraProviders).bootstrapModuleFactory(mainModule) : platformDynamicServer(extraProviders).bootstrapModule(mainModule);

            moduleRefPromise.then((moduleRef: NgModuleRef<{}>) => 
            {
                const appRef: ApplicationRef = moduleRef.injector.get(ApplicationRef);

                appRef.isStable
                    .filter((isStable: boolean) => isStable)
                    .first()
                    .subscribe(() => 
                    {
                        const bootstrap = moduleRef.instance['ngOnBootstrap'];
                        bootstrap && bootstrap();

                        callback(null, moduleRef.injector.get(PlatformState).renderToString());
                        moduleRef.destroy();
                    });
            });
        } 
        catch (e) 
        {
            callback(e);
        }
    }
}