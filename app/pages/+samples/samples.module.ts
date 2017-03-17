import {NgModule, Component} from '@angular/core'
import {RouterModule} from '@angular/router'
import {SamplesComponent} from "./samples.component";


@NgModule(
{
    declarations: [SamplesComponent],
    imports: [RouterModule.forChild([{ path: '', component: SamplesComponent}])]
})
export class SamplesModule 
{
}
