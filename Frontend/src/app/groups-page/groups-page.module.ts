import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-page-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';

import { GroupsPageComponent } from './groups-page/groups-page.component';
@NgModule({
  declarations: [GroupsPageComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
  ],
})
export class GroupsPageModule {}
