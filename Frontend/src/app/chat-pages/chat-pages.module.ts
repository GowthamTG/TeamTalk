import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatsPageRoutingModule } from './chat-pages-routing.module';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { PersonalChatComponent } from './personal-chat/personal-chat.component';

@NgModule({
  declarations: [
    ChatPageComponent,
    ChatRoomComponent,
    ChatMessageComponent,
    CreateRoomComponent,
    SelectUsersComponent,
    JoinMeetChatComponent,
    PersonalChatComponent,
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
    MatButtonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule
  ],
})
export class ChatPagesModule {}
