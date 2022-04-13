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
      ownedMeets: localStorage.getItem('ownedMeets')?.split(','),
    };
  }

  setGlobalStore(
    id: string,
    token: string,
    name: string,
    email: string,
    ownedMeets: string[]
  ) {
    console.log('Setting Local');
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('ownedMeets', ownedMeets.toString());
  }
}
