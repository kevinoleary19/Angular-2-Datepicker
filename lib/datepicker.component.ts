import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer } from '@angular/core';

import { Calendar } from './calendar.js';

@Component({
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
})
export class DatepickerComponent implements OnInit {
  // api bindings
  @Input() accentColor: string;
  @Input() altInputStyle: boolean;
  @Input() date: Date;
  @Input() fontFamily: string;
  @Input() rangeStart: Date;
  @Input() rangeEnd: Date;
  //
  @Input() animateLeft: boolean;
  @Input() animateRight: boolean;
  @Input() calendarDays: Array<number>;
  @Input() currentMonth: string;
  @Input() dayNames: Array<String>;
  @Input() hoveredDay: Date;
  @Input() inputText: string;
  @Input() showCalendar: boolean;
  @Output() onSelect = new EventEmitter<Date>();

  animationListener: any;
  calendar: Calendar;
  colors: any;
  currentMonthNumber: number;
  currentYear: number;
  months: Array<string>;

  constructor(private elementRef: ElementRef, private renderer: Renderer) {
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
    this.calendar = new Calendar();
    this.dayNames = [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ];
    this.months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November',' December'
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
    } else {
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
    })
  }

  getDayBackgroundColor(day: Date): string {
    let color = this.colors['white'];
    if (this.isChosenDay(day)) {
      color = this.accentColor;
    } else if (this.isCurrentDay(day)) {
      color = this.colors['lightGrey'];
    }
    return color;
  }

  getDayFontColor(day: Date) {
    let color = this.colors['black'];
    if (this.isChosenDay(day)) {
      color = this.colors['white'];
    }
    return color;
  }

  isChosenDay(day: Date): boolean {
    if (day) {
      return this.date ? day.toDateString() == this.date.toDateString() : false;
    } else {
      return false;
    }
  }

  isCurrentDay(day: Date): boolean {
    if (day) {
      return day.toDateString() == new Date().toDateString();
    } else {
      return false;
    }
  }

  isHoveredDay(day: Date): boolean {
    return this.hoveredDay ? this.hoveredDay == day && !this.isChosenDay(day) : false;
  }

  setCurrentMonth(monthNumber: number) {
    this.currentMonth = this.months[monthNumber];
    const calendarArray = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
    this.calendarDays = [].concat.apply([], calendarArray);
  }

  setHoveredDay(day: Date) {
    this.hoveredDay = day;
  }

  removeHoveredDay(day: Date) {
    this.hoveredDay = null;
  }

  setInputText(date: Date) {
    let month: string = (date.getMonth() + 1).toString();
    if (month.length < 2) {
      month = `0${month}`;
    }
    let day: string = (date.getDate()).toString();
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
    const currentMonth: number = this.currentMonthNumber;
    let newYear: number = this.currentYear;
    let newMonth: number;

    if (currentMonth === 0) {
      newYear = this.currentYear - 1;
      newMonth = 11;
    } else {
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
    const currentMonth: number = this.currentMonthNumber;
    let newYear: number = this.currentYear;
    let newMonth: number;

    if (currentMonth === 11) {
      newYear = this.currentYear + 1;
      newMonth = 0;
    } else {
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
    } else {
      this.removeAnimationListener();
    }
  }

  onSelectDay(day: Date) {
    this.removeAnimationListener();
    this.date = day;
    this.setInputText(day);
    this.showCalendar = !this.showCalendar;
    this.onSelect.emit(day);
  }
}
