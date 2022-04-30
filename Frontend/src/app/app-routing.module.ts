import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth/auth.gaurd';
import { AuthGuardService } from './services/auth/auth-guard.service';
const routes: Routes = [
 
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentLayoutComponent, 
    canActivateChild:[AuthGuardService],
    children: [
      {
        path: 'groups',
        // component: ContentLayoutComponent,
        canActivateChild:[AuthGuardService],
        loadChildren: () =>
          import('./groups-page/groups-page.module').then(
            (m) => m.GroupsPageModule
          ),
      },
      {
        path: 'chats',
        // component: ContentLayoutComponent,
        canActivateChild: [AuthGuardService],
        loadChildren: () =>
          import('./chat-pages/chat-pages.module').then((m) => m.ChatPagesModule),
      },
      {
        path: 'users',
        // component: ContentLayoutComponent,
        canActivateChild: [AuthGuardService],
        loadChildren: () =>
          import('./favourites/favourites.module').then((m) => m.FavouritesModule),
      },
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate :[AuthGuardService],
    loadChildren: () =>
      import('./auth-pages/auth-pages.module').then((m) => m.AuthPagesModule),
  },
  { 
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthGuardService]
   },
  { 
    path: 'register', 
    component: RegisterComponent,
    canActivate: [AuthGuardService]
   },
  

  { path: '**', redirectTo: 'auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
