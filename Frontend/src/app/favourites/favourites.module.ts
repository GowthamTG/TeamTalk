import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageFavouritesComponent } from './manage-favourites/manage-favourites.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { FavouritesRoutingModule } from './favourites.routing.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ManageFavouritesComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    FavouritesRoutingModule,
  ],
})
export class FavouritesModule {}
