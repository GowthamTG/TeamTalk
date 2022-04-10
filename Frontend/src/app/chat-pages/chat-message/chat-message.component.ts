import { Component, Input, OnInit } from '@angular/core';
import { MessageI } from 'src/app/interfaces/message.interface';
import { UserI } from 'src/app/interfaces/user.interface';

import { GlobalStoreService } from 'src/app/services/global/global-store.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent {
  @Input() message: MessageI | undefined;
  user: UserI = this.globalStore.getGlobalStore();

  constructor(private globalStore: GlobalStoreService) {}
}
