import { Component, OnInit } from '@angular/core'

@Component({
	selector: 'app',
	template: `
	  <h1>Universal Demo</h1>
	  <a routerLink="/">Home</a>
	  <a routerLink="/samples">Samples</a>
	  <router-outlet></router-outlet>
	`,
  styles: [
    `h1 {
      color: green;
    }`
  ]
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit() {
  }
}
