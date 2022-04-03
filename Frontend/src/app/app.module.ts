import { ErrorInterceptor } from './error/error.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';
import { NavBarComponent } from './partials/nav-bar/nav-bar.component';
import { HeaderComponent } from './partials/header/header.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { AppRoutingModule } from './app-routing.module';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';

import { AuthInterceptor } from './services/auth/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterTestingModule,
    RouterModule,
    MatDialogModule,
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
