import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-page-routing.module';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { GroupsPageComponent } from './groups-page/groups-page.component';
import { SelectUsersComponent } from './select-users/select-users.component';
import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
  declarations: [GroupsPageComponent, SelectUsersComponent, CalendarComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatButtonToggleModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
})
export class GroupsPageModule {}
