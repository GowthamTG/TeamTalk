import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { GroupsPageComponent } from './groups-page/groups-page.component';

const routes: Routes = [
  {
    path: '',
    component: GroupsPageComponent,
  },
  {
    path: 'schedule',
    component: CalendarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsRoutingModule {}
