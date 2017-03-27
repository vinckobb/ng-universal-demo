import {Component} from '@angular/core';
import {ComponentRoute} from '@ng/common';
import {GlobalNotificationsService, LocalNotificationsService} from '@ng/notifications';

@Component(
{
    selector: 'notifications-sample',
    templateUrl: 'notificationsSample.component.html',
    providers: [LocalNotificationsService]
})
@ComponentRoute({path: 'notifications'})
export class NotificationsSampleComponent
{
    //######################### constructor #########################
    constructor(private _notifications: GlobalNotificationsService,
                private _localNotifications: LocalNotificationsService)
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

    public showLocalInfo()
    {
        this._localNotifications.info("This is info");
    }

    public showLocalError()
    {
        this._localNotifications.error("This is error");
    }

    public showLocalWarning()
    {
        this._localNotifications.warning("This is warning");
    }

    public showLocalSuccess()
    {
        this._localNotifications.success("This is success");
    }

    public cleanLocalAll()
    {
        this._localNotifications.clearMessages();
    }
}
