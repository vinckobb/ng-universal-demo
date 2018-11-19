import {Component, ChangeDetectionStrategy, Injector, ValueProvider, StaticProvider} from "@angular/core";

import {DynamicComponentMetadataGeneric, DynamicComponentRelationMetadata} from "../interfaces";
import {StackComponentOptions, ConditionalComponentOptions, GridComponentOptions, BlockComponentOptions} from "../../dynamicPackage/layout";
import {DYNAMIC_RELATIONS_METADATA} from "../tokens";
import {RestClientNodeOptions, RestClientMethodType, RestClientParamType} from "../nodeDefinitions/restClient/restClient.interface";
import {ComponentRelationManager} from "../componentRelationManager";
import {ComponentManager} from "../componentManager";

/**
 * Component used for displaying dynamic content pages
 */
@Component(
{
    selector: 'dynamic-component-page',
    templateUrl: 'dynamicComponentPage.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicComponentPageComponent
{
    //######################### public properties - template bindings #########################

    /**
     * Metadata that are used for rendering layout of dynamic content
     */
    public metadata: DynamicComponentMetadataGeneric<StackComponentOptions> =
    {
        id: 'first-stack',
        options:
        {
            padding:
            {
                top: 10
            },
            children:
            [
                <DynamicComponentMetadataGeneric<StackComponentOptions>>
                {
                    id: 'nested-stack',
                    options:
                    {
                        inline: true,
                        margin:
                        {
                            right: 20
                        },
                        children:
                        [
                            <DynamicComponentMetadataGeneric<ConditionalComponentOptions>>
                            {
                                id: 'if-component',
                                options:
                                {
                                    content: <DynamicComponentMetadataGeneric<string>>
                                    {
                                        id: 'simple-nested-1',
                                        options: 'first nested',
                                        componentPackage: 'more',
                                        componentName: 'simple'
                                    }
                                },
                                componentPackage: 'layout',
                                componentName: 'conditional'
                            },
                            <DynamicComponentMetadataGeneric<string>>
                            {
                                id: 'simple-nested-2',
                                options: 'another nested',
                                componentPackage: 'more',
                                componentName: 'simple'
                            }
                        ]
                    },
                    componentPackage: 'layout',
                    componentName: 'stack'
                },
                <DynamicComponentMetadataGeneric<string>>
                {
                    id: 'simple-1',
                    options: 'first simple',
                    componentPackage: 'more',
                    componentName: 'simple'
                },
                <DynamicComponentMetadataGeneric<string>>
                {
                    id: 'simple-2',
                    options: 'another simple',
                    componentPackage: 'more',
                    componentName: 'simple'
                },
                <DynamicComponentMetadataGeneric<GridComponentOptions>>
                {
                    id: 'css-grid',
                    options:
                    {
                        rows: '50px 150px',
                        columns: '80px 1fr 12%',
                        children:
                        [
                            {
                                content: <DynamicComponentMetadataGeneric<BlockComponentOptions>>
                                {
                                    id: 'block-1',
                                    options:
                                    {
                                        content: <DynamicComponentMetadataGeneric<string>>
                                        {
                                            id: 'simple-grid-1',
                                            options: 'first in grid',
                                            componentPackage: 'more',
                                            componentName: 'simple'
                                        },
                                        margin:
                                        {
                                            bottom: 10,
                                            top: 10,
                                            left: 10,
                                            right: 10
                                        },
                                        background: '#FFFF00'
                                    },
                                    componentPackage: 'layout',
                                    componentName: 'block'
                                },
                                area: '2/2/3/4'
                            }
                        ]
                    },
                    componentPackage: 'layout',
                    componentName: 'grid'
                }
            ]
        },
        componentPackage: 'layout',
        componentName: 'stack'
    };

    /**
     * Custom injector used as parent dynamic content rendering
     */
    public customInjector: Injector;

    //######################### constructor #########################
    constructor(injector: Injector)
    {
        this.customInjector = Injector.create(
        {
            parent: injector,
            providers:
            [
                <ValueProvider>
                {
                    provide: DYNAMIC_RELATIONS_METADATA,
                    useValue: <DynamicComponentRelationMetadata[]>
                    [
                        {
                            id: 'simple-1',
                            outputs:
                            [
                                {
                                    outputName: 'simpleOutput',
                                    inputs:
                                    [
                                        {
                                            inputName: 'simpleInput',
                                            id: 'simple-2'
                                        },
                                        {
                                            inputName: 'test',
                                            id: 'simple-rest-1'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'simple-rest-1',
                            nodeType: 'RestClient',
                            nodeOptions: <RestClientNodeOptions>
                            {
                                url: 'api/data',
                                method: RestClientMethodType.GET,
                                parameters:
                                [
                                    {
                                        inputName: 'test',
                                        name: 'search',
                                        type: RestClientParamType.Query
                                    }
                                ]
                            },
                            outputs:
                            [
                                {
                                    outputName: 'result',
                                    inputs:
                                    [
                                        {
                                            inputName: 'observableInput',
                                            id: 'simple-2'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'simple-2',
                            outputs:
                            [
                                {
                                    outputName: 'simpleOutput',
                                    inputs:
                                    [
                                        {
                                            inputName: 'simpleInput',
                                            id: 'simple-1'
                                        }
                                    ]
                                },
                                {
                                    outputName: 'condition',
                                    inputs:
                                    [
                                        {
                                            inputName: 'input',
                                            id: 'negate-toggle'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'negate-toggle',
                            nodeType: 'Negate',
                            outputs:
                            [
                                {
                                    outputName: 'value',
                                    inputs:
                                    [
                                        {
                                            inputName: 'condition',
                                            id: 'if-component'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'route-data',
                            nodeType: 'ActivatedRoute',
                            outputs:
                            [
                                {
                                    outputName: 'query',
                                    inputs:
                                    [
                                        {
                                            inputName: 'input',
                                            id: 'route-transform'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'route-transform',
                            nodeType: 'Script',
                            outputs:
                            [
                                {
                                    outputName: 'output',
                                    inputs:
                                    [
                                        {
                                            inputName: 'query',
                                            id: 'simple-2'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                <StaticProvider>
                {
                    useClass: ComponentRelationManager,
                    provide: ComponentRelationManager,
                    deps: [DYNAMIC_RELATIONS_METADATA, Injector]
                },
                <StaticProvider>
                {
                    useClass: ComponentManager,
                    provide: ComponentManager,
                    deps: [ComponentRelationManager]
                }
            ]
        });
    }
}