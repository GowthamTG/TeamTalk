import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalStoreService {
  constructor() {}
  getGlobalStore() {
    return {
      token: localStorage.getItem('token'),
      userName: localStorage.getItem('username'),
      email: localStorage.getItem('email'),
    };
  }

  setGlobalStore(token: string, userName: string, email: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('name', userName);
    localStorage.setItem('email', email);
  }
}
