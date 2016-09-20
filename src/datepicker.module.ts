import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { DatepickerComponent } from './datepicker.component';

export * from './datepicker.component';

@NgModule({
  declarations: [ DatepickerComponent ],
  exports: [ DatepickerComponent ],
  imports: [ BrowserModule, FormsModule ]
})
export class DatepickerModule { }
