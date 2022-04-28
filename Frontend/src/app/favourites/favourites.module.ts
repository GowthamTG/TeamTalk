import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageFavouritesComponent } from './manage-favourites/manage-favourites.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ManageFavouritesComponent],
  imports: [CommonModule, MatCardModule, MatGridListModule, MatIconModule],
})
export class FavouritesModule {}
