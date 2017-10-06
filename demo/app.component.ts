import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
      <material-datepicker
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


      <p>Form Sample</p>
      <form (ngSubmit)="submit($event)" #sampleForm="ngForm">
          <material-datepicker
            (onSelect)="onSelect($event)"
            dateFormat="YYYY-MM-DD"
            [rangeEnd]="testRangeDate"
            [(ngModel)]="test"
            required
            name="testDate"
            #testDate="ngModel"
          ></material-datepicker>
          <div [hidden]="testDate.valid">
            This is not valid 
          </div>
           <br/>
          <button type="button" (click)="this.test = null;"> Clear </button>
          <button [disabled]="!sampleForm.form.valid">
                Submit
           </button>
       </form>
    
    TestForm : {{ sampleForm.form.valid }}

    `
})
export class AppComponent {
  date: Date;
  disabled: boolean;
  @Input() testRangeDate: Date;
  test: Date;

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

  submit(event: any) {
      alert(this.test);
  }
}
