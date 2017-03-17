import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from "@angular/http";
import {ComponentRoute} from "@ng/common";

@Component(
{
    selector: 'home-view',
    template: `
    <h3>{{subs | async}}</h3>
    <div><button (click)="inc()">click</button></div>
    <div>{{counter}}</div>`
})
@ComponentRoute({path: ''})
export class HomeView implements OnInit 
{
    public subs: Observable<string>;
    public counter = 0;

    constructor(private http: Http) 
    {
    }

    ngOnInit() 
    {
        this.subs = this.http.get('http://localhost:8888/data').map(itm => itm.json()).map(data => 
        {
            return `${data.greeting} ${data.name}`;
        });
    }

    public inc()
    {
        this.counter++;
    }
}
