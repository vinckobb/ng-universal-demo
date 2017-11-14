webpackJsonp([0],{

/***/ 443:
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ 444:
/***/ (function(module, exports) {

module.exports = "<h3>Grid Sample</h3>\r\n\r\n<h4>Grid with default paging</h4>\r\n\r\n<ng-grid id=\"gridSample\" #gridSample [data]=\"data\" [options]=\"gridOptions\" [totalCount]=\"totalCount\">\r\n    <ng-column name=\"id\" title=\"ID\"></ng-column>\r\n    <ng-column name=\"index\" title=\"Index\"></ng-column>\r\n    <ng-column name=\"isActive\" title=\"Active\"></ng-column>\r\n    <ng-column name=\"balance\" title=\"Balance\"></ng-column>\r\n    <ng-column name=\"age\" title=\"Age\"></ng-column>\r\n    <ng-column name=\"name\" title=\"First name\"></ng-column>\r\n    <ng-column name=\"surname\" title=\"Surname\"></ng-column>\r\n    <ng-column name=\"email\" title=\"E-Mail\"></ng-column>\r\n    <ng-column name=\"address\" title=\"Address\"></ng-column>\r\n    <ng-column name=\"phone\" title=\"Phone\"></ng-column>\r\n</ng-grid>\r\n\r\n<div>\r\n    <button class=\"btn btn-primary\" (click)=\"setPage(2)\">2nd page</button>\r\n    <button class=\"btn btn-primary\" (click)=\"setPage(4)\">4th page</button>\r\n</div>\r\n\r\n<h4>Grid with load more paging</h4>\r\n\r\n<ng-grid id=\"gridLoadMoreSample\" [data]=\"dataLoadMore\" [options]=\"gridLoadMoreOptions\" [totalCount]=\"totalCountLoadMore\">\r\n    <ng-column name=\"id\" title=\"ID\"></ng-column>\r\n    <ng-column name=\"index\" title=\"Index\"></ng-column>\r\n    <ng-column name=\"isActive\" title=\"Active\"></ng-column>\r\n    <ng-column name=\"balance\" title=\"Balance\"></ng-column>\r\n    <ng-column name=\"age\" title=\"Age\"></ng-column>\r\n    <ng-column name=\"name\" title=\"First name\"></ng-column>\r\n    <ng-column name=\"surname\" title=\"Surname\"></ng-column>\r\n    <ng-column name=\"email\" title=\"E-Mail\"></ng-column>\r\n    <ng-column name=\"address\" title=\"Address\"></ng-column>\r\n    <ng-column name=\"phone\" title=\"Phone\"></ng-column>\r\n</ng-grid>"

/***/ }),

/***/ 445:
/***/ (function(module, exports) {

module.exports = "<h3>Bootstrap components</h3>\r\n\r\n<div>\r\n    <h4>Confirmation dialog</h4>\r\n\r\n    <confirmation-dialog #sampleConfDialog=\"confirmationDialog\"\r\n                         confirmationText=\"Are you sure?\"\r\n                         (confirmed)=\"confirm($event)\"\r\n                         (canceled)=\"cancel($event)\"></confirmation-dialog>\r\n\r\n    <button class=\"btn btn-primary\" (click)=\"sampleConfDialog.showConfirmation('these are data')\">Show confirmation</button>\r\n</div>\r\n\r\n<div>\r\n    <h4>Date time picker</h4>\r\n\r\n    <div class=\"form-group relative\">\r\n        <label class=\"control-label\">Picker</label>\r\n\r\n        <input type=\"text\"\r\n               class=\"form-control datetimepicker\"\r\n               [(ngModel)]=\"date\">\r\n    </div>\r\n\r\n    <div class=\"form-group\">\r\n        <label class=\"control-label\">Picker value</label>\r\n\r\n        <p class=\"form-control-static\">{{date?.format(\"L\")}}</p>\r\n    </div>\r\n</div>\r\n\r\n<div>\r\n    <h4>Select</h4>\r\n\r\n    <div class=\"form-group\">\r\n        <label class=\"control-label\">Select</label>\r\n\r\n        <select class=\"selectpicker\" \r\n                data-style=\"btn-select\"\r\n                [(ngModel)]=\"select\"\r\n                [trackCollection]=\"selectValues\">\r\n            <option *ngFor=\"let item of selectValues\" [value]=\"item.key\">{{item.value}}</option>\r\n        </select>\r\n    </div>\r\n\r\n    <div class=\"form-group\">\r\n        <label class=\"control-label\">Select value</label>\r\n\r\n        <p class=\"form-control-static\">{{select}}</p>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 446:
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <h3>{{'commonSamples.numeralSample' | translate}}</h3>\r\n\r\n    <div>Number {{sampleNumber | numeral: '0,0.00'}}</div>\r\n</div>\r\n\r\n<div>\r\n    <h3>Progress Indicator</h3>\r\n\r\n    <div>\r\n        <button class=\"btn btn-primary\" (click)=\"showProgress()\">Show for 5 sec</button>\r\n    </div>\r\n</div>\r\n\r\n<div>\r\n    <h3>Number input and validations helpers</h3>\r\n\r\n    <form novalidate #sampleForm=\"ngForm\">\r\n        <div class=\"form-group\" [class.has-error]=\"hasError(sampleForm, ['sampleNumber'])\">\r\n            <label class=\"control-label\">Číslo, max hodnota 20, min 5, vyžadovaná položka a musí byť číslo</label>\r\n            <input type=\"text\"\r\n                   class=\"form-control\"\r\n                   [(ngModel)]=\"sampleNumber\"\r\n                   name=\"sampleNumber\"\r\n                   number\r\n                   maxValue=\"20\"\r\n                   minValue=\"5\"\r\n                   required>\r\n\r\n            <div>\r\n                <div class=\"alert alert-danger\" *ngIf=\"!alertHidden(sampleForm, 'sampleNumber', ['required', 'number', 'minValue', 'maxValue'])\">\r\n                    Validačná chyba: {{sampleForm?.controls?.sampleNumber?.errors | json}}\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </form>\r\n</div>"

/***/ }),

/***/ 447:
/***/ (function(module, exports) {

module.exports = "<h3>Notifications Sample</h3>\r\n\r\n<div>\r\n    <h3>Global Notifications</h3>\r\n\r\n    <div>\r\n        <button class=\"btn btn-warning\" (click)=\"showWarning()\">Warning message</button>\r\n        <button class=\"btn btn-success\" (click)=\"showSuccess()\">Success message</button>\r\n        <button class=\"btn btn-info\" (click)=\"showInfo()\">Info message</button>\r\n        <button class=\"btn btn-danger\" (click)=\"showError()\">Error message</button>\r\n        <button class=\"btn btn-primary\" (click)=\"cleanAll()\">Clear message</button>\r\n    </div>\r\n\r\n    <h3>Local notifications</h3>\r\n\r\n    <div>\r\n        <button class=\"btn btn-warning\" (click)=\"showLocalWarning()\">Warning message</button>\r\n        <button class=\"btn btn-success\" (click)=\"showLocalSuccess()\">Success message</button>\r\n        <button class=\"btn btn-info\" (click)=\"showLocalInfo()\">Info message</button>\r\n        <button class=\"btn btn-danger\" (click)=\"showLocalError()\">Error message</button>\r\n        <button class=\"btn btn-primary\" (click)=\"cleanLocalAll()\">Clear message</button>\r\n    </div>\r\n\r\n    <div style=\"width: 40%;\">\r\n        <notifications></notifications>\r\n    </div>\r\n\r\n    <div>\r\n        Content below notifications\r\n    </div>\r\n</div>"

/***/ }),

/***/ 448:
/***/ (function(module, exports) {

module.exports = "<h3>Authorization sample</h3>\r\n\r\n<div *authorize=\"'showWithThis'\">\r\n    <h4>You can see this - have permission</h4>\r\n</div>\r\n\r\n<div *authorize=\"'dontShowWithThis'\">\r\n    <h4>You can`t see this - does not have permission </h4>\r\n</div>\r\n"

/***/ }),

/***/ 449:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/@angular/router/esm5/router.js + 8 modules
var router = __webpack_require__(55);

// CONCATENATED MODULE: ./app/pages/+samples/samples.component.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var samples_component_SamplesComponent = (function () {
    function SamplesComponent() {
    }
    SamplesComponent = __decorate([
        Object(core["n" /* Component */])({
            selector: 'samples-view',
            template: __webpack_require__(443)
        })
    ], SamplesComponent);
    return SamplesComponent;
}());


