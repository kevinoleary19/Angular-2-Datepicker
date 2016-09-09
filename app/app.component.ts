import { Component, Input } from '@angular/core';


@Component({
  selector: 'my-app',
  template: `<material-datepicker *ngIf="show" [date]="date"></material-datepicker><button (click)="show =! show">Toggle datepicker</button>`
})
export class AppComponent {
  @Input() date: Date
  @Input() show: Boolean;

  constructor() {
    this.show = true;
    this.date = new Date(2014, 5);
  }
}
