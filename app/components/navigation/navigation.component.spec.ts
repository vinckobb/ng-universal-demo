import {ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ValueProvider, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {AuthenticationService} from "@ng/authentication";
import {CookieService} from "@ng/common";
import {TranslateService} from '@ngx-translate/core';
import {Subject, empty} from 'rxjs';

import {NavigationComponent} from './navigation.component';
import {FakeAuthorizeDirective, FakeTranslatePipe} from "../../misc/tests";
import {ConfigReleaseService} from "../../services/api/configRelease/configRelease.service";

describe('NavigationComponent - fullName property (OnPush)', () =>
{
    let comp: NavigationComponent;
    let fixture: ComponentFixture<NavigationComponent>;
    let fullNameDElement: DebugElement;
    let fullNameElement: HTMLElement;
    let resolveIdentity;

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
                        getUserIdentity: () => new Promise((resolve) => resolveIdentity = resolve),
                        authenticationChanged: new Subject<any>()
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
                        useValue: {get: () => empty()}
                    }
                ]
            }
        });

        fixture = TestBed.createComponent(NavigationComponent);
        comp = fixture.componentInstance;

        //compElement = fixture.debugElement.query(By.css(".glyphicon-user"));
        fullNameDElement = fixture.debugElement.query(By.css(".glyphicon-user")).parent;
        fullNameElement = fullNameDElement.nativeElement;
    });

    it('should be empty for quest', fakeAsync(() =>
    {
        fixture.detectChanges();

        resolveIdentity(
        {
            isAuthenticated: false
        });

        tick();

        expect(fullNameElement.textContent.trim()).toBe("");
    }));

    it('should be "tester" for logged user', fakeAsync(() =>
    {
        fixture.detectChanges();
        
        let newIdentity = "tester";

        resolveIdentity(
        {
            isAuthenticated: true,
            firstName: newIdentity,
            surname: ""
        });

        tick(); 
        
        expect(fullNameElement.textContent.trim()).toBe(newIdentity);
        expect(comp.fullName).toBe(`${newIdentity} `);
    }));

    it('should be empty after logging out', fakeAsync(() =>
    {
        fixture.detectChanges();
        
        let newIdentity = "tester";

        resolveIdentity(
        {
            isAuthenticated: true,
            firstName: newIdentity,
            surname: ""
        });

        tick(); 
        
        expect(fullNameElement.textContent.trim()).toBe(newIdentity);
        expect(comp.fullName).toBe(`${newIdentity} `);

        let authService: {authenticationChanged: Subject<any>} = fixture.debugElement.injector.get(AuthenticationService) as any;

        authService.authenticationChanged.next(
        {
            isAuthenticated: false
        });

        tick();

        expect(fullNameElement.textContent.trim()).toBe('');
        expect(comp.fullName).toBe('');
    }));

    it('should be "tester" after logging in', fakeAsync(() =>
    {
        fixture.detectChanges();
        
        let newIdentity = "tester";

        resolveIdentity(
        {
            isAuthenticated: false
        });

        tick(); 
        
        expect(fullNameElement.textContent.trim()).toBe('');
        expect(comp.fullName).toBe('');
        
        let authService: {authenticationChanged: Subject<any>} = fixture.debugElement.injector.get(AuthenticationService) as any;

        authService.authenticationChanged.next(
        {
            isAuthenticated: true,
            firstName: newIdentity,
            surname: ""
        });

        tick();

        expect(fullNameElement.textContent.trim()).toBe(newIdentity);
        expect(comp.fullName).toBe(`${newIdentity} `);
    }));
});