// EXTERNAL MODULE: ./node_modules/@ng/common/dist/index.js + 32 modules
var dist = __webpack_require__(4);

// EXTERNAL MODULE: ./node_modules/@ng/grid/dist/index.js + 10 modules
var grid_dist = __webpack_require__(147);

// EXTERNAL MODULE: ./node_modules/@ng/authentication/dist/index.js + 8 modules
var authentication_dist = __webpack_require__(54);

// EXTERNAL MODULE: ./node_modules/@ng/animations/dist/index.js + 13 modules
var animations_dist = __webpack_require__(65);

// EXTERNAL MODULE: ./node_modules/@ng/rest/dist/index.js + 5 modules
var rest_dist = __webpack_require__(86);

// EXTERNAL MODULE: ./node_modules/rxjs/_esm5/Observable.js + 1 modules
var Observable = __webpack_require__(3);

// EXTERNAL MODULE: ./config/global.json
var global = __webpack_require__(40);
var global_default = /*#__PURE__*/__webpack_require__.n(global);

// CONCATENATED MODULE: ./app/services/api/gridData/gridData.service.ts
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var gridData_service___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var gridData_service_GridDataService = (function (_super) {
    __extends(GridDataService, _super);
    function GridDataService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridDataService.prototype.getGridData = function (paging) {
        return null;
    };
    gridData_service___decorate([
        Object(rest_dist["g" /* Produces */])(rest_dist["k" /* ResponseType */].Json),
        Object(rest_dist["e" /* GET */])("grid-data"),
        __param(0, rest_dist["h" /* QueryObject */]),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Observable["a" /* Observable */])
    ], GridDataService.prototype, "getGridData", null);
    GridDataService = gridData_service___decorate([
        Object(core["B" /* Injectable */])(),
        Object(rest_dist["a" /* BaseUrl */])(global["apiBaseUrl"]),
        Object(rest_dist["c" /* DefaultHeaders */])(global["defaultApiHeaders"])
    ], GridDataService);
    return GridDataService;
}(rest_dist["i" /* RESTClient */]));


