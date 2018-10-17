import {
  Component, OnInit, Output, HostListener, EventEmitter, Renderer, AfterViewInit, Pipe, PipeTransform, Input,
  SimpleChanges, ElementRef, ViewChild, ViewContainerRef, ComponentFactoryResolver
} from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import * as _ from "lodash";
const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;


@Component({
  // moduleId: module.id,
  selector: 'app-daterange',
  templateUrl: 'daterange.component.html',
  host: {
    '(document:click)': 'handleClick($event)',
  },
  styleUrls: ['daterange.component.css']
})
export class DateRangeComponent {

  @Input() daterange: any;
  @Output() valueChange = new EventEmitter();


  show = false;
  hoveredDate: NgbDateStruct;

  fromDate: NgbDateStruct = null;
  toDate: NgbDateStruct = null;

  displayMonths = 2;
  navigation = 'arrow';
  showWeekNumbers = false;
  disableApply = false;

  elementRef;

  constructor(calendar: NgbCalendar, myElement: ElementRef) {
    this.elementRef = myElement;
    this.reset();
  }

  getDate(date: NgbDateStruct) {
    if (date != null) {
      return new Date(date.year, (date.month - 1), date.day);
    }
    return null;
  }

  onDateSelection(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);
  isSunday = date => this.getDate(date).getDay() == 0;
  isMonday = date => this.getDate(date).getDay() == 1;

  toggle() {
    this.show = !this.show;
  }
  handleClick(event) {
    if (this.show) {
      var clickedComponent = event.target;
      var inside = false;
      do {
        if (clickedComponent === this.elementRef.nativeElement) {
          inside = true;
        }
        clickedComponent = clickedComponent.parentNode;
      } while (clickedComponent);
      if (inside) {
        console.log('inside');
      } else {
        this.toggle();
      }
    }
  }
  reset() {
    if (this.daterange == undefined) {
      this.daterange = {};
      this.daterange.fromDate = null;
      this.daterange.toDate = null;
      this.fromDate = null;
      this.toDate = null;
    } else {
      this.fromDate = this.daterange.fromDate;
      this.toDate = this.daterange.toDate;
    }
  }

  clear() {
    if (this.daterange != undefined) {
      this.daterange = {};
      this.daterange.fromDate = null;
      this.daterange.toDate = null;
    }
    this.fromDate = null;
    this.toDate = null;
    this.valueChange.emit(this.daterange);
  }

  apply() {
    if (this.daterange == undefined) {
      this.daterange = {};
    }
    if (!this.fromDate) {
      this.clear();
      return;
    }
    if (this.fromDate && !this.toDate) {
      var date = new Date();
      this.toDate = { day: date.getUTCDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear() };;
    }
    this.daterange.fromDate = this.fromDate;
    this.daterange.toDate = this.toDate;
    this.valueChange.emit(this.daterange);
    this.toggle();
  }

}
