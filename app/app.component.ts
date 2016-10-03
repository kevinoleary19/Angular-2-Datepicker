import { Component, Input } from '@angular/core';


@Component({
  selector: 'my-app',
  template: `<material-datepicker [date]="date" *ngIf="show"></material-datepicker><button (click)="show =! show">Toggle datepicker</button>`
})
export class AppComponent {
  @Input() date: Date
  @Input() show: Boolean;

  constructor() {
    this.show = true;
    this.date = new Date(2014, 5);

    // setInterval(() => this.date = new Date(2013, Math.round(Math.random()*5)), 2000);
  }
}
