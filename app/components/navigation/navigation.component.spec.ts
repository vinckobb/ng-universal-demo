import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ValueProvider, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {AuthenticationService, UserIdentity} from "@ng/authentication";
import {CookieService} from "@ng/common";
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {NavigationComponent} from './navigation.component';
import {FakeTestingModule, FakeAuthorizeDirective, FakeTranslatePipe} from "../../misc/tests";
import {ConfigReleaseService} from "../../services/api/configRelease/configRelease.service";

describe('NavigationComponent - fullName property (OnPush)', () =>
{
    let comp: NavigationComponent;
    let fixture: ComponentFixture<NavigationComponent>;
    let compElement: DebugElement;
    let el: HTMLElement;

    beforeEach(() =>
    {
        TestBed.configureTestingModule(
        {
            imports:
            [
                RouterTestingModule.withRoutes([])
            ],
            declarations: [NavigationComponent, FakeAuthorizeDirective, FakeTranslatePipe],
            providers:
            [
                <ValueProvider>
                {
                    provide: AuthenticationService,
                    useValue:
                    {
                        getUserIdentity: () => new Promise(() => {}),
                        authenticationChanged: new Subject<UserIdentity<any>>()
                    }
                },
                <ValueProvider>
                {
                    provide: TranslateService,
                    useValue: {onLangChange: new Subject<any>()}
                },
                <ValueProvider>
                {
                    provide: CookieService,
                    useValue: {}
                }
            ]
        }).overrideComponent(NavigationComponent,
        {
            set:
            {
                providers:
                [
                    <ValueProvider>
                    {
                        provide: ConfigReleaseService,
                        useValue: {get: () => Observable.empty()}
                    }
                ]
            }
        });

        fixture = TestBed.createComponent(NavigationComponent);
        comp = fixture.componentInstance;

        //compElement = fixture.debugElement.query(By.css(".glyphicon-user"));
        compElement = fixture.debugElement.query(By.css("div"));
        console.log(compElement);
        el = compElement.nativeElement;
    });

    it('should be empty for quest ', () =>
    {
        fixture.detectChanges();
        expect(el.textContent.trim()).toContain(comp.fullName);
    });
});