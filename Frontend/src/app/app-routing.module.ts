import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './services/auth/auth.gaurd';

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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