// EXTERNAL MODULE: ./app/misc/baseAnimatedComponent.ts
var baseAnimatedComponent = __webpack_require__(85);

// CONCATENATED MODULE: ./app/pages/+samples/grid/gridSample.component.ts
var gridSample_component___extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var gridSample_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var gridSample_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var gridSample_component_GridSampleComponent = (function (_super) {
    gridSample_component___extends(GridSampleComponent, _super);
    function GridSampleComponent(_dataSvc) {
        var _this = _super.call(this) || this;
        _this._dataSvc = _dataSvc;
        _this.data = [];
        _this.totalCount = 0;
        _this.dataLoadMore = [];
        _this.totalCountLoadMore = 0;
        _this.gridOptions =
            {
                initialItemsPerPage: 10,
                initialPage: 1,
                dataCallback: _this._getData.bind(_this),
                pagingOptions: { itemsPerPageValues: [10, 20] },
                columnsSelection: true
            };
        _this.gridLoadMoreOptions =
            {
                initialItemsPerPage: 20,
                initialPage: 1,
                dataCallback: _this._getLoadMoreData.bind(_this),
                pagingType: grid_dist["d" /* LoadMorePagingComponent */],
                columnsSelection: true
            };
        return _this;
    }
    GridSampleComponent.prototype.setPage = function (page) {
        this._sampleGrid.page = page;
    };
    GridSampleComponent.prototype._getData = function (page, itemsPerPage, orderBy, orderByDirection) {
        var _this = this;
        this._dataSvc
            .getGridData({
            page: (page - 1),
            size: itemsPerPage
        })
            .subscribe(function (data) {
            _this.data = data.content;
            _this.totalCount = data.totalElements;
        });
    };
    GridSampleComponent.prototype._getLoadMoreData = function (page, itemsPerPage, orderBy, orderByDirection) {
        var _this = this;
        this._dataSvc
            .getGridData({
            page: (page - 1),
            size: itemsPerPage
        })
            .subscribe(function (data) {
            _this.dataLoadMore = _this.dataLoadMore.concat(data.content).slice();
            _this.totalCountLoadMore = data.last ? _this.dataLoadMore.length : (_this.dataLoadMore.length + 1);
        });
    };
    gridSample_component___decorate([
        Object(core["_10" /* ViewChild */])('gridSample'),
        gridSample_component___metadata("design:type", grid_dist["b" /* GridComponent */])
    ], GridSampleComponent.prototype, "_sampleGrid", void 0);
    GridSampleComponent = gridSample_component___decorate([
        Object(core["n" /* Component */])({
            selector: "grid-sample",
            template: __webpack_require__(444),
            providers: [gridData_service_GridDataService],
            animations: [animations_dist["a" /* flyInOutTrigger */]]
        }),
        Object(dist["c" /* ComponentRedirectRoute */])(''),
        Object(dist["d" /* ComponentRoute */])({ path: 'grid', canActivate: [authentication_dist["a" /* AuthGuard */]] }),
        Object(authentication_dist["d" /* Authorize */])("gridSample-page"),
        gridSample_component___metadata("design:paramtypes", [gridData_service_GridDataService])
    ], GridSampleComponent);
    return GridSampleComponent;
}(baseAnimatedComponent["a" /* BaseAnimatedComponent */]));


