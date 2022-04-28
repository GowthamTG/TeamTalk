import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageFavouritesComponent } from './manage-favourites/manage-favourites.component';

const routes: Routes = [
  {
    path: 'user-chats',
    component: ManageFavouritesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavouritesRoutingModule {}
