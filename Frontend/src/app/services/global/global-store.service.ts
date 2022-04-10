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
      username: localStorage.getItem('username'),
      email: localStorage.getItem('email'),
    };
  }

  setGlobalStore(id: string, token: string, userName: string, email: string) {
    console.log('Setting Local');
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('name', userName);
    localStorage.setItem('email', email);
  }
}
