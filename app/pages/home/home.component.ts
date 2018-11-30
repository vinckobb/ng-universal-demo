import {Component, OnInit, ViewChild} from '@angular/core';
import {trigger, animate, style, query, transition, group} from '@angular/animations';
import {FormBuilder, FormControl} from '@angular/forms';
import {ComponentRoute} from "@ng/common";
import {flyInOutTrigger, slideInOutTriggerFactory} from '@ng/animations';
import {Authorize, AuthGuard} from '@ng/authentication';
import {FancyTreeNodeData, FancyTreeComponent} from '@ng/treeview';
import {GetOptionsCallback, OptionComponent} from '@ng/select';
import {map} from 'rxjs/operators';
import {editor, languages, Uri} from 'monaco-editor';

import {DataService} from "../../services/api/data/data.service";
import {BaseAnimatedComponent} from "../../misc/baseAnimatedComponent";

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

    public codeEditor: editor.IStandaloneCodeEditor;

    public optionsGetter: GetOptionsCallback<string> = (query: string, options: Array<OptionComponent<string>>) =>
    {
        return Promise.resolve(options.filter(itm => itm.text.indexOf(query) >= 0));
    }

    @ViewChild('treeview')
    public tree: FancyTreeComponent;

    //######################### constructor #########################
    constructor(private dataSvc: DataService,
                formBuilder: FormBuilder)
    {
        super();

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
    public ngAfterViewInit()
    {
        let options: languages.typescript.CompilerOptions =
        {
            target: languages.typescript.ScriptTarget.ES5,
            module: languages.typescript.ModuleKind.CommonJS,
            moduleResolution: languages.typescript.ModuleResolutionKind.NodeJs,
            lib: 
            [
                "esnext",
                "dom"
            ],
            allowNonTsExtensions: true,
            typeRoots: ["node_modules/@types"]
        };
        
        languages.typescript.typescriptDefaults.setCompilerOptions(options);
        languages.typescript.typescriptDefaults.addExtraLib(
            `export { Observable } from './internal/Observable';
            export { ConnectableObservable } from './internal/observable/ConnectableObservable';
            export { GroupedObservable } from './internal/operators/groupBy';
            export { Operator } from './internal/Operator';
            export { observable } from './internal/symbol/observable';
            export { Subject } from './internal/Subject';
            export { BehaviorSubject } from './internal/BehaviorSubject';
            export { ReplaySubject } from './internal/ReplaySubject';
            export { AsyncSubject } from './internal/AsyncSubject';
            export { asap as asapScheduler } from './internal/scheduler/asap';
            export { async as asyncScheduler } from './internal/scheduler/async';
            export { queue as queueScheduler } from './internal/scheduler/queue';
            export { animationFrame as animationFrameScheduler } from './internal/scheduler/animationFrame';
            export { VirtualTimeScheduler, VirtualAction } from './internal/scheduler/VirtualTimeScheduler';
            export { Scheduler } from './internal/Scheduler';
            export { Subscription } from './internal/Subscription';
            export { Subscriber } from './internal/Subscriber';
            export { Notification } from './internal/Notification';
            export { pipe } from './internal/util/pipe';
            export { noop } from './internal/util/noop';
            export { identity } from './internal/util/identity';
            export { isObservable } from './internal/util/isObservable';
            export { ArgumentOutOfRangeError } from './internal/util/ArgumentOutOfRangeError';
            export { EmptyError } from './internal/util/EmptyError';
            export { ObjectUnsubscribedError } from './internal/util/ObjectUnsubscribedError';
            export { UnsubscriptionError } from './internal/util/UnsubscriptionError';
            export { TimeoutError } from './internal/util/TimeoutError';
            export { bindCallback } from './internal/observable/bindCallback';
            export { bindNodeCallback } from './internal/observable/bindNodeCallback';
            export { combineLatest } from './internal/observable/combineLatest';
            export { concat } from './internal/observable/concat';
            export { defer } from './internal/observable/defer';
            export { empty } from './internal/observable/empty';
            export { forkJoin } from './internal/observable/forkJoin';
            export { from } from './internal/observable/from';
            export { fromEvent } from './internal/observable/fromEvent';
            export { fromEventPattern } from './internal/observable/fromEventPattern';
            export { generate } from './internal/observable/generate';
            export { iif } from './internal/observable/iif';
            export { interval } from './internal/observable/interval';
            export { merge } from './internal/observable/merge';
            export { never } from './internal/observable/never';
            export { of } from './internal/observable/of';
            export { onErrorResumeNext } from './internal/observable/onErrorResumeNext';
            export { pairs } from './internal/observable/pairs';
            export { race } from './internal/observable/race';
            export { range } from './internal/observable/range';
            export { throwError } from './internal/observable/throwError';
            export { timer } from './internal/observable/timer';
            export { using } from './internal/observable/using';
            export { zip } from './internal/observable/zip';
            export { EMPTY } from './internal/observable/empty';
            export { NEVER } from './internal/observable/never';
            export * from './internal/types';
            export { config } from './internal/config';
            
            export declare function next() : string;
            export * from 'rxjs';`,
            'file:///node_modules/@types/external/index.d.ts');

        languages.typescript.typescriptDefaults.setDiagnosticsOptions(
        {
            noSemanticValidation: false,
            noSyntaxValidation: false
        });


        (self as any).MonacoEnvironment = {
            getWorkerUrl: function (moduleId, label) {
              if (label === 'json') {
                return 'dist/json.worker.js';
              }
              if (label === 'css') {
                return 'dist/css.worker.js';
              }
              if (label === 'html') {
                return 'dist/html.worker.js';
              }
              if (label === 'typescript' || label === 'javascript') {
                return 'dist/ts.worker.js';
              }
              return 'dist/editor.worker.js';
            }
          }

//         let code = `export class TestClass
// {
//     public show()
//     {
//         return 'somarina';
//     }
// }`;

var code = `import * as x from "external"
    const tt : string = x.dnext();`;

        this.codeEditor = editor.create(document.getElementById('mon'), 
        {
            language: 'typescript',
            theme: 'vs-dark',
            model: editor.createModel(code, "typescript", Uri.file("file:///index.ts"))
        }, );
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
        // Monaco.languages.typescript.getTypeScriptWorker()
        //     .then(function(worker) {
        //         worker(model.uri)
        //               .then(function(client) {
        //                     client.getEmitOutput(model.uri.toString().then(function(r) {});
        //               });
        //     });

        languages.typescript.getTypeScriptWorker()
            .then(worker =>
            {
                worker(this.codeEditor.getModel().uri)
                    .then(client =>
                    {
                        client.getEmitOutput(this.codeEditor.getModel().uri.toString())
                            .then(result =>
                            {
                                console.log(result.outputFiles[0].text);
                            });
                    })
            });

        this.show = !this.show;
    }
}
