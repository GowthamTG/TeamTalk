import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { GroupsRoutingModule } from './groups-page-routing.module';

import { GroupsPageComponent } from './groups-page/groups-page.component';
import { SelectUsersComponent } from './select-users/select-users.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    GroupsPageComponent,
    SelectUsersComponent,
    CalendarComponent,
    CreateEventComponent,
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,

    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
})
export class GroupsPageModule {}
