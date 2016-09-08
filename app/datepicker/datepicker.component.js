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
const calendar_1 = require('./calendar');
let DatepickerComponent = class DatepickerComponent {
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.onSelect = new core_1.EventEmitter();
        this.showCalendar = false;
        this.dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        this.months = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', ' December'
        ];
        this.animateLeft = false;
        this.animateRight = false;
        const date = new Date();
        this.currentMonthNumber = date.getMonth();
        this.currentMonth = this.months[this.currentMonthNumber];
        this.currentYear = date.getFullYear();
        this.calendar = new calendar_1.Calendar();
        const calendarArray = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
        this.calendarDays = [].concat.apply([], calendarArray);
    }
    ngOnDestroy() {
        this.removeAnimationListener();
    }
    addAnimationListener() {
        const ele = document.getElementById('datepicker__calendar__month');
        this.animationListener = this.renderer.listen(ele, 'animationend', event => {
            this.animateLeft = false;
            this.animateRight = false;
        });
    }
    isChosenDay(day) {
        if (day) {
            return this.date ? day.toDateString() == this.date.toDateString() : false;
        }
        else {
            return false;
        }
    }
    isCurrentDay(day) {
        if (day) {
            return day.toDateString() == new Date().toDateString() && !this.isChosenDay(day);
        }
        else {
            return false;
        }
    }
    setCurrentMonth(monthNumber) {
        this.currentMonth = this.months[monthNumber];
        const calendarArray = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
        this.calendarDays = [].concat.apply([], calendarArray);
    }
    setInputText(date) {
        let month = (date.getMonth() + 1).toString();
        if (month.length < 2) {
            month = `0${month}`;
        }
        let day = (date.getDate()).toString();
        if (day.length < 2) {
            day = `0${day}`;
        }
        this.inputText = `${date.getFullYear()}/${month}/${day}`;
    }
    removeAnimationListener() {
        this.animationListener();
    }
    // Click Handlers
    //------------------------------------------------------------------------------------//
    onArrowLeftClick() {
        const currentMonth = this.currentMonthNumber;
        let newYear = this.currentYear;
        let newMonth;
        if (currentMonth === 0) {
            newYear = this.currentYear - 1;
            newMonth = 11;
        }
        else {
            newMonth = currentMonth - 1;
        }
        let newDate = new Date(newYear, newMonth);
        if (!this.rangeStart || newDate.getTime() >= this.rangeStart.getTime()) {
            this.currentYear = newYear;
            this.currentMonthNumber = newMonth;
            this.setCurrentMonth(newMonth);
            this.animateLeft = true;
        }
    }
    onArrowRightClick() {
        const currentMonth = this.currentMonthNumber;
        let newYear = this.currentYear;
        let newMonth;
        if (currentMonth === 11) {
            newYear = this.currentYear + 1;
            newMonth = 0;
        }
        else {
            newMonth = currentMonth + 1;
        }
        let newDate = new Date(newYear, newMonth);
        if (!this.rangeEnd || newDate.getTime() <= this.rangeEnd.getTime()) {
            this.currentYear = newYear;
            this.currentMonthNumber = newMonth;
            this.setCurrentMonth(newMonth);
            this.animateRight = true;
        }
    }
    onCancel() {
        this.removeAnimationListener();
        this.showCalendar = false;
    }
    onInputClick() {
        this.showCalendar = !this.showCalendar;
        if (this.showCalendar) {
            window.setTimeout(() => this.addAnimationListener(), 1000);
        }
        else {
            this.removeAnimationListener();
        }
    }
    onSelectDay(day) {
        this.removeAnimationListener();
        this.date = day;
        this.setInputText(day);
        this.showCalendar = !this.showCalendar;
        this.onSelect.emit(day);
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], DatepickerComponent.prototype, "accentColor", void 0);
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
        selector: 'datepicker',
        templateUrl: 'app/datepicker/datepicker.component.html'
    }), 
    __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
], DatepickerComponent);
exports.DatepickerComponent = DatepickerComponent;
//# sourceMappingURL=datepicker.component.js.map