import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {ComponentRoute, NgComponentOutletEx} from "@ng/common";
import {BasicPagingComponent, PagingAbstractComponent} from '@ng/grid';
import {FlyInOutAnimation} from '@ng/animations';
import {Authorize, AuthGuard} from '@ng/authentication';
import {DataService} from "../../services/api/data/data.service";
import {BaseAnimatedComponent} from "../../misc/baseAnimatedComponent";
import {trigger, animate, style, query, transition, group, state, animateChild} from '@angular/animations';

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
        FlyInOutAnimation,
        trigger("test",
        [
            transition("* => *",
            [
                group(
                [
                    query("@test>div",
                    [
                        style({'font-weight': 'bold', 'font-size': '0'}),
                        animate(700, style({'background-color': "#FF00FF", 'font-size': '*'}))
                    ], {optional: true}),
                    animate(500, style({'background-color': "#00FFFF"}))
                ]),
                query('@test2', 
                [
                    animateChild(),
                ]),
                animate(500, style({'background-color': "#F0F0FF"}))
            ])
        ]),
        trigger("test2",
        [
            transition("* => *",
            [
                animate(1500, style({'background-color': "#FFFF00"}))
            ])
        ]),
    ]
})
@ComponentRoute({path: '', canActivate: [AuthGuard]})
@Authorize("home-page")
export class HomeComponent extends BaseAnimatedComponent implements OnInit, AfterViewInit
{
    //######################### public properties #########################
    public subs: string;
    public pagingVisible: boolean = false;
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
}
