"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
let AppComponent = class AppComponent {
    constructor() {
        this.show = true;
        this.date = new Date(2014, 5);
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Date)
], AppComponent.prototype, "date", void 0);
__decorate([
    core_1.Input(), 
    __metadata('design:type', Boolean)
], AppComponent.prototype, "show", void 0);
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: `<material-datepicker *ngIf="show"></material-datepicker><button (click)="show =! show">Toggle datepicker</button>`
    }), 
    __metadata('design:paramtypes', [])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map