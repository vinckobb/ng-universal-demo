import { Component, OnInit } from '@angular/core';
import { TransferHttp } from '../../modules/transfer-http/transfer-http';
import { Observable } from 'rxjs/Observable';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
	selector: 'home-view',
	template: `<div [@flyIn]><h3>{{subs | async}}</h3></div>`,
  animations: 
  [
    trigger('flyIn',
    [
        transition('void => *',
        [
            style(
            {
                opacity: 0,
                transform: "translateX(-20%)"
            }),
            animate('400ms ease-in', style(
            {
                opacity: 1,
                transform: 'translateX(0)'
            }))
        ])
    ])
  ]
})
export class HomeView implements OnInit {
  public subs: Observable<string>;

  constructor(private http: TransferHttp) {}

  ngOnInit() {
    this.subs = this.http.get('http://localhost:8000/data').map(data => {
      return `${data.greeting} ${data.name}`;
    });
  }
}