// CONCATENATED MODULE: ./app/pages/+samples/bootstrap/bootstrapSamples.component.ts
var bootstrapSamples_component___extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var bootstrapSamples_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var bootstrapSamples_component_BootstrapSamplesComponent = (function (_super) {
    bootstrapSamples_component___extends(BootstrapSamplesComponent, _super);
    function BootstrapSamplesComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.date = null;
        _this.selectValues = [{ key: 1, value: "prva" }, { key: 2, value: "druha" }, { key: 3, value: "tretia" }];
        return _this;
    }
    BootstrapSamplesComponent.prototype.confirm = function (data) {
        alert("ok confirmed " + data);
    };
    BootstrapSamplesComponent.prototype.cancel = function (data) {
        alert("no canceled " + data);
    };
    BootstrapSamplesComponent = bootstrapSamples_component___decorate([
        Object(core["n" /* Component */])({
            selector: "bootstrap-samples",
            template: __webpack_require__(445),
            animations: [animations_dist["a" /* flyInOutTrigger */]]
        }),
        Object(dist["d" /* ComponentRoute */])({ path: 'bootstrap', canActivate: [authentication_dist["a" /* AuthGuard */]] }),
        Object(authentication_dist["d" /* Authorize */])("bootstrapSample-page")
    ], BootstrapSamplesComponent);
    return BootstrapSamplesComponent;
}(baseAnimatedComponent["a" /* BaseAnimatedComponent */]));


// CONCATENATED MODULE: ./app/pages/+samples/common/commonSamples.component.ts
var commonSamples_component___extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var commonSamples_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var commonSamples_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var commonSamples_component_CommonSamplesComponent = (function (_super) {
    commonSamples_component___extends(CommonSamplesComponent, _super);
    function CommonSamplesComponent(progressSvc) {
        var _this = _super.call(this) || this;
        _this.progressSvc = progressSvc;
        _this.sampleNumber = 5235342.3231;
        _this.hasError = dist["p" /* Utils */].forms.hasError;
        _this.alertHidden = dist["p" /* Utils */].forms.alertHidden;
        return _this;
    }
    CommonSamplesComponent.prototype.showProgress = function () {
        var _this = this;
        this.progressSvc.showProgress();
        setTimeout(function () {
            _this.progressSvc.hideProgress();
        }, 5000);
    };
    CommonSamplesComponent = commonSamples_component___decorate([
        Object(core["n" /* Component */])({
            selector: "common-samples",
            template: __webpack_require__(446),
            animations: [animations_dist["a" /* flyInOutTrigger */]]
        }),
        Object(dist["d" /* ComponentRoute */])({ path: 'common', canActivate: [authentication_dist["a" /* AuthGuard */]], data: { xxx: 'kukaj' } }),
        Object(authentication_dist["d" /* Authorize */])("commonSample-page"),
        commonSamples_component___metadata("design:paramtypes", [dist["k" /* ProgressIndicatorService */]])
    ], CommonSamplesComponent);
    return CommonSamplesComponent;
}(baseAnimatedComponent["a" /* BaseAnimatedComponent */]));


// EXTERNAL MODULE: ./node_modules/@ng/notifications/dist/index.js + 8 modules
var notifications_dist = __webpack_require__(87);

