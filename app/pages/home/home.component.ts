import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from "@angular/http";
import {ComponentRoute} from "@ng/common";
import {DataService} from "../../services/api/data/data.service";

/**
 * Home component
 */
@Component(
{
    selector: 'home-view',
    templateUrl: 'home.component.html',
    providers: [DataService]
})
@ComponentRoute({path: ''})
export class HomeComponent implements OnInit
{
    //######################### public properties #########################
    public subs: string;
    public counter = 0;

    //######################### constructor #########################
    constructor(private dataSvc: DataService)
    {
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

    public inc()
    {
        this.counter++;
    }
}
