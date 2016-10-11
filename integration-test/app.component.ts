import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
      <material-datepicker
        [date]="date"
        dateFormat="mm-dd-yyyy"
      ></material-datepicker>
    `
})
export class AppComponent {
  @Input() date: Date;

  constructor() {
    this.date = new Date();
    setTimeout(this.date = new Date(2016, 8), 3000);
  }
}
