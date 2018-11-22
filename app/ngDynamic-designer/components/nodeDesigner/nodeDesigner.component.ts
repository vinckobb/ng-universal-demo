import {Component, ChangeDetectionStrategy, HostBinding} from "@angular/core";
import {DesignerComponentRendererData} from "../../interfaces";

/**
 * Component used for displaying layout designer
 */
@Component(
{
    selector: 'node-designer',
    templateUrl: 'nodeDesigner.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`
        main
        {
            grid-column: 1/3;
            padding: 0;
        }
    `]
})
export class NodeDesignerComponent
{
    //######################### private fields #########################

    //######################### public properties - template bindings #########################

    /**
     * TODO ukazka len
     */
    public metadata: DesignerComponentRendererData;

    //######################### public properties - host bindings #########################

    @HostBinding('style.display')
    public componentStyleDisplay: string = "contents";

    //######################### constructor #########################
    constructor()
    {
    }

    //######################### public methods - implementation of OnDestroy #########################
    
    /**
     * Called when component is destroyed
     */
    public ngOnDestroy()
    {
    }
}