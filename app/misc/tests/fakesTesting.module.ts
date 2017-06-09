import {NgModule} from '@angular/core';
import {FakeTranslatePipe} from './fakeTranslate.pipe';
import {FakeAuthorizeDirective} from "./fakeAuthorize.directive";

/**
 * Module for fake pipes, directives and components for tests
 */
@NgModule(
{
    declarations: [FakeTranslatePipe, FakeAuthorizeDirective],
    exports: [FakeTranslatePipe, FakeAuthorizeDirective]
})
export class FakeTestingModule
{
}