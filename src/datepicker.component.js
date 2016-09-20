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
var core_1 = require('@angular/core');
var calendar_1 = require('./calendar');
var DatepickerComponent = (function () {
    function DatepickerComponent(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.onSelect = new core_1.EventEmitter();
        // view logic
        this.showCalendar = false;
        // colors
        this.colors = {
            'black': '#333333',
            'blue': '#1285bf',
            'lightGrey': '#f1f1f1',
            'white': '#ffffff'
        };
        this.accentColor = this.colors['blue'];
        this.altInputStyle = false;
        // time
        this.calendar = new calendar_1.Calendar();
        this.dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        this.months = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', ' December'
        ];
        // animations
        this.animationListener = null;
        this.animateLeft = false;
        this.animateRight = false;
    }
    DatepickerComponent.prototype.ngOnInit = function () {
        var date;
        if (this.date) {
            date = this.date;
            this.setInputText(this.date);
        }
        else {
            date = new Date();
        }
        this.currentMonthNumber = date.getMonth();
        this.currentMonth = this.months[this.currentMonthNumber];
        this.currentYear = date.getFullYear();
        var calendarArray = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
        this.calendarDays = [].concat.apply([], calendarArray);
    };
    DatepickerComponent.prototype.ngOnDestroy = function () {
        if (this.animationListener) {
            this.removeAnimationListener();
        }
    };
    DatepickerComponent.prototype.addAnimationListener = function () {
        var _this = this;
        var ele = document.getElementById('datepicker__calendar__month');
        this.animationListener = this.renderer.listen(ele, 'animationend', function (event) {
            _this.animateLeft = false;
            _this.animateRight = false;
        });
    };
    DatepickerComponent.prototype.getDayBackgroundColor = function (day) {
        var color = this.colors['white'];
        if (this.isChosenDay(day)) {
            color = this.accentColor;
        }
        else if (this.isCurrentDay(day)) {
            color = this.colors['lightGrey'];
        }
        return color;
    };
    DatepickerComponent.prototype.getDayFontColor = function (day) {
        var color = this.colors['black'];
        if (this.isChosenDay(day)) {
            color = this.colors['white'];
        }
        return color;
    };
    DatepickerComponent.prototype.isChosenDay = function (day) {
        if (day) {
            return this.date ? day.toDateString() == this.date.toDateString() : false;
        }
        else {
            return false;
        }
    };
    DatepickerComponent.prototype.isCurrentDay = function (day) {
        if (day) {
            return day.toDateString() == new Date().toDateString();
        }
        else {
            return false;
        }
    };
    DatepickerComponent.prototype.isHoveredDay = function (day) {
        return this.hoveredDay ? this.hoveredDay == day && !this.isChosenDay(day) : false;
    };
    DatepickerComponent.prototype.setCurrentMonth = function (monthNumber) {
        this.currentMonth = this.months[monthNumber];
        var calendarArray = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
        this.calendarDays = [].concat.apply([], calendarArray);
    };
    DatepickerComponent.prototype.setHoveredDay = function (day) {
        this.hoveredDay = day;
    };
    DatepickerComponent.prototype.removeHoveredDay = function (day) {
        this.hoveredDay = null;
    };
    DatepickerComponent.prototype.setInputText = function (date) {
        var month = (date.getMonth() + 1).toString();
        if (month.length < 2) {
            month = "0" + month;
        }
        var day = (date.getDate()).toString();
        if (day.length < 2) {
            day = "0" + day;
        }
        this.inputText = date.getFullYear() + "/" + month + "/" + day;
    };
    DatepickerComponent.prototype.removeAnimationListener = function () {
        this.animationListener();
    };
    // Click Handlers
    //------------------------------------------------------------------------------------//
    DatepickerComponent.prototype.onArrowLeftClick = function () {
        var currentMonth = this.currentMonthNumber;
        var newYear = this.currentYear;
        var newMonth;
        if (currentMonth === 0) {
            newYear = this.currentYear - 1;
            newMonth = 11;
        }
        else {
            newMonth = currentMonth - 1;
        }
        var newDate = new Date(newYear, newMonth);
        if (!this.rangeStart || newDate.getTime() >= this.rangeStart.getTime()) {
            this.currentYear = newYear;
            this.currentMonthNumber = newMonth;
            this.setCurrentMonth(newMonth);
            this.animateLeft = true;
        }
    };
    DatepickerComponent.prototype.onArrowRightClick = function () {
        var currentMonth = this.currentMonthNumber;
        var newYear = this.currentYear;
        var newMonth;
        if (currentMonth === 11) {
            newYear = this.currentYear + 1;
            newMonth = 0;
        }
        else {
            newMonth = currentMonth + 1;
        }
        var newDate = new Date(newYear, newMonth);
        if (!this.rangeEnd || newDate.getTime() <= this.rangeEnd.getTime()) {
            this.currentYear = newYear;
            this.currentMonthNumber = newMonth;
            this.setCurrentMonth(newMonth);
            this.animateRight = true;
        }
    };
    DatepickerComponent.prototype.onCancel = function () {
        this.removeAnimationListener();
        this.showCalendar = false;
    };
    DatepickerComponent.prototype.onInputClick = function () {
        var _this = this;
        this.showCalendar = !this.showCalendar;
        if (this.showCalendar) {
            window.setTimeout(function () { return _this.addAnimationListener(); }, 1000);
        }
        else {
            this.removeAnimationListener();
        }
    };
    DatepickerComponent.prototype.onSelectDay = function (day) {
        this.removeAnimationListener();
        this.date = day;
        this.setInputText(day);
        this.showCalendar = !this.showCalendar;
        this.onSelect.emit(day);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatepickerComponent.prototype, "accentColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DatepickerComponent.prototype, "altInputStyle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], DatepickerComponent.prototype, "date", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatepickerComponent.prototype, "fontFamily", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], DatepickerComponent.prototype, "rangeStart", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], DatepickerComponent.prototype, "rangeEnd", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DatepickerComponent.prototype, "animateLeft", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DatepickerComponent.prototype, "animateRight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DatepickerComponent.prototype, "calendarDays", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatepickerComponent.prototype, "currentMonth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], DatepickerComponent.prototype, "dayNames", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Date)
    ], DatepickerComponent.prototype, "hoveredDay", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DatepickerComponent.prototype, "inputText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], DatepickerComponent.prototype, "showCalendar", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DatepickerComponent.prototype, "onSelect", void 0);
    DatepickerComponent = __decorate([
        core_1.Component({
            selector: 'material-datepicker',
            styles: [
                ".datepicker {\n      position: relative;\n      display: inline-block;\n      color: #2b2b2b;\n      font-family: 'Helvetica Neue', 'Helvetica', 'Arial', 'Calibri', 'Roboto';\n    }\n\n    .datepicker__calendar {\n      font-size: 14px;\n      position: absolute;\n      top: 1.9em;\n      height: 24.25em;\n      width: 20.5em;\n      z-index: 1000;\n      background-color: #ffffff;\n      color: #333333;\n      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);\n      cursor: default;\n      overflow: hidden;\n    }\n\n    .datepicker__calendar__cancel {\n      color: #d8d8d8;\n      cursor: pointer;\n      position: absolute;\n      bottom: 1em;\n      left: 1.8em;\n      -webkit-transition: 0.37s;\n      transition: 0.37s;\n    }\n\n    .datepicker__calendar__cancel:hover {\n      color: #b1b1b1;\n    }\n\n    .datepicker__calendar__content {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-flow: wrap;\n          flex-flow: wrap;\n      -webkit-box-pack: center;\n         -ms-flex-pack: center;\n       justify-content: center;\n      margin-top: 0.2em;\n    }\n\n    .datepicker__calendar__label {\n      width: 2.2em;\n      height: 2.2em;\n      line-height: 2.2em;\n      display: inline-block;\n      text-align: center;\n      margin: 0.2em;\n      color: #d8d8d8;\n    }\n\n    .datepicker__calendar__month {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-flow: wrap;\n          flex-flow: wrap;\n      -webkit-box-pack: center;\n         -ms-flex-pack: center;\n       justify-content: center;\n    }\n\n    .datepicker__calendar__month--animate-left {\n      -webkit-animation: 0.2s animateMonthLeft;\n              animation: 0.2s animateMonthLeft;\n    }\n\n    .datepicker__calendar__month--animate-right {\n      -webkit-animation: 0.2s animateMonthRight;\n              animation: 0.2s animateMonthRight;\n    }\n\n    .datepicker__calendar__month__day {\n      width: 2.2em;\n      height: 2.2em;\n      border-radius: 2.2em;\n      line-height: 2.2em;\n      display: inline-block;\n      text-align: center;\n      margin: 0.2em;\n\n      -webkit-transition: 0.37s;\n\n      transition: 0.37s;\n    }\n\n    .datepicker__calendar__nav {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: center;\n         -ms-flex-pack: center;\n       justify-content: center;\n      -webkit-box-align: center;\n         -ms-flex-align: center;\n            align-items: center;\n      height: 3em;\n      background-color: #fff;\n      border-bottom: 1px solid #e8e8e8;\n    }\n\n    .datepicker__calendar__nav__arrow {\n      width: 0.8em;\n      height: 0.8em;\n      cursor: pointer;\n      -webkit-transition: 0.37s;\n      transition: 0.37s;\n    }\n\n    .datepicker__calendar__nav__arrow:hover {\n      -webkit-transform: scale(1.05);\n              transform: scale(1.05);\n    }\n\n    .datepicker__calendar__nav__chevron {\n      fill: #bbbbbb;\n      -webkit-transition: 0.37s;\n      transition: 0.37s;\n    }\n\n    .datepicker__calendar__nav__chevron:hover {\n      fill: #2b2b2b;\n    }\n\n    .datepicker__calendar__nav__header {\n      width: 11em;\n      margin: 0 1em;\n      text-align: center;\n    }\n\n    .datepicker__input {\n      font-size: 14px;\n      outline: none;\n      border-radius: 0.1rem;\n      padding: .2em .6em;\n    }\n\n    @-webkit-keyframes animateMonthLeft {\n        50%  {\n          -webkit-transform: translateX(105%);\n                  transform: translateX(105%);\n        }\n\n        50.1% {\n          -webkit-transform: translateX(-105%);\n                  transform: translateX(-105%);\n        }\n    }\n\n    @-webkit-keyframes animateMonthRight {\n        50%  {\n          -webkit-transform: translateX(-105%);\n                  transform: translateX(-105%);\n        }\n\n        50.1% {\n          -webkit-transform: translateX(105%);\n                  transform: translateX(105%);\n        }\n    }\n"
            ],
            template: "\n    <div\n      class=\"datepicker\"\n      [ngStyle]=\"{'font-family': fontFamily}\"\n    >\n      <input\n        class=\"datepicker__input\"\n        [ngStyle]=\"{'color': altInputStyle ? colors['white'] : colors['black'],\n                    'background-color': altInputStyle ? accentColor : colors['white'],\n                    'border': altInputStyle ? '' : '1px solid #dadada'}\"\n        (click)=\"onInputClick()\"\n        [(ngModel)]=\"inputText\"\n        readonly=\"true\"\n      >\n      <div\n        class=\"datepicker__calendar\"\n        *ngIf=\"showCalendar\"\n      >\n        <div class=\"datepicker__calendar__nav\">\n          <div\n            class=\"datepicker__calendar__nav__arrow\"\n            (click)=\"onArrowLeftClick()\"\n          >\n          <svg class=\"datepicker__calendar__nav__chevron\" x=\"0px\" y=\"0px\" viewBox=\"0 0 50 50\">\n            <g>\n                <path d=\"M39.7,7.1c0.5,0.5,0.5,1.2,0,1.7L29,19.6c-0.5,0.5-1.2,1.2-1.7,1.7L16.5,32.1c-0.5,0.5-1.2,0.5-1.7,0l-2.3-2.3\n                    c-0.5-0.5-1.2-1.2-1.7-1.7l-2.3-2.3c-0.5-0.5-0.5-1.2,0-1.7l10.8-10.8c0.5-0.5,1.2-1.2,1.7-1.7L31.7,0.8c0.5-0.5,1.2-0.5,1.7,0\n                    l2.3,2.3c0.5,0.5,1.2,1.2,1.7,1.7L39.7,7.1z\"/>\n            </g>\n            <g>\n                <path d=\"M33.4,49c-0.5,0.5-1.2,0.5-1.7,0L20.9,38.2c-0.5-0.5-1.2-1.2-1.7-1.7L8.4,25.7c-0.5-0.5-0.5-1.2,0-1.7l2.3-2.3\n                    c0.5-0.5,1.2-1.2,1.7-1.7l2.3-2.3c0.5-0.5,1.2-0.5,1.7,0l10.8,10.8c0.5,0.5,1.2,1.2,1.7,1.7l10.8,10.8c0.5,0.5,0.5,1.2,0,1.7\n                    L37.4,45c-0.5,0.5-1.2,1.2-1.7,1.7L33.4,49z\"/>\n            </g>\n          </svg>\n          </div>\n          <div class=\"datepicker__calendar__nav__header\">\n            {{ currentMonth }} {{ currentYear }}\n          </div>\n          <div\n            class=\"datepicker__calendar__nav__arrow\"\n            (click)=\"onArrowRightClick()\"\n          >\n            <svg class=\"datepicker__calendar__nav__chevron\" x=\"0px\" y=\"0px\" viewBox=\"0 0 50 50\">\n              <g>\n                <path d=\"M8.4,7.1c-0.5,0.5-0.5,1.2,0,1.7l10.8,10.8c0.5,0.5,1.2,1.2,1.7,1.7l10.8,10.8c0.5,0.5,1.2,0.5,1.7,0l2.3-2.3\n                    c0.5-0.5,1.2-1.2,1.7-1.7l2.3-2.3c0.5-0.5,0.5-1.2,0-1.7L29,13.2c-0.5-0.5-1.2-1.2-1.7-1.7L16.5,0.8c-0.5-0.5-1.2-0.5-1.7,0\n                    l-2.3,2.3c-0.5,0.5-1.2,1.2-1.7,1.7L8.4,7.1z\"/>\n              </g>\n              <g>\n                <path d=\"M14.8,49c0.5,0.5,1.2,0.5,1.7,0l10.8-10.8c0.5-0.5,1.2-1.2,1.7-1.7l10.8-10.8c0.5-0.5,0.5-1.2,0-1.7l-2.3-2.3\n                    c-0.5-0.5-1.2-1.2-1.7-1.7l-2.3-2.3c-0.5-0.5-1.2-0.5-1.7,0L20.9,28.5c-0.5,0.5-1.2,1.2-1.7,1.7L8.4,40.9c-0.5,0.5-0.5,1.2,0,1.7\n                    l2.3,2.3c0.5,0.5,1.2,1.2,1.7,1.7L14.8,49z\"/>\n              </g>\n            </svg>\n          </div>\n        </div>\n        <div\n          class=\"datepicker__calendar__content\"\n        >\n          <div\n            class=\"datepicker__calendar__label\"\n            *ngFor=\"let day of dayNames\"\n          >\n            {{ day }}\n          </div>\n          <div\n            id=\"datepicker__calendar__month\"\n            class=\"datepicker__calendar__month\"\n            [ngClass]=\"{'datepicker__calendar__month--animate-left': animateLeft,\n                        'datepicker__calendar__month--animate-right': animateRight}\"\n          >\n            <div\n              *ngFor=\"let day of calendarDays\"\n              class=\"datepicker__calendar__month__day\"\n              [ngStyle]=\"{'cursor': day == 0 ? 'initial' : 'pointer',\n                          'background-color': getDayBackgroundColor(day),\n                          'color': isHoveredDay(day) ? accentColor : getDayFontColor(day)\n                          }\"\n              (click)=\"onSelectDay(day)\"\n              (mouseenter)=\"hoveredDay = day\"\n              (mouseleave)=\"hoveredDay = null\"\n            >\n              <span *ngIf=\"day != 0\">\n                {{ day.getDate() }}\n              </span>\n            </div>\n          </div>\n          <div\n            class=\"datepicker__calendar__cancel\"\n            (click)=\"onCancel()\"\n          >\n            Cancel\n          </div>\n        </div>\n      </div>\n    </div>\n    "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], DatepickerComponent);
    return DatepickerComponent;
}());
exports.DatepickerComponent = DatepickerComponent;
//# sourceMappingURL=datepicker.component.js.map