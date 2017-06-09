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

    it('should display a different test title', () => 
    {
        comp.title = 'Test Title';
        fixture.detectChanges();
        expect(el.textContent).toContain('Test Title');
    });
});