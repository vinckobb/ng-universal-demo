import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from "@angular/http";

@Component({
	selector: 'home-view',
	template: `<h3>{{subs | async}}</h3>`
})
export class HomeView implements OnInit {
  public subs: Observable<string>;

  constructor(private http: Http) {}

  ngOnInit() {
    this.subs = this.http.get('http://localhost:8888/data').map(itm => itm.json()).map(data => {
      return `${data.greeting} ${data.name}`;
    });
  }
}
