import {Component} from '@angular/core';

@Component(
{
    selector: 'fake-home',
    template: '<h1>{{title}}</h1>'
})
export class FakeHomeComponent 
{
    title = 'Test Tour of Heroes';
}