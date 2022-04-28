import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
} from '@angular/core';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  CalendarView,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';
import {
  subDays,
  startOfDay,
  addDays,
  endOfMonth,
  addHours,
  isSameMonth,
  isSameDay,
  endOfDay,
} from 'date-fns';
import { Subject } from 'rxjs';
import { UserI } from 'src/app/interfaces/user.interface';
import { ApiService } from 'src/app/services/apis/api.service';
import { GlobalStoreService } from 'src/app/services/global/global-store.service';
import { CreateEventComponent } from '../create-event/create-event.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true })
  modalContent!: TemplateRef<any>;

  colors: any = {
    high: {
      primary: '#C10009',
      secondary: '#FF8A94',
    },
    medium: {
      primary: '#ffa200',
      secondary: '#ffe183',
    },
    low: {
      primary: '#a8addb',
      secondary: '#cacde9',
    },
  };
  showSpinner: boolean = true;
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];
  userData!: UserI;
  activeDayIsOpen: boolean = true;

  constructor(
    private dialog: MatDialog,
    private globalService: GlobalStoreService,
    private apiService: ApiService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getAllEvents();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
  }

  addEvent(): void {
    const dialogRef = this.dialog.open(CreateEventComponent);
    dialogRef.afterClosed().subscribe((userId) => {
      this.getAllEvents();
    });
  }

  getAllEvents() {
    console.log(this.events);
    this.showSpinner = true;
    this.userData = this.globalService.getGlobalStore();
    this.apiService.getAllEvents(this.userData.id).subscribe(
      (res: any) => {
        console.log(this.events[0]);
        console.log(res);
        res.response.forEach((e: any) => {
          e.start = new Date(e.start);
          e.end = new Date(e.end);
          e.color = this.colors[e.priority];
          e.actions = this.actions;
          delete e.priority;
        });
        // console.log(new Date(res.response[0].start));
        console.log(res);

        this.events = res.response;
        this.showSpinner = false;
        this.cd.detectChanges();
      },
      (err) => {
        this.showSpinner = false;
        this.cd.detectChanges();
      }
    );
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
