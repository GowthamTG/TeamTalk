import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';



@NgModule({
  declarations: [
    ChatPageComponent,
    ChatRoomComponent,
    ChatMessageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ChatPagesModule { }
