import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {ComponentRoute, NgComponentOutletEx} from "@ng/common";
import {BasicPagingComponent, PagingAbstractComponent} from '@ng/grid';
import {FlyInOutAnimation} from '@ng/animations';
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
    animations: [FlyInOutAnimation]
})
@ComponentRoute({path: ''})
export class HomeComponent extends BaseAnimatedComponent implements OnInit, AfterViewInit
{
    //######################### public properties #########################
    public subs: string;
    public pagingVisible: boolean = false;
    public counter = 0;
    public paging = BasicPagingComponent;

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
        this.counter++;
    }
}
