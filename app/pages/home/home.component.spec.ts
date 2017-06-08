//import '../../hacks';

import 'web-animations-js';
import 'jquery';
//import 'jqueryui';
import 'bootstrap';
import 'bootstrap-select';
import 'eonasdan-bootstrap-datetimepicker';
import 'typeahead';

//import 'core-js/es6';
//import 'core-js/es7/reflect';
import 'core-js/client/shim.js';
import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';
import 'numeral';
import 'numeral-languages';

import 'moment';
import 'handlebars';
import 'html2canvas';
import 'extend';
import 'jquery-param';
import 'crypto-js';

import "@angular/core";
import "@angular/compiler";
import "@angular/common";
import "@angular/platform-browser";
import "@angular/platform-browser-dynamic";
import "@angular/animations";
import "@angular/http";
import "@angular/forms";
import "@angular/router";
import "@ng/animations";
import "@ng/authentication";
import "@ng/bootstrap";
import "@ng/common";
import "@ng/error-handling";
import "@ng/external-translation-loader";
import "@ng/grid";
import "@ng/http-extensions";
import "@ng/notifications";
import "@ng/rest";
import "@ngx-translate/core";

import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';


import {getTestBed} from "@angular/core/testing";
import {
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting
} from "@angular/platform-browser-dynamic/testing";

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting()
);

import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {FakeHomeComponent} from './fakehome.component';

describe('BannerComponent (inline template)', () =>
{
    let comp: FakeHomeComponent;
    let fixture: ComponentFixture<FakeHomeComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(() =>
    {
        TestBed.configureTestingModule(
        {
            declarations: [FakeHomeComponent], // declare the test component
        });

        fixture = TestBed.createComponent(FakeHomeComponent);

        comp = fixture.componentInstance; // BannerComponent test instance

        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(By.css('h1'));
        el = de.nativeElement;
    });

    it('should display original title', () =>
    {
        fixture.detectChanges();
        expect(el.textContent).toContain(comp.title);
    });
});