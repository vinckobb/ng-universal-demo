import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from "@angular/http";
import {ComponentRoute} from "@ng/common";
import {DataService} from "../../services/api/data/data.service";

@Component(
{
    selector: 'home-view',
    template: `
    <h3>{{subs}}</h3>
    <div><button (click)="inc()">click</button></div>
    <div>{{counter}}</div>`,
    providers: [DataService]
})
@ComponentRoute({path: ''})
export class HomeComponent implements OnInit
{
    public subs: string;
    public counter = 0;

    constructor(private dataSvc: DataService)
    {
    }

    public async ngOnInit()
    {
        this.subs = await this.dataSvc.getData().map(data =>
        {
            return `${data.greeting} ${data.name}`;
        }).toPromise();
    }

    public inc()
    {
        this.counter++;
    }
}
