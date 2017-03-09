import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT, ɵgetDOM } from '@angular/platform-browser';
import { TransferState } from '../modules/transfer-state/transfer-state';

@Component({
	selector: 'demo-app',
	template: `
	  <h1>Universal Demo</h1>
	  <a routerLink="/">Home</a>
	  <a routerLink="/lazy">Lazy</a>
	  <router-outlet></router-outlet>
	`,
  styles: [
    `h1 {
      color: green;
    }`
  ]
})
export class AppComponent implements OnInit {
  constructor(private cache: TransferState, @Inject(DOCUMENT) private document: any) {}
  ngOnInit() {
    const dom = ɵgetDOM();
    const base = dom.querySelector(this.document, 'base');
    console.log(base, dom.getAttribute(base, 'href'));
    this.cache.set('cached', true);
  }
}
