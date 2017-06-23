import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {trigger, animate, style, query, transition, group, state, animateChild, animation, useAnimation} from '@angular/animations';
import {ComponentRoute, NgComponentOutletEx} from "@ng/common";
import {BasicPagingComponent, PagingAbstractComponent} from '@ng/grid';
import {flyInOutTrigger} from '@ng/animations';
import {Authorize, AuthGuard} from '@ng/authentication';

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
export class HomeComponent extends BaseAnimatedComponent implements OnInit, AfterViewInit
{
    //######################### public properties #########################
    public subs: string;
    public pagingVisible: boolean = false;
    public show: boolean = false;
    public counter = 0;
    public paging = BasicPagingComponent;

    public trigger = "in";

    @ViewChild('pagingComponent')
    public dynamicPaging: NgComponentOutletEx<PagingAbstractComponent>;

    //######################### constructor #########################
    constructor(private dataSvc: DataService)
    {
        super();
    }

    //######################### public methods #########################
    public ngOnInit()
    {
        this.dataSvc.getData().map(data =>
        {
            return `${data.greeting} ${data.name}`;
        }).subscribe(data =>
        {
            this.subs = data;
        });
    }

    //######################### public methods - implementation of AfterViewInit #########################
    
    /**
     * Called when view was initialized
     */
    public ngAfterViewInit()
    {
        if(!this.dynamicPaging)
        {
            return;
        }

        var paging = this.dynamicPaging.component;

        paging.pagingOptions = {itemsPerPageValues: [10, 20]};
        paging.page = 1;
        paging.itemsPerPage = 10;
        paging.totalCount = 16;
        paging.invalidateVisuals();

        paging.pageChange.subscribe(page => console.log('PAGE:', page));
        paging.itemsPerPageChange.subscribe(itemsPerPage => console.log('ITEMS PER PAGE:', itemsPerPage));
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