// CONCATENATED MODULE: ./app/pages/+samples/notifications/notificationsSample.component.ts
var notificationsSample_component___extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var notificationsSample_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var notificationsSample_component___metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var notificationsSample_component_NotificationsSampleComponent = (function (_super) {
    notificationsSample_component___extends(NotificationsSampleComponent, _super);
    function NotificationsSampleComponent(_notifications, _localNotifications) {
        var _this = _super.call(this) || this;
        _this._notifications = _notifications;
        _this._localNotifications = _localNotifications;
        return _this;
    }
    NotificationsSampleComponent.prototype.showInfo = function () {
        this._notifications.info("This is info");
    };
    NotificationsSampleComponent.prototype.showError = function () {
        this._notifications.error("This is error");
    };
    NotificationsSampleComponent.prototype.showWarning = function () {
        this._notifications.warning("This is warning");
    };
    NotificationsSampleComponent.prototype.showSuccess = function () {
        this._notifications.success("This is success");
    };
    NotificationsSampleComponent.prototype.cleanAll = function () {
        this._notifications.clearMessages();
    };
    NotificationsSampleComponent.prototype.showLocalInfo = function () {
        this._localNotifications.info("This is info");
    };
    NotificationsSampleComponent.prototype.showLocalError = function () {
        this._localNotifications.error("This is error");
    };
    NotificationsSampleComponent.prototype.showLocalWarning = function () {
        this._localNotifications.warning("This is warning");
    };
    NotificationsSampleComponent.prototype.showLocalSuccess = function () {
        this._localNotifications.success("This is success");
    };
    NotificationsSampleComponent.prototype.cleanLocalAll = function () {
        this._localNotifications.clearMessages();
    };
    NotificationsSampleComponent = notificationsSample_component___decorate([
        Object(core["n" /* Component */])({
            selector: 'notifications-sample',
            template: __webpack_require__(447),
            providers: [notifications_dist["b" /* LocalNotificationsService */]],
            animations: [animations_dist["a" /* flyInOutTrigger */]]
        }),
        Object(dist["d" /* ComponentRoute */])({ path: 'notifications', canActivate: [authentication_dist["a" /* AuthGuard */]] }),
        Object(authentication_dist["d" /* Authorize */])("notificationsSample-page"),
        notificationsSample_component___metadata("design:paramtypes", [notifications_dist["a" /* GlobalNotificationsService */],
            notifications_dist["b" /* LocalNotificationsService */]])
    ], NotificationsSampleComponent);
    return NotificationsSampleComponent;
}(baseAnimatedComponent["a" /* BaseAnimatedComponent */]));


// CONCATENATED MODULE: ./app/pages/+samples/authorization/authorizationSample.component.ts
var authorizationSample_component___extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var authorizationSample_component___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var authorizationSample_component_AuthorizationSampleComponent = (function (_super) {
    authorizationSample_component___extends(AuthorizationSampleComponent, _super);
    function AuthorizationSampleComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AuthorizationSampleComponent = authorizationSample_component___decorate([
        Object(core["n" /* Component */])({
            selector: "authorization-sample",
            template: __webpack_require__(448),
            animations: [animations_dist["a" /* flyInOutTrigger */]]
        }),
        Object(dist["d" /* ComponentRoute */])({ path: 'authorization', canActivate: [authentication_dist["a" /* AuthGuard */]] }),
        Object(authentication_dist["d" /* Authorize */])("authorizationSample-page")
    ], AuthorizationSampleComponent);
    return AuthorizationSampleComponent;
}(baseAnimatedComponent["a" /* BaseAnimatedComponent */]));


// CONCATENATED MODULE: ./app/pages/+samples/samples.component.routes.ts






var sampleComponentRoutes = dist["p" /* Utils */].routerHelper.extractRoutes([gridSample_component_GridSampleComponent,
    bootstrapSamples_component_BootstrapSamplesComponent,
    commonSamples_component_CommonSamplesComponent,
    notificationsSample_component_NotificationsSampleComponent,
    authorizationSample_component_AuthorizationSampleComponent]);
var sampleComponents = [gridSample_component_GridSampleComponent,
    bootstrapSamples_component_BootstrapSamplesComponent,
    commonSamples_component_CommonSamplesComponent,
    notificationsSample_component_NotificationsSampleComponent,
    authorizationSample_component_AuthorizationSampleComponent];

// EXTERNAL MODULE: ./app/boot/commonShared.module.ts + 20 modules
var commonShared_module = __webpack_require__(218);

// CONCATENATED MODULE: ./app/pages/+samples/samples.module.ts
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SamplesModule", function() { return samples_module_SamplesModule; });
var samples_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var samples_module_SamplesModule = (function () {
    function SamplesModule() {
    }
    SamplesModule = samples_module___decorate([
        Object(core["J" /* NgModule */])({
            declarations: [samples_component_SamplesComponent].concat(sampleComponents),
            imports: [
                commonShared_module["a" /* CommonSharedModule */],
                router["g" /* RouterModule */].forChild([{ path: '', component: samples_component_SamplesComponent, children: sampleComponentRoutes, data: { testxxx: 'ahoj kuko' } }])
            ]
        })
    ], SamplesModule);
    return SamplesModule;
}());



/***/ })

});