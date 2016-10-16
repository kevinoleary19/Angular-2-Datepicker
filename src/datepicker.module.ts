import { CommonModule }   from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { DatepickerComponent } from './datepicker.component';

export * from './datepicker.component';

@NgModule({
  declarations: [ DatepickerComponent ],
  exports: [ DatepickerComponent ],
  imports: [ CommonModule, FormsModule ]
})
export class DatepickerModule { }
