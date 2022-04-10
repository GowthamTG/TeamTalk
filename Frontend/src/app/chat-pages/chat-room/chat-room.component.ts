import {
  Component,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
  SimpleChanges,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, combineLatest, startWith, map, tap } from 'rxjs';
import { MessagePaginateI } from 'src/app/interfaces/message.interface';
import { RoomI } from 'src/app/interfaces/room.interface';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnChanges, OnDestroy, AfterViewInit {
  // @Input() chatRoom: RoomI | undefined;
  // @ViewChild('messages') private messagesScroller!: ElementRef;
  // messagesPaginate$: Observable<MessagePaginateI> = combineLatest([
  //   this.chatService.getMessages(),
  //   this.chatService.getAddedMessage().pipe(startWith(null)),
  // ]).pipe(
  //   map(([messagePaginate, message]) => {
  //     if (
  //       message &&
  //       message.room.id === this.chatRoom!.id &&
  //       !messagePaginate.items.some((m: any) => m.id === message.id)
  //     ) {
  //       messagePaginate.items.push(message);
  //     }
  //     const items = messagePaginate.items.sort(
  //       (a: any, b: any) =>
  //         new Date(a.created_at!).getTime() - new Date(b.created_at!).getTime()
  //     );
  //     messagePaginate.items = items;
  //     return messagePaginate;
  //   }),
  //   tap(() => this.scrollToBottom())
  // );
  // chatMessage: FormControl = new FormControl(null, [Validators.required]);
  // constructor(private chatService: ChatService) {}
  // ngOnChanges(changes: SimpleChanges) {
  //   this.chatService.leaveRoom(changes['chatRoom'].previousValue);
  //   if (this.chatRoom) {
  //     this.chatService.joinRoom(this.chatRoom);
  //   }
  // }
  // ngAfterViewInit() {
  //   if (this.messagesScroller) {
  //     this.scrollToBottom();
  //   }
  // }
  // ngOnDestroy() {
  //   this.chatService.leaveRoom(this.chatRoom!);
  // }
  // sendMessage() {
  //   this.chatService.sendMessage({
  //     text: this.chatMessage.value,
  //     room: this.chatRoom!,
  //   });
  //   this.chatMessage.reset();
  // }
  // scrollToBottom(): void {
  //   try {
  //     setTimeout(() => {
  //       this.messagesScroller.nativeElement.scrollTop =
  //         this.messagesScroller.nativeElement.scrollHeight;
  //     }, 1);
  //   } catch {}
  // }
  constructor() {}
  ngOnDestroy(): void {}
  ngOnChanges(changes: SimpleChanges): void {}
  ngAfterViewInit(): void {}
}
