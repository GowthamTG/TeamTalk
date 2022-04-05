import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsPageComponent } from './groups-page/groups-page.component';

const routes: Routes = [
  {
    path: '',
    component: GroupsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsRoutingModule {}
