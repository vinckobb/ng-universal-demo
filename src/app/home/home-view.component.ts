import { Component, OnInit, HostListener } from '@angular/core';
import { TransferHttp } from '../../modules/transfer-http/transfer-http';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'home-view',
	template: `<h3>{{subs | async}}</h3>`
})
export class HomeView implements OnInit {
  public subs: Observable<string>;

  @HostListener('window:scroll')
  track() {
    console.log('scroll');
  }

  constructor(private http: TransferHttp) {}

  ngOnInit() {
    this.subs = this.http.get('http://localhost:8000/data').map(data => {
      return `${data.greeting} ${data.name}`;
    });
  }
}
