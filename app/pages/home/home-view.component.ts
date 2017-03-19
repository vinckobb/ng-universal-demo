import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from "@angular/http";
import {ComponentRoute} from "@ng/common";
import {DataService} from "../../services/api/data/data.service";

@Component(
{
    selector: 'home-view',
    template: `
    <h3>{{subs | async}}</h3>
    <div><button (click)="inc()">click</button></div>
    <div>{{counter}}</div>`,
    providers: [DataService]
})
@ComponentRoute({path: ''})
export class HomeView implements OnInit 
{
    public subs: Observable<string>;
    public counter = 0;

    constructor(private dataSvc: DataService) 
    {
    }

    ngOnInit() 
    {
        this.subs = this.dataSvc.getData().map(data => 
        {
            return `${data.greeting} ${data.name}`;
        });
    }

    public inc()
    {
        this.counter++;
    }
}
