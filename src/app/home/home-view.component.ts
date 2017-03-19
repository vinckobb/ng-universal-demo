import { Component, OnInit } from '@angular/core';
import { TransferHttp } from '../../modules/transfer-http/transfer-http';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'home-view',
	template: `<div><h3>{{subs}}</h3></div>`
})
export class HomeView implements OnInit {
  public subs: string;

  constructor(private http: TransferHttp) 
  {
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
