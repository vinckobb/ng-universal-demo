import {Injectable} from "@angular/core";
import {Subject, Observable} from "rxjs";
import {IDisposable, languages} from "monaco-editor";

import {CodeMetadata} from "../../interfaces";

/**
 * Service used for communication with "Monaco" code editor
 */
@Injectable()
export class CodeService
{
    //######################### private fields #########################

    /**
     * Array of disposables
     */
    private _disposables: IDisposable[] = [];

    /**
     * Subject used for emitting code metadata change
     */
    private _codeChangeSubject: Subject<CodeMetadata> = new Subject<CodeMetadata>();

    //######################### public properties #########################

    /**
     * Occurs when code metadata changes
     */
    public get codeChange(): Observable<CodeMetadata>
    {
        return this._codeChangeSubject.asObservable();
    }

    //######################### public methods #########################

    /**
     * Shows code from metadata in editor
     */
    public showCode(metadata: CodeMetadata)
    {
        this.destroy();

        this._processAdditionalData(metadata);
        this._codeChangeSubject.next(metadata);
    }

    /**
     * Destroys code
     */
    public destroy()
    {
        this._disposables.forEach(disposable => disposable.dispose());
        this._disposables = [];
    }

    //######################### private methods #########################

    /**
     * Process additional data
     * @param metadata Metadata containing additional data to be processed
     */
    private _processAdditionalData(metadata: CodeMetadata)
    {
        if(metadata.language == 'typescript')
        {
            if(metadata.additionalData && Array.isArray(metadata.additionalData))
            {
                metadata.additionalData.forEach(data =>
                {
                    switch(data)
                    {
                        case 'node-transform':
                        {
                            this._disposables.push(languages.typescript.typescriptDefaults.addExtraLib(`
/**
 * Describes simple data transformation
 */
export interface TransformAction
{
    /**
     * Method that transforms value into any requested value
     * @param value Value to be transformed
     */
    transform(value: any): any;
}`, `file:///node_modules/@types/${data}/index.d.ts`));

                            break;
                        }
                    }
                });
            }
        }
    }
}