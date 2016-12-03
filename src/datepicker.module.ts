import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { DatepickerComponent } from './components/datepicker.component';

@NgModule({
  declarations: [ DatepickerComponent ],
  exports: [ DatepickerComponent ],
  imports: [ CommonModule, FormsModule, ReactiveFormsModule ]
})
export class DatepickerModule { }
