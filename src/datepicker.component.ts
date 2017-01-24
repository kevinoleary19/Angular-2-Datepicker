import {
  animate, Component, ElementRef, EventEmitter, Input, keyframes, OnChanges,
  OnInit, Output, Renderer, SimpleChange, state, style, transition, trigger
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { Calendar } from './calendar';
import { DateFormatFunction, ValidationResult } from './validation';

@Component({
  selector: 'material-datepicker',
  animations: [
    trigger('calendarAnimation', [
      transition('* => left', [
        animate(180, keyframes([
          style({ transform: 'translateX(105%)', offset: 0.5 }),
          style({ transform: 'translateX(-130%)', offset: 0.51 }),
          style({ transform: 'translateX(0)', offset: 1 })
        ]))
      ]),
      transition('* => right', [
        animate(180, keyframes([
          style({ transform: 'translateX(-105%)', offset: 0.5 }),
          style({ transform: 'translateX(130%)', offset: 0.51 }),
          style({ transform: 'translateX(0)', offset: 1 })
        ]))
      ])
    ])
  ],
  styles: [
    `.datepicker {
        position: relative;
        display: inline-block;
        color: #2b2b2b;
        font-family: 'Helvetica Neue', 'Helvetica', 'Arial', 'Calibri', 'Roboto';
      }

      .datepicker__calendar {
        position: absolute;
        overflow: hidden;
        z-index: 1000;
        top: 1.9em;
        left: 0;
        height: 23.8em;
        width: 20.5em;
        font-size: 14px;
        background-color: #ffffff;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        cursor: default;
        -webkit-touch-callout: none;
          -webkit-user-select: none;
             -moz-user-select: none;
              -ms-user-select: none;
                  user-select: none;
      }
      
      .datepicker__calendar__inner {
        position: absolute;
        overflow: hidden;
        z-index: 1000;
        top: 0;
        left: 0;
        height: 23.8em;
        width: 20.5em;
        font-size: 14px;
        background-color: #ffffff;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        cursor: default;
        -webkit-touch-callout: none;
          -webkit-user-select: none;
             -moz-user-select: none;
              -ms-user-select: none;
                  user-select: none;
      }

      .datepicker__calendar__cancel {
        position: absolute;
        bottom: 1em;
        left: 1.8em;
        color: #d8d8d8;
        cursor: pointer;
        -webkit-transition: 0.37s;
        transition: 0.37s;
      }

      .datepicker__calendar__cancel:hover {
        color: #b1b1b1;
      }

      .datepicker__calendar__content {
        margin-top: 0.4em;
      }

      .datepicker__calendar__labels {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
           -ms-flex-pack: center;
         justify-content: center;
        width: 100%;
      }

      .datepicker__calendar__label {
        display: inline-block;
        width: 2.2em;
        height: 2.2em;
        margin: 0 0.2em;
        line-height: 2.2em;
        text-align: center;
        color: #d8d8d8;
      }

      .datepicker__calendar__month {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-flow: wrap;
            flex-flow: wrap;
        -webkit-box-pack: center;
           -ms-flex-pack: center;
         justify-content: center;
      }

      .datepicker__calendar__month__day {
        display: inline-block;
        width: 2.2em;
        height: 2.2em;
        margin: 0 0.2em 0.4em;
        border-radius: 2.2em;
        line-height: 2.2em;
        text-align: center;
        -webkit-transition: 0.37s;
        transition: 0.37s;
      }

      .datepicker__calendar__nav {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
           -ms-flex-pack: center;
         justify-content: center;
        -webkit-box-align: center;
           -ms-flex-align: center;
              align-items: center;
        height: 3em;
        background-color: #fff;
        border-bottom: 1px solid #e8e8e8;
      }

      .datepicker__calendar__nav__arrow {
        width: 0.8em;
        height: 0.8em;
        cursor: pointer;
        -webkit-transition: 0.37s;
        transition: 0.37s;
      }

      .datepicker__calendar__nav__arrow:hover {
        -webkit-transform: scale(1.05);
                transform: scale(1.05);
      }

      .datepicker__calendar__nav__chevron {
        fill: #bbbbbb;
        -webkit-transition: 0.37s;
        transition: 0.37s;
      }

      .datepicker__calendar__nav__chevron:hover {
        fill: #2b2b2b;
      }

      .datepicker__calendar__nav__header {
        width: 11em;
        cursor: pointer;
        margin: 0 1em;
        text-align: center;
      }

      .datepicker__calendar__nav__header__form {
        display: inline-block;
        margin: 0;
      }

      .datepicker__calendar__nav__header__year {
        display: inline-block;
        width: 3em;
        padding: 2px 4px;
        border: 1px solid #ffffff;
        border-radius: 2px;
        font-size: 1em;
        transition: 0.32s;
      }
      
      .datepicker__calendar__nav__header__inner__year {
        width: 11em;
        margin: 0 1em;
        text-align: center;
      }
      
      .datepicker__calendar__nav__header__inner__year.pointer {
        cursor: pointer;
      }

      .datepicker__calendar__nav__header__year:focus.ng-invalid {
        border: 1px solid #e82525;
      }

      .datepicker__calendar__nav__header__year:focus.ng-valid {
        border: 1px solid #13ad13;
      }

      .datepicker__calendar__nav__header__year:focus {
        outline: none;
      }

      .datepicker__input {
        outline: none;
        border-radius: 0.1rem;
        padding: .2em .6em;
        font-size: 14px;
      }
                 
      .grid {
        background: white;
        margin: 0 0 20px 0;
        padding-right: 0;
      }
        
      .grid:after {
        content: "";
        display: table;
        clear: both;
      }
      
      .grid:last-of-type {
        padding-right: 0;
      }
      
      [class*='col-'] {
        float: left;
        padding-right: 20px;
      }
      
      .col-1-5 {
        width: calc(20% - 10px);
        padding: 5px;
      }
      
      .col-1-4 {
        width: calc(25% - 10px);
        padding: 5px;
      }
      
      .col-1-5 .year {
        cursor: pointer;
        border: 0;
        border-radius: 50%;
        background: white;
        color: black;
        display: table;
        height: 49px;
        width: 100%;
        -webkit-transition: 0.37s;
        transition: 0.37s;
      }
      
      .col-1-4 .month {
        cursor: pointer;
        border: 0;
        border-radius: 50%;
        background: white;
        color: black;
        display: table;
        height: 60px;
        width: 100%;
        -webkit-transition: 0.37s;
        transition: 0.37s;
      }
      
      .col-1-5 .year span {
        display:table-cell;
        vertical-align: middle;
        text-align: center;
      }
      
      .col-1-4 .month span {
        display:table-cell;
        vertical-align: middle;
        text-align: center;
      }
    `
  ],
  template: `
    <div class="datepicker" [ngStyle]="{'font-family': fontFamily}">
      <input [disabled]="disabled"
        class="datepicker__input"
        [placeholder]="placeholder"
        [ngStyle]="{'color': altInputStyle ? colors['white'] : colors['black'],
                    'background-color': altInputStyle ? accentColor : colors['white'],
                    'border': altInputStyle ? '' : '1px solid #dadada'}"
        (click)="onInputClick()"
        [(ngModel)]="inputText"
        readonly="true">
      <div class="datepicker__calendar" *ngIf="showCalendar">
        <div class="datepicker__calendar__nav">
          <div class="datepicker__calendar__nav__arrow" (click)="onArrowClick('left')" >
            <svg class="datepicker__calendar__nav__chevron" x="0px" y="0px" viewBox="0 0 50 50">
              <g>
                <path d="M39.7,7.1c0.5,0.5,0.5,1.2,0,1.7L29,19.6c-0.5,0.5-1.2,1.2-1.7,1.7L16.5,32.1c-0.5,0.5-1.2,0.5-1.7,0l-2.3-2.3
                      c-0.5-0.5-1.2-1.2-1.7-1.7l-2.3-2.3c-0.5-0.5-0.5-1.2,0-1.7l10.8-10.8c0.5-0.5,1.2-1.2,1.7-1.7L31.7,0.8c0.5-0.5,1.2-0.5,1.7,0
                      l2.3,2.3c0.5,0.5,1.2,1.2,1.7,1.7L39.7,7.1z"/>
              </g>
              <g>
                <path d="M33.4,49c-0.5,0.5-1.2,0.5-1.7,0L20.9,38.2c-0.5-0.5-1.2-1.2-1.7-1.7L8.4,25.7c-0.5-0.5-0.5-1.2,0-1.7l2.3-2.3
                      c0.5-0.5,1.2-1.2,1.7-1.7l2.3-2.3c0.5-0.5,1.2-0.5,1.7,0l10.8,10.8c0.5,0.5,1.2,1.2,1.7,1.7l10.8,10.8c0.5,0.5,0.5,1.2,0,1.7
                      L37.4,45c-0.5,0.5-1.2,1.2-1.7,1.7L33.4,49z"/>
              </g>
            </svg>
          </div>
          <div (click)="showMonthsDiv()" class="datepicker__calendar__nav__header">
            <span>{{ currentMonth }}</span>
            <span>{{ currentYear }}</span>
          </div>
          <div class="datepicker__calendar__nav__arrow" (click)="onArrowClick('right')" >
            <svg class="datepicker__calendar__nav__chevron" x="0px" y="0px" viewBox="0 0 50 50">
              <g>
                <path d="M8.4,7.1c-0.5,0.5-0.5,1.2,0,1.7l10.8,10.8c0.5,0.5,1.2,1.2,1.7,1.7l10.8,10.8c0.5,0.5,1.2,0.5,1.7,0l2.3-2.3
                    c0.5-0.5,1.2-1.2,1.7-1.7l2.3-2.3c0.5-0.5,0.5-1.2,0-1.7L29,13.2c-0.5-0.5-1.2-1.2-1.7-1.7L16.5,0.8c-0.5-0.5-1.2-0.5-1.7,0
                    l-2.3,2.3c-0.5,0.5-1.2,1.2-1.7,1.7L8.4,7.1z"/>
              </g>
              <g>
                <path d="M14.8,49c0.5,0.5,1.2,0.5,1.7,0l10.8-10.8c0.5-0.5,1.2-1.2,1.7-1.7l10.8-10.8c0.5-0.5,0.5-1.2,0-1.7l-2.3-2.3
                    c-0.5-0.5-1.2-1.2-1.7-1.7l-2.3-2.3c-0.5-0.5-1.2-0.5-1.7,0L20.9,28.5c-0.5,0.5-1.2,1.2-1.7,1.7L8.4,40.9c-0.5,0.5-0.5,1.2,0,1.7
                    l2.3,2.3c0.5,0.5,1.2,1.2,1.7,1.7L14.8,49z"/>
              </g>
            </svg>
          </div>
        </div>
        <div class="datepicker__calendar__content" >
          <div class="datepicker__calendar__labels">
            <div class="datepicker__calendar__label" *ngFor="let day of dayNames" >{{ day }}</div>
          </div>
          <div [@calendarAnimation]="animate" class="datepicker__calendar__month">
            <div
              *ngFor="let day of calendarDays"
              class="datepicker__calendar__month__day"
              [ngStyle]="{'cursor': day == 0 || !isSelectableDate(day) ? 'initial' : 'pointer',
                          'background-color': getDayBackgroundColor(day),
                          'color': isHoveredDay(day) ? accentColor : getDayFontColor(day),
                          'pointer-events': day == 0 || !isSelectableDate(day) ? 'none' : ''
                          }"
              (click)="onSelectDay(day)"
              (mouseenter)="hoveredDay = day"
              (mouseleave)="hoveredDay = null">
              <span *ngIf="day != 0">
                {{ day.getDate() }}
              </span>
            </div>
          </div>
          <div class="datepicker__calendar__cancel" (click)="onCancel()" >Cancel</div>
        </div>
                
        <div *ngIf="showMonths" class="datepicker__calendar__inner">
        
          <div class="datepicker__calendar__nav">
            
            <div class="datepicker__calendar__nav__arrow" (click)="changeYear('left')" >
              <svg class="datepicker__calendar__nav__chevron" x="0px" y="0px" viewBox="0 0 50 50">
                <g>
                  <path d="M39.7,7.1c0.5,0.5,0.5,1.2,0,1.7L29,19.6c-0.5,0.5-1.2,1.2-1.7,1.7L16.5,32.1c-0.5,0.5-1.2,0.5-1.7,0l-2.3-2.3
                        c-0.5-0.5-1.2-1.2-1.7-1.7l-2.3-2.3c-0.5-0.5-0.5-1.2,0-1.7l10.8-10.8c0.5-0.5,1.2-1.2,1.7-1.7L31.7,0.8c0.5-0.5,1.2-0.5,1.7,0
                        l2.3,2.3c0.5,0.5,1.2,1.2,1.7,1.7L39.7,7.1z"/>
                </g>
                <g>
                  <path d="M33.4,49c-0.5,0.5-1.2,0.5-1.7,0L20.9,38.2c-0.5-0.5-1.2-1.2-1.7-1.7L8.4,25.7c-0.5-0.5-0.5-1.2,0-1.7l2.3-2.3
                        c0.5-0.5,1.2-1.2,1.7-1.7l2.3-2.3c0.5-0.5,1.2-0.5,1.7,0l10.8,10.8c0.5,0.5,1.2,1.2,1.7,1.7l10.8,10.8c0.5,0.5,0.5,1.2,0,1.7
                        L37.4,45c-0.5,0.5-1.2,1.2-1.7,1.7L33.4,49z"/>
                </g>
              </svg>
            </div>
                        
            <div (click)="showYearDiv()" class="datepicker__calendar__nav__header__inner__year pointer">
                <span>{{ currentYear }}</span>
            </div>
            
            <div class="datepicker__calendar__nav__arrow" (click)="changeYear('right')" >
              <svg class="datepicker__calendar__nav__chevron" x="0px" y="0px" viewBox="0 0 50 50">
                <g>
                  <path d="M8.4,7.1c-0.5,0.5-0.5,1.2,0,1.7l10.8,10.8c0.5,0.5,1.2,1.2,1.7,1.7l10.8,10.8c0.5,0.5,1.2,0.5,1.7,0l2.3-2.3
                      c0.5-0.5,1.2-1.2,1.7-1.7l2.3-2.3c0.5-0.5,0.5-1.2,0-1.7L29,13.2c-0.5-0.5-1.2-1.2-1.7-1.7L16.5,0.8c-0.5-0.5-1.2-0.5-1.7,0
                      l-2.3,2.3c-0.5,0.5-1.2,1.2-1.7,1.7L8.4,7.1z"/>
                </g>
                <g>
                  <path d="M14.8,49c0.5,0.5,1.2,0.5,1.7,0l10.8-10.8c0.5-0.5,1.2-1.2,1.7-1.7l10.8-10.8c0.5-0.5,0.5-1.2,0-1.7l-2.3-2.3
                      c-0.5-0.5-1.2-1.2-1.7-1.7l-2.3-2.3c-0.5-0.5-1.2-0.5-1.7,0L20.9,28.5c-0.5,0.5-1.2,1.2-1.7,1.7L8.4,40.9c-0.5,0.5-0.5,1.2,0,1.7
                      l2.3,2.3c0.5,0.5,1.2,1.2,1.7,1.7L14.8,49z"/>
                </g>
              </svg>
            </div>          
            
          </div>
          
          <div class="datepicker__calendar__content">
            <div class="grid" [@calendarAnimation]="animate">
            <div class="col-1-4" *ngFor="let month of monthsList">
                <div class="month"
                 [ngStyle]="{ 'background-color': getMonthBackgroundColor(month.value),
                      'color':  isHoveredMonth(month.value) ? accentColor : getMonthFontColor(month.value) }"
                 (mouseenter)="hoveredMonth = month.value"
                 (mouseleave)="hoveredMonth = null"
                 (click)="selectMonth(month.value)"><span>{{month.name}}</span></div>
              </div>

            </div>
            <div class="datepicker__calendar__cancel" (click)="onCancel()">
              Cancel
            </div>
          </div>
          
        </div>
        
        <div *ngIf="showYear" class="datepicker__calendar__inner">
        
          <div class="datepicker__calendar__nav">
            <div class="datepicker__calendar__nav__arrow" (click)="changeYearList('left')" >
              <svg class="datepicker__calendar__nav__chevron" x="0px" y="0px" viewBox="0 0 50 50">
                <g>
                  <path d="M39.7,7.1c0.5,0.5,0.5,1.2,0,1.7L29,19.6c-0.5,0.5-1.2,1.2-1.7,1.7L16.5,32.1c-0.5,0.5-1.2,0.5-1.7,0l-2.3-2.3
                        c-0.5-0.5-1.2-1.2-1.7-1.7l-2.3-2.3c-0.5-0.5-0.5-1.2,0-1.7l10.8-10.8c0.5-0.5,1.2-1.2,1.7-1.7L31.7,0.8c0.5-0.5,1.2-0.5,1.7,0
                        l2.3,2.3c0.5,0.5,1.2,1.2,1.7,1.7L39.7,7.1z"/>
                </g>
                <g>
                  <path d="M33.4,49c-0.5,0.5-1.2,0.5-1.7,0L20.9,38.2c-0.5-0.5-1.2-1.2-1.7-1.7L8.4,25.7c-0.5-0.5-0.5-1.2,0-1.7l2.3-2.3
                        c0.5-0.5,1.2-1.2,1.7-1.7l2.3-2.3c0.5-0.5,1.2-0.5,1.7,0l10.8,10.8c0.5,0.5,1.2,1.2,1.7,1.7l10.8,10.8c0.5,0.5,0.5,1.2,0,1.7
                        L37.4,45c-0.5,0.5-1.2,1.2-1.7,1.7L33.4,49z"/>
                </g>
              </svg>
            </div>
            
            <div class="datepicker__calendar__nav__header__inner__year">
                <span>{{ selectedYearRange }}</span>
            </div>
            
            <div class="datepicker__calendar__nav__arrow" (click)="changeYearList('right')" >
              <svg class="datepicker__calendar__nav__chevron" x="0px" y="0px" viewBox="0 0 50 50">
                <g>
                  <path d="M8.4,7.1c-0.5,0.5-0.5,1.2,0,1.7l10.8,10.8c0.5,0.5,1.2,1.2,1.7,1.7l10.8,10.8c0.5,0.5,1.2,0.5,1.7,0l2.3-2.3
                      c0.5-0.5,1.2-1.2,1.7-1.7l2.3-2.3c0.5-0.5,0.5-1.2,0-1.7L29,13.2c-0.5-0.5-1.2-1.2-1.7-1.7L16.5,0.8c-0.5-0.5-1.2-0.5-1.7,0
                      l-2.3,2.3c-0.5,0.5-1.2,1.2-1.7,1.7L8.4,7.1z"/>
                </g>
                <g>
                  <path d="M14.8,49c0.5,0.5,1.2,0.5,1.7,0l10.8-10.8c0.5-0.5,1.2-1.2,1.7-1.7l10.8-10.8c0.5-0.5,0.5-1.2,0-1.7l-2.3-2.3
                      c-0.5-0.5-1.2-1.2-1.7-1.7l-2.3-2.3c-0.5-0.5-1.2-0.5-1.7,0L20.9,28.5c-0.5,0.5-1.2,1.2-1.7,1.7L8.4,40.9c-0.5,0.5-0.5,1.2,0,1.7
                      l2.3,2.3c0.5,0.5,1.2,1.2,1.7,1.7L14.8,49z"/>
                </g>
              </svg>
            </div>
            
          </div>
          
          <div class="datepicker__calendar__content">
            <div class="grid" [@calendarAnimation]="animate">
              <div class="col-1-5" *ngFor="let year of calendarYears">
                <div class="year"
                 [ngStyle]="{ 'background-color': getYearBackgroundColor(year),
                      'color':  isHoveredYear(year) ? accentColor : getYearFontColor(year) }"
                 (mouseenter)="hoveredYear = year"
                 (mouseleave)="hoveredYear = null"
                 (click)="selectYear(year)"><span>{{year}}</span></div>
              </div>
            </div>
            <div class="datepicker__calendar__cancel" (click)="onCancel()">
              Cancel
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
    `
})
export class DatepickerComponent implements OnInit, OnChanges {
  private dateVal: Date;
  // two way bindings
  @Output() dateChange = new EventEmitter<Date>();

  @Input() get date(): Date { return this.dateVal; };
  set date(val: Date) {
    this.dateVal = val;
    this.dateChange.emit(val);
  }
  // api bindings
  @Input() disabled: boolean;
  @Input() accentColor: string;
  @Input() altInputStyle: boolean;
  @Input() dateFormat: string | DateFormatFunction;
  @Input() fontFamily: string;
  @Input() rangeStart: Date;
  @Input() rangeEnd: Date;
  // data
  @Input() placeholder: string = 'Select a date';
  @Input() inputText: string;
  // view logic
  @Input() showCalendar: boolean;
  // events
  @Output() onSelect = new EventEmitter<Date>();
  // time
  @Input() calendarDays: Array<number>;
  @Input() currentMonth: string;
  @Input() dayNames: Array<String>;
  @Input() hoveredDay: Date;
  hoveredYear: number = null;
  hoveredMonth: number = null;
  calendar: Calendar;
  currentMonthNumber: number;
  currentYear: number;
  months: Array<string>;
  // animation
  animate: string;
  // colors
  colors: { [id: string]: string };
  // listeners
  clickListener: Function;
  // forms
  yearControl: FormControl;
  // Show div for years
  showYear: boolean = false;
  showMonths: boolean = false;
  // list of years
  calendarYears: Array<number>;
  selectedYearRange: string;
  calendarYearRange: any;
  monthsList: Array<{name: string, value: number}>;

  constructor(private renderer: Renderer, private elementRef: ElementRef) {
    this.dateFormat = 'YYYY-MM-DD';
    // view logic
    this.showCalendar = false;
    // colors
    this.colors = {
      'black': '#333333',
      'blue': '#1285bf',
      'lightGrey': '#f1f1f1',
      'darkGrey': '#A9A9A9',
      'white': '#ffffff'
    };
    this.accentColor = this.colors['blue'];
    this.altInputStyle = false;
    // time
    this.calendar = new Calendar();
    this.dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    this.calendarYearRange = {
      '1970-1989': [1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989],
      '1990-2009': [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009],
      '2010-2029': [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029],
      '2030-2049': [2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049],
      '2050-2069': [2050, 2051, 2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059, 2060, 2061, 2062, 2063, 2064, 2065, 2066, 2067, 2068, 2069],
      '2070-2089': [2070, 2071, 2072, 2073, 2074, 2075, 2076, 2077, 2078, 2079, 2080, 2081, 2082, 2083, 2084, 2085, 2086, 2087, 2088, 2089],
      '2090-2109': [2090, 2091, 2092, 2093, 2094, 2095, 2096, 2097, 2098, 2099, 2100, 2101, 2102, 2103, 2104, 2105, 2106, 2107, 2108, 2109]
    };
    this.months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', ' December'
    ];
    this.monthsList = [
      {name: 'Jan', value: 0},
      {name: 'Feb', value: 1},
      {name: 'Mar', value: 2},
      {name: 'Apr', value: 3},
      {name: 'May', value: 4},
      {name: 'Jun', value: 5},
      {name: 'Jul', value: 6},
      {name: 'Aug', value: 7},
      {name: 'Sep', value: 8},
      {name: 'Oct', value: 9},
      {name: 'Nov', value: 10},
      {name: 'Dec', value: 11}
    ];
    // listeners
    this.clickListener = renderer.listenGlobal(
      'document',
      'click',
      (event: MouseEvent) => this.handleGlobalClick(event)
    );
    // form controls
    this.yearControl = new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(4),
      this.yearValidator,
      this.inRangeValidator.bind(this)
    ]));
  }

  ngOnInit() {
    if(this.rangeStart > this.rangeEnd && this.rangeEnd) {
      throw new Error(`
      Error => [rangeStart] > [rangeEnd]
       
      rangeStart cannot be greater than rangeEnd`)
    }
    this.syncVisualsWithDate();
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if ((changes['date'] || changes['dateFormat'])) {
      this.syncVisualsWithDate();
    }
  }

  ngOnDestroy() {
    this.clickListener();
  }

  // -------------------------------------------------------------------------------- //
  // -------------------------------- State Management ------------------------------ //
  // -------------------------------------------------------------------------------- //
  /**
  * Closes the calendar and syncs visual components with selected or current date.
  * This way if a user opens the calendar with this month, scrolls to two months from now,
  * closes the calendar, then reopens it, it will open with the current month
  * or month associated with the selected date
  */
  closeCalendar(): void {
    this.showCalendar = false;
    this.syncVisualsWithDate();
  }

  /**
  * Sets the date values associated with the ui
  */
  private setCurrentValues(date: Date) {
    this.currentMonthNumber = date.getMonth();
    this.currentMonth = this.months[this.currentMonthNumber];

    this.currentYear = date.getFullYear();
    this.yearControl.setValue(this.currentYear);

    const calendarArray = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
    this.calendarDays = [].concat.apply([], calendarArray);
  }

  /**
  * Visually syncs calendar and input to selected date or current day
  */
  syncVisualsWithDate(): void {
    if (this.date) {
      this.setInputText(this.date);
      this.setCurrentValues(this.date);
    } else {
      this.inputText = '';
      this.setCurrentValues(new Date());
    }
  }

  /**
  * Sets the currentMonth and creates new calendar days for the given month
  */
  setCurrentMonth(monthNumber: number): void {
    this.currentMonth = this.months[monthNumber];
    const calendarArray = this.calendar.monthDays(this.currentYear, this.currentMonthNumber);
    this.calendarDays = [].concat.apply([], calendarArray);
  }

  /**
  * Sets the currentYear and FormControl value associated with the year
  */
  setCurrentYear(year: number): void {
    this.currentYear = year;
    this.yearControl.setValue(year);
  }

  /**
  * Sets the visible input text
  */
  setInputText(date: Date): void {
    let month: string = (date.getMonth() + 1).toString();
    // always prefixes one digit numbers with a 0
    if (month.length < 2) {
      month = `0${month}`;
    }
    let day: string = (date.getDate()).toString();
    if (day.length < 2) {
      day = `0${day}`;
    }
    // transforms input text into appropiate date format
    let inputText: string = '';
    const dateFormat: string | DateFormatFunction = this.dateFormat;
    if (typeof dateFormat === 'string') {
      switch (dateFormat.toUpperCase()) {
        case 'YYYY-MM-DD':
          inputText = `${date.getFullYear()}/${month}/${day}`;
          break;
        case 'MM-DD-YYYY':
          inputText = `${month}/${day}/${date.getFullYear()}`;
          break;
        case 'DD-MM-YYYY':
          inputText = `${day}/${month}/${date.getFullYear()}`;
          break;
        default:
          inputText = `${date.getFullYear()}/${month}/${day}`;
          break;
      }
    } else if (typeof dateFormat === 'function') {
      inputText = dateFormat(date);
    }

    this.inputText = inputText;
  }

  /**
   * Show or hide the list of years
   */
  showYearDiv() {
    this.showYear = !this.showYear;
    Object.keys(this.calendarYearRange)
      .map((eachRange) => {
        if (this.calendarYearRange[eachRange].indexOf(this.currentYear) >= 0) {
          this.calendarYears = this.calendarYearRange[eachRange];
          this.selectedYearRange = eachRange;
        }
      });
  }

  /**
   * Sets the currentMonth and creates new calendar days for the given month
   */
  selectMonth(monthId: number) {
    this.currentMonthNumber = monthId;
    this.setCurrentMonth(monthId);
    setTimeout(() => this.showMonths = !this.showMonths);
  }

  /**
   * Show or hide the list of Months
   */
  showMonthsDiv() {
    this.showMonths = !this.showMonths;
  }

  // -------------------------------------------------------------------------------- //
  // --------------------------------- Click Handlers ------------------------------- //
  // -------------------------------------------------------------------------------- //
  /**
  * Sets the date values associated with the calendar.
  * Triggers animation if the month changes
  */
  onArrowClick(direction: string): void {
    const currentMonth: number = this.currentMonthNumber;
    let newYear: number = this.currentYear;
    let newMonth: number;
    // sets the newMonth
    // changes newYear is necessary
    if (direction === 'left') {
      if (currentMonth === 0) {
        newYear = this.currentYear - 1;
        newMonth = 11;
      } else {
        newMonth = currentMonth - 1;
      }
    } else if (direction === 'right') {
      if (currentMonth === 11) {
        newYear = this.currentYear + 1;
        newMonth = 0;
      } else {
        newMonth = currentMonth + 1;
      }
    }
    // check if new date would be within range
    let newDateValid: boolean;
    if (direction === 'left') {
      newDateValid = !this.rangeStart || (new Date(newYear, newMonth, this.rangeStart.getDate()+1)) >= this.rangeStart;
    } else if (direction === 'right') {
      newDateValid = !this.rangeEnd || (new Date(newYear, newMonth, this.rangeEnd.getDate())) <= this.rangeEnd;
    }

    if (newDateValid) {
      this.setCurrentYear(newYear);
      this.currentMonthNumber = newMonth;
      this.setCurrentMonth(newMonth);
      this.triggerAnimation(direction);
    }
  }

  /**
  * Sets the date values associated with the calendar.
  * Triggers animation if the year changes
  */
  changeYear(direction: string): void {
    if (direction === 'left') {
      if (this.currentYear !== 1970) {
        this.currentYear = this.currentYear - 1;
      }
    } else if (direction === 'right') {
      if (this.currentYear !== 2109) {
        this.currentYear = this.currentYear + 1;
      }
    }
    this.setCurrentYear(this.currentYear);
  }

  /**
  * Closes the calendar when the cancel button is clicked
  */
  onCancel(): void {
    this.closeCalendar();
  }

  /**
  * Toggles the calendar when the date input is clicked
  */
  onInputClick(): void {
    this.showCalendar = !this.showCalendar;
  }

  /**
  * Returns the font color for a day
  */
  onSelectDay(day: Date): void {
    this.date = day;
    this.onSelect.emit(day);
    this.showCalendar = !this.showCalendar;
  }

  /**
  * Sets the current year and current month if the year from
  * yearControl is valid
  */
  onYearSubmit(): void {
    if (this.yearControl.valid && +this.yearControl.value !== this.currentYear) {
      this.setCurrentYear(+this.yearControl.value);
      this.setCurrentMonth(this.currentMonthNumber);
    } else {
      this.yearControl.setValue(this.currentYear);
    }
  }

  /**
   * Update calendar on year selection
   */
  selectYear(year: number) {
    this.currentYear = year;
    this.setCurrentMonth(this.currentMonthNumber);
    setTimeout(() => this.showYear = false);
  }

  /**
   * Sets the date values associated with the calendar.
   * Triggers animation if the year changes
   */
  changeYearList(direction: string) {
    let newYearRange: string;
    if (direction === 'left') {
      newYearRange = `${+(this.selectedYearRange.split('-'))[0] - 20}-${+(this.selectedYearRange.split('-'))[0] - 1}`;
      if (newYearRange in this.calendarYearRange) {
        this.triggerAnimation(direction);
        this.selectedYearRange = newYearRange;
        this.calendarYears = this.calendarYearRange[newYearRange];
      }
    } else if (direction === 'right') {
      newYearRange = `${+(this.selectedYearRange.split('-'))[1] + 1}-${+(this.selectedYearRange.split('-'))[1] + 20}`;
      if (newYearRange in this.calendarYearRange) {
        this.triggerAnimation(direction);
        this.selectedYearRange = newYearRange;
        this.calendarYears = this.calendarYearRange[newYearRange];
      }
    }
  }

  // -------------------------------------------------------------------------------- //
  // ----------------------------------- Listeners ---------------------------------- //
  // -------------------------------------------------------------------------------- //
  /**
  * Closes the calendar if a click is not within the datepicker component
  */
  handleGlobalClick(event: MouseEvent): void {
    const withinElement = this.elementRef.nativeElement.contains(event.target);
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeCalendar();
    }
  }

  // -------------------------------------------------------------------------------- //
  // ----------------------------------- Helpers ------------------------------------ //
  // -------------------------------------------------------------------------------- //
  /**
  * Returns the background color for a day
  */
  getDayBackgroundColor(day: Date): string {
    let color = this.colors['white'];
    if (this.isChosenDay(day)) {
      color = this.accentColor;
    } else if (this.isCurrentDay(day)) {
      color = this.colors['lightGrey'];
    }
    return color;
  }

  /**
   * Returns the background color for a year
   */
  getYearBackgroundColor(year: number): string {
    let color = this.colors['white'];
    if (this.date && this.date.getFullYear() === year) {
      color = this.accentColor;
    } else if (year === (new Date()).getUTCFullYear()) {
      color = this.colors['lightGrey'];
    }
    return color;
  }

  /**
   * Returns the background color for a month
   */
  getMonthBackgroundColor(month: number) {
    let color = this.colors['white'];
    if (this.currentMonthNumber === month && this.date && this.currentYear === this.date.getFullYear()) {
      color = this.accentColor;
    } else if (month === (new Date()).getMonth() && this.currentYear === (new Date()).getUTCFullYear()) {
      color = this.colors['lightGrey'];
    }
    return color;
  }

  /**
  * Returns the font color for a day
  */
  getDayFontColor(day: Date): string {
    let color = this.colors['black'];
    if (this.isChosenDay(day)) {
      color = this.colors['white'];
    } else if (!this.isSelectableDate(day)) {
      color = this.colors['darkGrey'];
    }
    return color;
  }

  /**
  * Returns the day is between rangeStart and rangeEnd
  */
  isSelectableDate(day: Date): boolean {
    if(this.rangeStart && this.rangeEnd) {
      return (day >= this.rangeStart && day <= this.rangeEnd);
    } else if(this.rangeStart) {
      return (day >= this.rangeStart);
    } else if(this.rangeEnd) {
      return (day <= this.rangeEnd);
    }
    return true;
  }

  /**
   * Returns the font color for a year
   */
  getYearFontColor(year: number): string {
    let color = this.colors['black'];
    if (this.date && this.date.getFullYear() === year) {
      color = this.colors['white'];
    }
    return color;
  }

  /**
   * Returns the font color for a month
   */
  getMonthFontColor(month: number): string {
    let color = this.colors['black'];
    if (month === this.currentMonthNumber && this.date && this.currentYear === this.date.getFullYear()) {
      color = this.colors['white'];
    }
    return color;
  }

  /**
  * Returns whether a day is the chosen day
  */
  isChosenDay(day: Date): boolean {
    if (day) {
      return this.date ? day.toDateString() === this.date.toDateString() : false;
    } else {
      return false;
    }
  }

  /**
  * Returns whether a day is the current calendar day
  */
  isCurrentDay(day: Date): boolean {
    if (day) {
      return day.toDateString() === new Date().toDateString();
    } else {
      return false;
    }
  }

  /**
  * Returns whether a day is the day currently being hovered
  */
  isHoveredDay(day: Date): boolean {
    return this.hoveredDay ? this.hoveredDay === day && !this.isChosenDay(day) && this.isSelectableDate(day) : false;
  }

  /**
   * Returns whether a year is the year currently being hovered
   */
  isHoveredYear(year: number): boolean {
    return this.hoveredYear ? (this.hoveredYear === year) && !(this.currentYear === year) : false;
  }

  /**
   * Returns whether a year is the year currently being hovered
   */
  isHoveredMonth(month: number): boolean {
    return this.hoveredMonth ? (this.hoveredMonth === month) && !(this.currentMonthNumber === month) : false;
  }

  /**
  * Triggers an animation and resets to initial state after the duration of the animation
  */
  triggerAnimation(direction: string): void {
    this.animate = direction;
    setTimeout(() => this.animate = 'reset', 185);
  }

  // -------------------------------------------------------------------------------- //
  // ---------------------------------- Validators ---------------------------------- //
  // -------------------------------------------------------------------------------- //
  /**
  * Validates that a value is within the 'rangeStart' and/or 'rangeEnd' if specified
  */
  inRangeValidator(control: FormControl): ValidationResult {
    const value = control.value;

    if (this.currentMonthNumber) {
      const tentativeDate = new Date(+value, this.currentMonthNumber);
      if (this.rangeStart && tentativeDate.getTime() < this.rangeStart.getTime()) {
        return { 'yearBeforeRangeStart': true };
      }
      if (this.rangeEnd && tentativeDate.getTime() > this.rangeEnd.getTime()) {
        return { 'yearAfterRangeEnd': true };
      }
      return null;
    }

    return { 'currentMonthMissing': true };
  }

  /**
  * Validates that a value is a number greater than or equal to 1970
  */
  yearValidator(control: FormControl): ValidationResult {
    const value = control.value;
    const valid = !isNaN(value) && value >= 1970 && Math.floor(value) === +value;
    if (valid) {
      return null;
    }
    return { 'invalidYear': true };
  }

}
