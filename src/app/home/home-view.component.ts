import { Component, OnInit } from '@angular/core';
import { TransferHttp } from '../../modules/transfer-http/transfer-http';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from "../baseComponent";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
	selector: 'home-view',
	template: `<div><h3>{{subs}}</h3></div>`,
  animations: 
  [
    trigger('flyInOut',
    [
        transition('void => *', 
        [
            style(
            {
                opacity: 0,
                transform: 'translateX(-20%)'
            }),
            animate('400ms ease-in', style(
            {
                opacity: 1,
                transform: 'translateX(0)'
            }))
        ]),
        transition('* => void', 
        [
            animate('400ms ease-out', style(
            {
                opacity: 0,
                transform: 'translateX(20%)'
            }))
        ])
    ])
  ]
})
export class HomeView extends BaseComponent implements OnInit {
  public subs: string;

  constructor(private http: TransferHttp) 
  {
    super();
    console.log("HTTP Used", http);
  }

  ngOnInit() {
    this.http.get('http://localhost:8000/data').map(data => {
      console.log(data);
      return `${data.greeting} ${data.name}`;
    }).subscribe(data =>
    {
      console.log("async ok", data);
      this.subs = data;
    });
  }
}
