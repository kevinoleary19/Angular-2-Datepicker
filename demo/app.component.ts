import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
      <material-datepicker
        name="input-date-name"
        [(date)]="date"
        (onSelect)="onSelect($event)"
        dateFormat="YYYY-MM-DD"
        [rangeEnd]="testRangeDate"
      ></material-datepicker>

      <button (click)="setToday()">today</button>
      <button (click)="clearDate()">reset</button>
      <hr>
      {{ date }}
      <p>
      Mirror(disabled, DD-MM-YYYY):
      <material-datepicker
        placeholder="nothing is selected"
        disabled="true"
        [(date)]="date"
        [dateFormat]="formatDate"
      ></material-datepicker>

    `
})
export class AppComponent {
  date: Date;
  disabled: boolean;
  @Input() testRangeDate: Date;

  constructor() {
    this.testRangeDate = new Date();
  }

  formatDate(date: Date): string {
    return date.toLocaleString();
  }

  onSelect(date: Date) {
    console.log("onSelect: ", date);
  }
  clearDate() {
    this.date = null;
  }
  setToday() {
    this.date = new Date();
  }
}
