import {Component, ChangeDetectionStrategy, HostBinding} from "@angular/core";

/**
 * Component used for displaying node designer mode
 */
@Component(
{
    selector: 'node-designer-mode',
    templateUrl: 'nodeDesignerMode.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: 
    [`
        main
        {
            grid-column: 1/3;
            padding: 0;
        }
    `]
})
export class NodeDesignerModeComponent
{
    //######################### public properties - host bindings #########################

    /**
     * Display css property for this component
     */
    @HostBinding('style.display')
    public componentStyleDisplay: string = "contents";
}