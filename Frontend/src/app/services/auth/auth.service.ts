import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Socket } from 'ngx-socket-io';

import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { GlobalStoreService } from '../global/global-store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private token!: string | null;
  private authStatusListener = new Subject<boolean>();

  constructor(
    private router: Router,
    private GlobalService: GlobalStoreService
  ) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(response: {
    id: string;
    message: string;
    email: string;
    name: string;
    token: string;
    ownedMeets: string[];
    favourites: string[];
  }) {
    const token = response.token;
    this.token = token;
    if (token) {
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      this.saveAuthData(
        response.id,
        token,
        response.name,
        response.email,
        response.ownedMeets,
        response.favourites
      );
      this.router.navigate(['/groups']);
    }
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    this.token = authInformation.token;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this.router.navigate(['/auth', 'login']);
  }

  private saveAuthData(
    id: string,
    token: string,
    name: string,
    email: string,
    ownedMeets: string[],
    favourites: string[]
  ) {
    this.GlobalService.setGlobalStore(
      id,
      token,
      name,
      email,
      ownedMeets,
      favourites
    );
  }

  clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('ownedMeets');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }
    return {
      token: token,
    };
  }
  //   getLoggedInUser() {
  //     const token = this.getAuthData()?.token;
  //     if(token)
  //   }
  //   function parseJwt (token) {
  //     var base64Url = token.split('.')[1];
  //     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //     var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
  //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //     }).join(''));

  //     return JSON.parse(jsonPayload);
  // };
}
