import {Component} from '@angular/core';
import {ComponentRoute} from '@ng/common';
import {GlobalNotificationsService} from '@ng/notifications';

@Component(
{
    selector: 'notifications-sample',
    templateUrl: 'notificationsSample.component.html'
})
@ComponentRoute({path: 'notifications'})
export class NotificationsSampleComponent
{
    //######################### constructor #########################
    constructor(private _notifications: GlobalNotificationsService)
    {
    }

    //######################### public methods #########################
    public showInfo()
    {
        this._notifications.info("This is info");
    }

    public showError()
    {
        this._notifications.error("This is error");
    }

    public showWarning()
    {
        this._notifications.warning("This is warning");
    }

    public showSuccess()
    {
        this._notifications.success("This is success");
    }

    public cleanAll()
    {
        this._notifications.clearMessages();
    }
}
