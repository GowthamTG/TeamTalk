import { ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
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

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: this.colors.high,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: this.colors.medium,
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: this.colors.medium,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: this.colors.low,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];
  userData!: UserI;
  activeDayIsOpen: boolean = true;

  constructor(
    private dialog: MatDialog,
    private globalService: GlobalStoreService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    console.log(this.events);
    this.userData = this.globalService.getGlobalStore();
    this.apiService.getAllEvents(this.userData.id).subscribe(
      (res: any) => {
        console.log(this.events[0]);
        console.log(res);

        this.events = res;
      },
      (err) => {}
    );
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
    this.events = [
      ...this.events,
      {
        title: 'New Ticket',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: this.colors.low,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];

    const dialogRef = this.dialog.open(CreateEventComponent, {
      data: {
        heading: `Event Created`,
        message: `Event Created Successfully`,
      },
    });
    dialogRef.afterClosed().subscribe((userId) => {
      // this.apiService.getAllEvents(userId).subscribe(
      //   (res: any) => {
      //     console.log(this.events[0]);
      //     console.log(res);
      //     this.events = res;
      //   },
      //   (err) => {}
      // );
    });
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
