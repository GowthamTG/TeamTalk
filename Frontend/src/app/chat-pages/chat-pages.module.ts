import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatsPageRoutingModule } from './chat-pages-routing.module';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { SelectUsersComponent } from './select-users/select-users.component';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { JoinMeetChatComponent } from './join-meet-chat/join-meet-chat.component';

@NgModule({
  declarations: [
    ChatPageComponent,
    ChatRoomComponent,
    ChatMessageComponent,
    CreateRoomComponent,
    SelectUsersComponent,
    JoinMeetChatComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ChatsPageRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatOptionModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSelectModule,
  ],
})
export class ChatPagesModule {}
