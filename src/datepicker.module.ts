import { CommonModule }   from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpModule , Http, RequestOptions} from '@angular/http';

import { DatepickerComponent } from './datepicker.component';
import { MaterialModule } from '@angular/material';

export * from './datepicker.component';

@NgModule({
  declarations: [ DatepickerComponent ],
  exports: [ DatepickerComponent ],
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, HttpModule, Http, RequestOptions ]
})
export class DatepickerModule { }
