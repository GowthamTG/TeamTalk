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
    message: string;
    token: string;
    email: string;
    username: string;
    name: string;
  }) {
    const token = response.token;
    this.token = token;
    if (token) {
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      this.saveAuthData(token, response.name, response.email);
      this.router.navigate(['/home']);
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

  private saveAuthData(token: string, userName: string, email: string) {
    this.GlobalService.setGlobalStore(token, userName, email);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
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
}
