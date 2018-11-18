import {Component, OnInit, ViewChild, Injector, ValueProvider, StaticProvider} from '@angular/core';
import {trigger, animate, style, query, transition, group} from '@angular/animations';
import {FormBuilder, FormControl} from '@angular/forms';
import {ComponentRoute} from "@ng/common";
import {flyInOutTrigger, slideInOutTriggerFactory} from '@ng/animations';
import {Authorize, AuthGuard} from '@ng/authentication';
import {FancyTreeNodeData, FancyTreeComponent} from '@ng/treeview';
import {GetOptionsCallback, OptionComponent} from '@ng/select';
import {map} from 'rxjs/operators';

import {DataService} from "../../services/api/data/data.service";
import {BaseAnimatedComponent} from "../../misc/baseAnimatedComponent";
import {DynamicComponentMetadataGeneric, ComponentRelationManager, ComponentManager, DYNAMIC_RELATIONS_METADATA, DynamicComponentRelationMetadata, RestClientNodeOptions, RestClientMethodType, RestClientParamType} from '../../ngDynamic-core';
import {StackComponentOptions, ConditionalComponentOptions} from '../../dynamicPackage/layout';

/**
 * Home component
 */
@Component(
{
    selector: 'home-view',
    templateUrl: 'home.component.html',
    providers: [DataService],
    animations:
    [
        slideInOutTriggerFactory({inParams: {heightDuration: '150ms', opacityDuration: '350ms'}, outParams: {heightDuration: '150ms 150ms', opacityDuration: '250ms'}}),
        flyInOutTrigger,
        trigger("test",
        [
            transition("* => *",
            [
                group(
                [
                    query("*:enter",
                    [
                        style({opacity: 0, position: 'absolute', transform: 'translateX(30%)'}),
                        animate(400, style({opacity: 1, transform: 'translateX(0)'}))
                    ], {optional: true}),
                    query("*:leave",
                    [
                        style({opacity: 1, position: 'absolute', transform: 'translateX(0)'}),
                        animate(400, style({opacity: 0, transform: 'translateX(-30%)'}))
                    ], {optional: true})
                ]),
            ])
        ])
    ]
})
@ComponentRoute({path: '', canActivate: [AuthGuard], data: {animation: 'home-view'}})
@Authorize("home-page")
export class HomeComponent extends BaseAnimatedComponent implements OnInit
{
    //######################### public properties #########################
    public subs: string;
    public show: boolean = false;
    public counter = 0;

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
                }
            ]
        },
        componentPackage: 'layout',
        componentName: 'stack'
    };

    public customInjector: Injector;

    public treeOptions: Fancytree.FancytreeOptions =
    {
        icon: (val, val2: Fancytree.EventData) =>
        {
            return !val2.node.isFolder() ? 'fa fa-file text-info' : 'fa fa-folder text-warning';
        },
        debugLevel: 0
    };

    public treeData: FancyTreeNodeData[] =
    [
        {
            content: 'uzol 1'
        },
        {
            content: 'uzol 2',
            folder: true,
            extraClasses: 'italic',
            key: 'zzz',
            expanded: true,
            children:
            [
                {
                    content: 'uzol 2.1'
                },
                {
                    content: 'uzol 2.2',
                    children:
                    [
                        {
                            content: 'uzol 2.2.1',
                            extraClasses: 'bold'
                        }
                    ]
                }
            ]
        }
    ]

    public trigger = "in";

    public ngSelect: FormControl;

    public optionsGetter: GetOptionsCallback<string> = (query: string, options: Array<OptionComponent<string>>) =>
    {
        return Promise.resolve(options.filter(itm => itm.text.indexOf(query) >= 0));
    }

    @ViewChild('treeview')
    public tree: FancyTreeComponent;

    //######################### constructor #########################
    constructor(private dataSvc: DataService,
                formBuilder: FormBuilder,
                injector: Injector)
    {
        super();

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

        this.ngSelect = formBuilder.control('third');
    }

    //######################### public methods #########################
    public ngOnInit()
    {
        this.dataSvc.getData().pipe(map(data =>
        {
            return `${data.greeting} ${data.name}`;
        })).subscribe(data =>
        {
            this.subs = data;
        });
    }

    public longCall()
    {
        this.dataSvc.longCall().subscribe(() => console.log('done'));
    }

    public continue()
    {
        this.dataSvc.continue().subscribe(() => console.log('done'));
    }

    //######################### public methods - implementation of AfterViewInit #########################

    /**
     * Called when view was initialized
     */
    public ngAfterViewChecked()
    {
        this.tree.invalidateVisuals();
    }

    public inc()
    {
        this.trigger = this.trigger == 'in' ? 'out' : 'in';
        this.counter++;
    }

    public toggle()
    {
        this.show = !this.show;
    }
}
