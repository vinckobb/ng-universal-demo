import {renderModule, renderModuleFactory} from "@angular/platform-server";
import * as fs from 'fs';

/**
 * This holds a cached version of each index used.
 */
const templateCache: { [key: string]: string } = {};

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
 */
export function serverRenderFactory<T>(aot: boolean, mainModule: any): (index: string, url: string, callback: (error: string, result?: string) => void) => void
{
    /**
     * Renders application
     */
    return function serverRender(indexPath: string, url: string, callback: (error: string, result?: string) => void)
    {
        let options =
        {
            document: getDocument(indexPath),
            url: url
        };

        let renderPromise: Promise<string> = aot ? renderModuleFactory(mainModule, options) : renderModule(mainModule, options);

        renderPromise
            .then(string =>
            {
                callback(null, string);
            })
            .catch(error =>
            {
                callback(error);
            });
    }
}