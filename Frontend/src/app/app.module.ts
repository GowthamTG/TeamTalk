import { ErrorInterceptor } from './error/error.interceptor';
import { AuthInterceptor } from './services/auth/auth.interceptor';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { SocketIoConfig } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';
import { NavBarComponent } from './partials/nav-bar/nav-bar.component';
import { HeaderComponent } from './partials/header/header.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';

const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    HomePageComponent,
    UserHomePageComponent,
    NavBarComponent,
    HeaderComponent,
    AuthLayoutComponent,
    ContentLayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterTestingModule,
    RouterModule,
    MatDialogModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,

    // SocketIoModule.forRoot(config),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
