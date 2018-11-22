import {Injectable} from "@angular/core";
import {Subject, Observable} from "rxjs";

import {LayoutMetadata} from "../../interfaces";

/**
 * Options service used for communication with options (properties) window
 */
@Injectable()
export class OptionsService
{
    //######################### private fields #########################

    /**
     * Subject for emitting when new properties should be loaded in options component
     */
    private _loadPropertiesSubject: Subject<LayoutMetadata> = new Subject<LayoutMetadata>();

    //######################### public properties #########################

    /**
     * Occurs when new properties should be loaded into options component
     */
    public get loadProperties(): Observable<LayoutMetadata>
    {
        return this._loadPropertiesSubject.asObservable();
    }

    //######################### public methods #########################

    /**
     * Shows properties by metadata in options component
     * @param layoutMetadata Metadata that should be loaded into options component
     */
    public showProperties(layoutMetadata: LayoutMetadata)
    {
        this._loadPropertiesSubject.next(layoutMetadata);
    }
}