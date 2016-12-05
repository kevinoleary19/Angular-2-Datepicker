import {
  animate, Component, ElementRef, EventEmitter, Input, keyframes, OnChanges,
  OnInit, Output, Renderer, SimpleChange, state, style, transition, trigger
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import CalendarCreator from '../services/calendar-creator';
import fuzzySearch from '../services/fuzzy-search';

interface DateFormatFunction {
  (date: Date): string;
}

interface ValidationResult {
  [key: string]: boolean;
}

@Component({
  selector: 'material-datepicker',
  animations: [
    trigger('calendarAnimation', [
      transition('* => left', [
        animate(180, keyframes([
          style({ transform: 'translateX(105%)', offset: 0.5 }),
          style({ transform: 'translateX(-130%)', offset: 0.51 }),
          style({ transform: 'translateX(0)', offset: 1 })
        ]))
      ]),
      transition('* => right', [
        animate(180, keyframes([
          style({ transform: 'translateX(-105%)', offset: 0.5 }),
          style({ transform: 'translateX(130%)', offset: 0.51 }),
          style({ transform: 'translateX(0)', offset: 1 })
        ]))
      ])
    ])
  ],
  styles: [
    `.angular2-material-datepicker {
        position: relative;
        display: inline-block;
        box-sizing: border-box;
        color: #2b2b2b;
        font-family: 'Helvetica Neue', 'Helvetica', 'Arial', 'Calibri', 'Roboto';
      }

      .datepicker__calendar {
        position: absolute;
        overflow: hidden;
        z-index: 1000;
        top: 1.9em;
        left: 0;
        height: 23.8em;
        width: 20.5em;
        font-size: 14px;
        background-color: #ffffff;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        cursor: default;
        -webkit-touch-callout: none;
          -webkit-user-select: none;
             -moz-user-select: none;
              -ms-user-select: none;
                  user-select: none;
      }

      .datepicker__calendar__cancel {
        position: absolute;
        bottom: 1em;
        left: 1.8em;
        color: #d8d8d8;
        cursor: pointer;
        -webkit-transition: 0.37s;
        transition: 0.37s;
      }

      .datepicker__calendar__cancel:hover {
        color: #b1b1b1;
      }

      .datepicker__calendar__content {
        margin-top: 0.4em;
      }

      .datepicker__calendar__labels {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
           -ms-flex-pack: center;
         justify-content: center;
        width: 100%;
      }

      .datepicker__calendar__label {
        display: inline-block;
        width: 2.2em;
        height: 2.2em;
        margin: 0 0.2em;
        line-height: 2.2em;
        text-align: center;
        color: #d8d8d8;
      }

      .datepicker__calendar__month {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-flow: wrap;
            flex-flow: wrap;
        -webkit-box-pack: center;
           -ms-flex-pack: center;
         justify-content: center;
      }

      .datepicker__calendar__month__day {
        display: inline-block;
        width: 2.2em;
        height: 2.2em;
        margin: 0 0.2em 0.4em;
        border-radius: 2.2em;
        line-height: 2.2em;
        text-align: center;
        -webkit-transition: 0.37s;
        transition: 0.37s;
      }

      .datepicker__calendar__nav {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
           -ms-flex-pack: center;
         justify-content: center;
        -webkit-box-align: center;
           -ms-flex-align: center;
              align-items: center;
        height: 3em;
        background-color: #fff;
        border-bottom: 1px solid #e8e8e8;
      }

      .datepicker__calendar__nav__arrow {
        width: 0.8em;
        height: 0.8em;
        cursor: pointer;
        -webkit-transition: 0.37s;
        transition: 0.37s;
      }

      .datepicker__calendar__nav__arrow:hover {
        -webkit-transform: scale(1.05);
                transform: scale(1.05);
      }

      .datepicker__calendar__nav__chevron {
        fill: #bbbbbb;
        -webkit-transition: 0.37s;
        transition: 0.37s;
      }

      .datepicker__calendar__nav__chevron:hover {
        fill: #2b2b2b;
      }

      .datepicker__calendar__nav__header {
        display: flex;
        width: 11em;
        margin: 0 1em;
      }

      .datepicker__calendar__nav__header__form {
        display: inline-block;
        margin: 0;
      }

      .datepicker__calendar__nav__header__month-dropdown {
        position: absolute;
        width: 6.4em;
        min-height: 2em;
        display: inline-block;
        border: 1px solid #dadada;
        border-radius: 2px;
        background-color: #ffffff;
        transition: 0.32s;
      }

      .datepicker__calendar__nav__header__month-dropdown__input {
        width: 100%;
        padding: 6px 4px;
        outline: 0;
        border: 0;
        font-size: 1em;
      }

      .datepicker__calendar__nav__header__month-dropdown__months-container {
        overflow: auto;
        box-sizing: border-box;
        max-height: 8.4em;
        background-color: #ffffff;
      }

      .datepicker__calendar__nav__header__month-dropdown__month {
        padding: 6px 8px;
        text-align: left;
        transition: 0.32s;
        cursor: pointer;
        border-top: 1px solid #fafafa;
      }

      .datepicker__calendar__nav__header__month-dropdown__month:hover {
        background-color: rgb(243,243,243);
      }

      .datepicker__calendar__nav__header__month-dropdown__month--active {
        background-color: rgb(248,248,248);
        font-weight: bold;
      }

      .datepicker__calendar__nav__header__year-input {
        display: inline-block;
        width: 3em;
        padding: 2px 4px;
        outline: 0;
        border: 1px solid #ffffff;
        border-radius: 2px;
        font-size: 1em;
        transition: 0.32s;
      }

      .datepicker__calendar__nav__header__year-input:focus.ng-invalid {
        border: 1px solid #e82525;
      }

      .datepicker__calendar__nav__header__year-input:focus.ng-valid {
        border: 1px solid #13ad13;
      }

      .datepicker__input {
        outline: none;
        border-radius: 0.1rem;
        padding: .2em .6em;
        font-size: 14px;
      }
    `
  ],
  template: `
    <div
      class="angular2-material-datepicker"
      [ngStyle]="{'font-family': fontFamily}"
    >
      <input
        [disabled]="disabled"
        class="datepicker__input"
        [placeholder]="placeholder"
        [ngStyle]="{'color': altInputStyle ? colors['white'] : colors['black'],
                    'background-color': altInputStyle ? accentColor : colors['white'],
                    'border': altInputStyle ? '' : '1px solid #dadada'}"
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
            (click)="onArrowClick('left')"
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
            <div
              class="datepicker__calendar__nav__header__month-dropdown"
            >
              <input
                #monthInput
                class="datepicker__calendar__nav__header__month-dropdown__input"
                [placeholder]="currentMonth"
                [formControl]="monthControl"
                (keyup.enter)="monthInput.blur()"
                (blur)="onMonthSubmit()"
                (focus)="onMonthInputFocus()"
              />
              <div
                *ngIf="showInputMonths"
                class="datepicker__calendar__nav__header__month-dropdown__months-container"
              >
                <div
                  class="datepicker__calendar__nav__header__month-dropdown__month"
                  [ngClass]="{'datepicker__calendar__nav__header__month-dropdown__month--active': month === currentMonth}"
                  *ngFor="let month of inputMonths"
                  (click)="onMonthSelect(month)"
                >
                  {{ month }}
                </div>
              </div>
            </div>
            <input
              #yearInput
              class="datepicker__calendar__nav__header__year-input"
              placeholder="Year"
              [formControl]="yearControl"
              (keyup.enter)="yearInput.blur()"
              (blur)="onYearSubmit()"
            />
          </div>
          <div
            class="datepicker__calendar__nav__arrow"
            (click)="onArrowClick('right')"
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
          <div class="datepicker__calendar__labels">
            <div
              class="datepicker__calendar__label"
              *ngFor="let day of dayNames"
            >
              {{ day }}
            </div>
          </div>
          <div
            [@calendarAnimation]="animate"
            class="datepicker__calendar__month"
          >
            <div
              *ngFor="let day of calendarDays"
              class="datepicker__calendar__month__day"
              [ngStyle]="{'cursor': day == 0 ? 'initial' : 'pointer',
                          'background-color': getDayBackgroundColor(day),
                          'color': isHoveredDay(day) ? accentColor : getDayFontColor(day),
                          'pointer-events': day == 0 ? 'none' : ''
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
export class DatepickerComponent implements OnInit, OnChanges {
  private dateVal: Date;
  // two way bindings
  @Output() dateChange = new EventEmitter<Date>();

  @Input() get date(): Date { return this.dateVal; };
  set date(val: Date) {
    this.dateVal = val;
    this.dateChange.emit(val);
  }
  // api bindings
  @Input() disabled: boolean;
  @Input() accentColor: string;
  @Input() altInputStyle: boolean;
  @Input() dateFormat: string | DateFormatFunction;
  @Input() fontFamily: string;
  @Input() rangeStart: Date;
  @Input() rangeEnd: Date;
  // data
  @Input() placeholder: string = 'Select a date';
  @Input() inputText: string;
  // view logic
  @Input() showCalendar: boolean;
  @Input() showInputMonths: boolean;
  // events
  @Output() onSelect = new EventEmitter<Date>();
  // time
  @Input() calendarDays: Array<number>;
  @Input() currentMonth: string;
  @Input() dayNames: Array<String>;
  @Input() hoveredDay: Date;
  calendarCreator: CalendarCreator;
  currentMonthNumber: number;
  currentYear: number;
  months: Array<string>;
  // animation
  animate: string;
  // colors
  colors: { [id: string]: string };
  // listeners
  clickListener: Function;
  // forms
  inputMonths: Array<string>
  monthControl: FormControl;
  yearControl: FormControl;


  constructor(private renderer: Renderer, private elementRef: ElementRef) {
    this.dateFormat = 'YYYY-MM-DD';
    // view logic
    this.showCalendar = false;
    this.showInputMonths = false;
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
    this.calendarCreator = new CalendarCreator();
    this.dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    this.months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', ' December'
    ];
    // listeners
    this.clickListener = renderer.listenGlobal(
      'document',
      'click',
      (event: MouseEvent) => this.handleGlobalClick(event)
    );
    // form controls
    this.inputMonths = [];
    this.monthControl = new FormControl('', Validators.required);
    this.yearControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(4),
      this.yearValidator,
      this.inRangeValidator.bind(this)
    ]));

    this.monthControl.valueChanges.subscribe(value => this.onMonthInputChange(value));
  }

  ngOnInit() {
    this.syncVisualsWithDate();
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if ((changes['date'] || changes['dateFormat'])) {
      this.syncVisualsWithDate();
    }
  }

  ngOnDestroy() {
    this.clickListener();
  }

  // -------------------------------------------------------------------------------- //
  // -------------------------------- State Management ------------------------------ //
  // -------------------------------------------------------------------------------- //
  /**
  * Closes the calendar and syncs visual components with selected or current date.
  * This way if a user opens the calendar with this month, scrolls to two months from now,
  * closes the calendar, then reopens it, it will open with the current month
  * or month associated with the selected date
  */
  closeCalendar(): void {
    this.showCalendar = false;
    this.syncVisualsWithDate();
  }

  /**
  * Sets the date values associated with the ui
  */
  private setCurrentValues(date: Date) {
    console.log('setCurrentValues');
    this.currentMonthNumber = date.getMonth();
    this.currentMonth = this.months[this.currentMonthNumber];

    this.currentYear = date.getFullYear();
    this.monthControl.setValue(this.currentMonth);
    this.yearControl.setValue(this.currentYear);

    const calendarArray = this.calendarCreator.monthDays(this.currentYear, this.currentMonthNumber);
    this.calendarDays = [].concat.apply([], calendarArray);
  }

  /**
  * Visually syncs calendar and input to selected date or current day
  */
  syncVisualsWithDate(): void {
    if (this.date) {
      this.setInputText(this.date);
      this.setCurrentValues(this.date);
    } else {
      this.inputText = '';
      this.setCurrentValues(new Date());
    }
  }

  /**
  * Sets the currentMonth and creates new calendar days for the given month
  */
  setCurrentMonth(monthNumber: number): void {
    console.log('setCurrentMonth');
    this.currentMonth = this.months[monthNumber];
    this.monthControl.setValue(this.currentMonth);
    const calendarArray = this.calendarCreator.monthDays(this.currentYear, this.currentMonthNumber);
    this.calendarDays = [].concat.apply([], calendarArray);
  }

  /**
  * Sets the currentYear and FormControl value associated with the year
  */
  setCurrentYear(year: number): void {
    this.currentYear = year;
    this.yearControl.setValue(year);
  }

  /**
  * Sets the visible input text
  */
  setInputText(date: Date): void {
    let month: string = (date.getMonth() + 1).toString();
    // always prefixes one digit numbers with a 0
    if (month.length < 2) {
      month = `0${month}`;
    }
    let day: string = (date.getDate()).toString();
    if (day.length < 2) {
      day = `0${day}`;
    }
    // transforms input text into appropiate date format
    let inputText: string = '';
    const dateFormat: string | DateFormatFunction = this.dateFormat;
    if (typeof dateFormat === 'string') {
      switch (dateFormat.toUpperCase()) {
        case 'YYYY-MM-DD':
          inputText = `${date.getFullYear()}/${month}/${day}`;
          break;
        case 'MM-DD-YYYY':
          inputText = `${month}/${day}/${date.getFullYear()}`;
          break;
        case 'DD-MM-YYYY':
          inputText = `${day}/${month}/${date.getFullYear()}`;
          break;
        default:
          inputText = `${date.getFullYear()}/${month}/${day}`;
          break;
      }
    } else if (typeof dateFormat === 'function') {
      inputText = dateFormat(date);
    }

    this.inputText = inputText;
  }

  // -------------------------------------------------------------------------------- //
  // --------------------------------- Click Handlers ------------------------------- //
  // -------------------------------------------------------------------------------- //
  /**
  * Sets the date values associated with the calendar.
  * Triggers animation if the month changes
  */
  onArrowClick(direction: string): void {
    const currentMonth: number = this.currentMonthNumber;
    let newYear: number = this.currentYear;
    let newMonth: number;
    // sets the newMonth
    // changes newYear is necessary
    if (direction === 'left') {
      if (currentMonth === 0) {
        newYear = this.currentYear - 1;
        newMonth = 11;
      } else {
        newMonth = currentMonth - 1;
      }
    } else if (direction === 'right') {
      if (currentMonth === 11) {
        newYear = this.currentYear + 1;
        newMonth = 0;
      } else {
        newMonth = currentMonth + 1;
      }
    }
    // check if new date would be within range
    let newDate = new Date(newYear, newMonth);
    let newDateValid: boolean;
    if (direction === 'left') {
      newDateValid = !this.rangeStart || newDate.getTime() >= this.rangeStart.getTime();
    } else if (direction === 'right') {
      newDateValid = !this.rangeEnd || newDate.getTime() <= this.rangeEnd.getTime();
    }

    if (newDateValid) {
      this.setCurrentYear(newYear);
      this.currentMonthNumber = newMonth;
      this.setCurrentMonth(newMonth);
      this.triggerAnimation(direction);
    }
  }

  /**
  * Closes the calendar when the cancel button is clicked
  */
  onCancel(): void {
    this.closeCalendar();
  }

  /**
  * Toggles the calendar when the date input is clicked
  */
  onInputClick(): void {
    this.showCalendar = !this.showCalendar;
  }

  /**
  * Toggles the month selector
  */
  onMonthClick(): void {
    // this.showInputMonths = !this.showInputMonths;
  }

  /**
  * Listens for month input changes
  */
  onMonthInputChange(value: string): void {
    console.log(`value:${value}`);
    let inputMonths: Array<string>;
    if (value) {
      inputMonths = fuzzySearch(this.months, value);
    } else {
      inputMonths = this.months;
    }
    console.log(inputMonths);
    this.inputMonths = inputMonths;
  }

  /**
  *
  */
  onMonthInputFocus(): void {
    console.log('onMonthInputFocus');
    this.monthControl.reset();
    this.showInputMonths = true;
  }

  /**
  * Changes the month of the calendar
  */
  onMonthSelect(month: string): void {

  }

  /**
  *
  */
  onMonthSubmit(): void {
    console.log('onMonthSubmit');
    // this.showInputMonths = false;
  }

  /**
  * Returns the font color for a day
  */
  onSelectDay(day: Date): void {
    this.date = day;
    this.onSelect.emit(day);
    this.showCalendar = !this.showCalendar;
  }

  /**
  * Sets the current year and current month if the year from
  * yearControl is valid
  */
  onYearSubmit(): void {
    if (this.yearControl.valid && +this.yearControl.value !== this.currentYear) {
      this.setCurrentYear(+this.yearControl.value);
      this.setCurrentMonth(this.currentMonthNumber);
    } else {
      this.yearControl.setValue(this.currentYear);
    }
  }

  // -------------------------------------------------------------------------------- //
  // ----------------------------------- Listeners ---------------------------------- //
  // -------------------------------------------------------------------------------- //
  /**
  * Closes the calendar if a click is not within the datepicker component
  */
  handleGlobalClick(event: MouseEvent): void {
    const withinElement = this.elementRef.nativeElement.contains(event.target);
    if (!withinElement && this.showCalendar) {
      this.closeCalendar();
    }
  }

  // -------------------------------------------------------------------------------- //
  // ----------------------------------- Helpers ------------------------------------ //
  // -------------------------------------------------------------------------------- //
  /**
  * Returns the background color for a day
  */
  getDayBackgroundColor(day: Date): string {
    let color = this.colors['white'];
    if (this.isChosenDay(day)) {
      color = this.accentColor;
    } else if (this.isCurrentDay(day)) {
      color = this.colors['lightGrey'];
    }
    return color;
  }

  /**
  * Returns the font color for a day
  */
  getDayFontColor(day: Date): string {
    let color = this.colors['black'];
    if (this.isChosenDay(day)) {
      color = this.colors['white'];
    }
    return color;
  }

  /**
  * Returns whether a day is the chosen day
  */
  isChosenDay(day: Date): boolean {
    if (day) {
      return this.date ? day.toDateString() === this.date.toDateString() : false;
    } else {
      return false;
    }
  }

  /**
  * Returns whether a day is the current calendar day
  */
  isCurrentDay(day: Date): boolean {
    if (day) {
      return day.toDateString() === new Date().toDateString();
    } else {
      return false;
    }
  }

  /**
  * Returns whether a day is the day currently being hovered
  */
  isHoveredDay(day: Date): boolean {
    return this.hoveredDay ? this.hoveredDay === day && !this.isChosenDay(day) : false;
  }

  /**
  * Triggers an animation and resets to initial state after the duration of the animation
  */
  triggerAnimation(direction: string): void {
    this.animate = direction;
    setTimeout(() => this.animate = 'reset', 185);
  }

  // -------------------------------------------------------------------------------- //
  // ---------------------------------- Validators ---------------------------------- //
  // -------------------------------------------------------------------------------- //
  /**
  * Validates that a value is within the 'rangeStart' and/or 'rangeEnd' if specified
  */
  inRangeValidator(control: FormControl): ValidationResult {
    const value = control.value;

    if (this.currentMonthNumber) {
      const tentativeDate = new Date(+value, this.currentMonthNumber);
      if (this.rangeStart && tentativeDate.getTime() < this.rangeStart.getTime()) {
        return { 'yearBeforeRangeStart': true };
      }
      if (this.rangeEnd && tentativeDate.getTime() > this.rangeEnd.getTime()) {
        return { 'yearAfterRangeEnd': true };
      }
      return null;
    }

    return { 'currentMonthMissing': true };
  }

  /**
  * Validates that a value is a number greater than or equal to 1970
  * and less than 2100
  */
  yearValidator(control: FormControl): ValidationResult {
    const value = control.value;
    // make sure number is below 2100 because '2e14' is a valid javascript number
    // also make sure number is an integer
    const valid = !isNaN(value) && value >= 1970 && value <= 2100 && Math.floor(value) === +value;
    if (valid) {
      return null;
    }
    return { 'invalidYear': true };
  }
}
