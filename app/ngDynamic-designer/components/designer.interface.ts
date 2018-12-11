import {InjectionToken} from "@angular/core";

/**
 * Available modes of designer
 */
export enum DesignerMode
{
    LAYOUT = 'LAYOUT',
    NODE = 'NODE',
    CODE = 'CODE'
}

/**
 * Injection token used for obtaining package names available in designer
 */
export const DESIGNER_PACKAGE_NAMES: InjectionToken<string[]> = new InjectionToken<string[]>('DESIGNER_PACKAGE_NAMES', {providedIn: 'root', factory: () => ['layout', 'basic', 'advanced']});

/**
 * Represents remote designer state
 */
export interface RemoteDesignerState
{
    /**
     * Metadata used for rendering this dynamic content
     */
    metadata?:
    {
        layout?: string;
        relations?: string;
    };

    /**
     * Metadata for designer for recreation current state
     */
    designerMetadata?:
    {
        nodeDesignerMetadata?: string;
    };
}