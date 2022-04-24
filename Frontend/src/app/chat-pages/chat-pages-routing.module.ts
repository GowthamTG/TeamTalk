import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { CreateRoomComponent } from './create-room/create-room.component';

const routes: Routes = [
  {
    path: 'create-room',
    component: CreateRoomComponent,
  },
  { path: 'chat', component: ChatPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatsPageRoutingModule {}
