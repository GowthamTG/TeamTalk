import { Injectable } from '@angular/core';
import { UserI } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class GlobalStoreService {
  constructor() {}
  getGlobalStore(): UserI {
    return {
      id: localStorage.getItem('id'),
      token: localStorage.getItem('token'),
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      ownedMeets:
        localStorage.getItem('ownedMeets')?.split(',') === ['']
          ? []
          : localStorage.getItem('ownedMeets')?.split(','),
      favourites:
        localStorage.getItem('favourites')?.split(',') === ['']
          ? []
          : localStorage.getItem('favourites')?.split(','),
    };
  }

  setGlobalStore(
    id: string,
    token: string,
    name: string,
    email: string,
    ownedMeets: string[],
    favourites: string[],
    userStatus: string
  ) {
    console.log('Setting Local');
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('ownedMeets', ownedMeets.toString());
    localStorage.setItem('favourites', favourites.toString());
    localStorage.setItem('userStatus',userStatus);
  }

  saveFavourites(favourites: string[]) {
    localStorage.setItem('favourites', favourites.toString());
  }
}
