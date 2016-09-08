import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }   from './app.component';
import { DatepickerComponent } from './datepicker/datepicker.component';


@NgModule({
  imports:      [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    DatepickerComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
