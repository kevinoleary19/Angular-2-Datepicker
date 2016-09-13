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
const calendar_js_1 = require('./calendar.js');
let DatepickerComponent = class DatepickerComponent {
    constructor(elementRef, renderer) {
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
        this.calendar = new calendar_js_1.Calendar();
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
    ngOnInit() {
        let date;
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
        const calendarArray = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
        this.calendarDays = [].concat.apply([], calendarArray);
    }
    ngOnDestroy() {
        if (this.animationListener) {
            this.removeAnimationListener();
        }
    }
    addAnimationListener() {
        const ele = document.getElementById('datepicker__calendar__month');
        this.animationListener = this.renderer.listen(ele, 'animationend', event => {
            this.animateLeft = false;
            this.animateRight = false;
        });
    }
    getDayBackgroundColor(day) {
        let color = this.colors['white'];
        if (this.isChosenDay(day)) {
            color = this.accentColor;
        }
        else if (this.isCurrentDay(day)) {
            color = this.colors['lightGrey'];
        }
        return color;
    }
    getDayFontColor(day) {
        let color = this.colors['black'];
        if (this.isChosenDay(day)) {
            color = this.colors['white'];
        }
        return color;
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
            return day.toDateString() == new Date().toDateString();
        }
        else {
            return false;
        }
    }
    isHoveredDay(day) {
        return this.hoveredDay ? this.hoveredDay == day && !this.isChosenDay(day) : false;
    }
    setCurrentMonth(monthNumber) {
        this.currentMonth = this.months[monthNumber];
        const calendarArray = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
        this.calendarDays = [].concat.apply([], calendarArray);
    }
    setHoveredDay(day) {
        this.hoveredDay = day;
    }
    removeHoveredDay(day) {
        this.hoveredDay = null;
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
        template: `
    <div
      class="datepicker"
      [ngStyle]="{'font-family': fontFamily}"
    >
      <input
        class="datepicker__input"
        [ngStyle]="{'color': altInputStyle ? colors['white'] : colors['black'],
                    'background-color': altInputStyle ? accentColor : colors['white'],
                    'border': altInputStyle ? '' : 'border: 1px solid #dadada'}"
        (click)="onInputClick()"
        [(ngModel)]="inputText"
        readonly="true"
      >
      <div
        class="datepicker__calendar"
        *ngIf="showCalendar"
      >
        <div class="datepicker__calendar__nav">
          <div
            class="datepicker__calendar__nav__arrow"
            (click)="onArrowLeftClick()"
          >
          <svg class="datepicker__calendar__nav__chevron" x="0px" y="0px" viewBox="0 0 50 50">
            <g>
                <path d="M39.7,7.1c0.5,0.5,0.5,1.2,0,1.7L29,19.6c-0.5,0.5-1.2,1.2-1.7,1.7L16.5,32.1c-0.5,0.5-1.2,0.5-1.7,0l-2.3-2.3
                    c-0.5-0.5-1.2-1.2-1.7-1.7l-2.3-2.3c-0.5-0.5-0.5-1.2,0-1.7l10.8-10.8c0.5-0.5,1.2-1.2,1.7-1.7L31.7,0.8c0.5-0.5,1.2-0.5,1.7,0
                    l2.3,2.3c0.5,0.5,1.2,1.2,1.7,1.7L39.7,7.1z"/>
            </g>
            <g>
                <path d="M33.4,49c-0.5,0.5-1.2,0.5-1.7,0L20.9,38.2c-0.5-0.5-1.2-1.2-1.7-1.7L8.4,25.7c-0.5-0.5-0.5-1.2,0-1.7l2.3-2.3
                    c0.5-0.5,1.2-1.2,1.7-1.7l2.3-2.3c0.5-0.5,1.2-0.5,1.7,0l10.8,10.8c0.5,0.5,1.2,1.2,1.7,1.7l10.8,10.8c0.5,0.5,0.5,1.2,0,1.7
                    L37.4,45c-0.5,0.5-1.2,1.2-1.7,1.7L33.4,49z"/>
            </g>
          </svg>
          </div>
          <div class="datepicker__calendar__nav__header">
            {{ currentMonth }} {{ currentYear }}
          </div>
          <div
            class="datepicker__calendar__nav__arrow"
            (click)="onArrowRightClick()"
          >
            <svg class="datepicker__calendar__nav__chevron" x="0px" y="0px" viewBox="0 0 50 50">
              <g>
                <path d="M8.4,7.1c-0.5,0.5-0.5,1.2,0,1.7l10.8,10.8c0.5,0.5,1.2,1.2,1.7,1.7l10.8,10.8c0.5,0.5,1.2,0.5,1.7,0l2.3-2.3
                    c0.5-0.5,1.2-1.2,1.7-1.7l2.3-2.3c0.5-0.5,0.5-1.2,0-1.7L29,13.2c-0.5-0.5-1.2-1.2-1.7-1.7L16.5,0.8c-0.5-0.5-1.2-0.5-1.7,0
                    l-2.3,2.3c-0.5,0.5-1.2,1.2-1.7,1.7L8.4,7.1z"/>
              </g>
              <g>
                <path d="M14.8,49c0.5,0.5,1.2,0.5,1.7,0l10.8-10.8c0.5-0.5,1.2-1.2,1.7-1.7l10.8-10.8c0.5-0.5,0.5-1.2,0-1.7l-2.3-2.3
                    c-0.5-0.5-1.2-1.2-1.7-1.7l-2.3-2.3c-0.5-0.5-1.2-0.5-1.7,0L20.9,28.5c-0.5,0.5-1.2,1.2-1.7,1.7L8.4,40.9c-0.5,0.5-0.5,1.2,0,1.7
                    l2.3,2.3c0.5,0.5,1.2,1.2,1.7,1.7L14.8,49z"/>
              </g>
            </svg>
          </div>
        </div>
        <div
          class="datepicker__calendar__content"
        >
          <div
            class="datepicker__calendar__label"
            *ngFor="let day of dayNames"
          >
            {{ day }}
          </div>
          <div
            id="datepicker__calendar__month"
            class="datepicker__calendar__month"
            [ngClass]="{'datepicker__calendar__month--animate-left': animateLeft,
                        'datepicker__calendar__month--animate-right': animateRight}"
          >
            <div
              *ngFor="let day of calendarDays"
              class="datepicker__calendar__month__day"
              [ngStyle]="{'cursor': day == 0 ? 'initial' : 'pointer',
                          'background-color': getDayBackgroundColor(day),
                          'color': isHoveredDay(day) ? accentColor : getDayFontColor(day)
                          }"
              (click)="onSelectDay(day)"
              (mouseenter)="hoveredDay = day"
              (mouseleave)="hoveredDay = null"
            >
              <span *ngIf="day != 0">
                {{ day.getDate() }}
              </span>
            </div>
          </div>
          <div
            class="datepicker__calendar__cancel"
            (click)="onCancel()"
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
    `
    }), 
    __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
], DatepickerComponent);
exports.DatepickerComponent = DatepickerComponent;
//# sourceMappingURL=datepicker.component.js.map