import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth/auth.gaurd';
import { AuthInterceptor } from './services/auth/auth.interceptor';

// import { AdminGuard } from './modules/auth/assets/admin/admin.guard';
// import { AuthGuard } from './modules/auth/assets/user/auth.guard';

const routes: Routes = [
  { path: 'chat', component: ChatComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./auth-pages/auth-pages.module').then((m) => m.AuthPagesModule),
  },
  {
    path: 'groups',
    component: ContentLayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./groups-page/groups-page.module').then(
        (m) => m.GroupsPageModule
      ),
  },
  {
    path: 'chats',
    component: ContentLayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./chat-pages/chat-pages.module').then((m) => m.ChatPagesModule),
  },
  {
    path: 'users',
    component: ContentLayoutComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./favourites/favourites.module').then((m) => m.FavouritesModule),
  },

  { path: '**', redirectTo: 'auth/login' },
];

//   {
//     path: '',
//     component: ContentLayoutComponent,
//     loadChildren: () =>
//       import('./modules/home/home.module').then((m) => m.HomeModule),
//   },
//   {
//     path: '',
//     component: ContentLayoutComponent,
//     loadChildren: () =>
//       import('./modules/pages/pages.module').then((m) => m.PagesModule),
//     canActivate: [AuthGuard],
//   },
//   {
//     path: '',
//     component: ContentLayoutComponent,
//     loadChildren: () =>
//       import('./modules/admin/admin.module').then((m) => m.AdminModule),
//     canActivate: [AdminGuard, AuthGuard],
//   },

//   {
//     path: 'verification/verify-account/:email/:token',
//     component: MailVerificationComponent,
//   },
//   {
//     path: 'verification/verify-email/:email/:token',
//     component: MailVerificationComponent,
//   },

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  //   providers: [AdminGuard, AuthGuard],
})
export class AppRoutingModule {}
