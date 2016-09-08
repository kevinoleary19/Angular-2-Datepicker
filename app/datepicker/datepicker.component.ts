import { Component, ElementRef, EventEmitter, Input, Output, Renderer } from '@angular/core';

import { Calendar } from './calendar';

@Component({
  selector: 'datepicker',
  templateUrl: 'app/datepicker/datepicker.component.html'
})
export class DatepickerComponent {
  // api bindings
  @Input() accentColor: string;
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
  @Input() inputText: string;
  @Input() showCalendar: boolean;
  @Output() onSelect = new EventEmitter<Date>();

  animationListener: any;
  calendar: Calendar;
  currentMonthNumber: number;
  currentYear: number;
  months: Array<string>;

  constructor(private elementRef: ElementRef, private renderer: Renderer) {
    this.showCalendar = false;
    this.dayNames = [ 'S', 'M', 'T', 'W', 'T', 'F', 'S' ];
    this.months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November',' December'
    ];
    this.animateLeft = false;
    this.animateRight = false;

    const date = new Date();
    this.currentMonthNumber = date.getMonth()
    this.currentMonth = this.months[this.currentMonthNumber];
    this.currentYear = date.getFullYear();

    this.calendar = new Calendar();
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
    })
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
      return day.toDateString() == new Date().toDateString() && !this.isChosenDay(day);
    } else {
      return false;
    }
  }

  setCurrentMonth(monthNumber: number) {
    this.currentMonth = this.months[monthNumber];
    const calendarArray = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
    this.calendarDays = [].concat.apply([], calendarArray);
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
