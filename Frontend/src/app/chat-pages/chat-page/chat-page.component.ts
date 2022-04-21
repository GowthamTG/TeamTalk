import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserI } from 'src/app/interfaces/user.interface';
import { ChatService } from 'src/app/services/chat/chat.service';
import { GlobalStoreService } from 'src/app/services/global/global-store.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
})
export class ChatPageComponent implements OnInit, OnDestroy {
  onlineUser: any = [];
  u!: string;
  roomsForChat: any = ['Angular', 'React', 'Vue'];
  joined: any = false;
  messageArray: Array<{ user: String; message: String }> = [];
  join_message!: string | null;
  leave_message!: string | null;
  count: any;
  userInfo: any;
  userData!: UserI;
  chatForm: FormGroup = this.fb.group({
    user: ['', [Validators.required]],
    room: ['', [Validators.required]],
    messageText: [''],
  });

  constructor(
    private globalService: GlobalStoreService,
    private _chatService: ChatService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  join() {
    this.joined = true;
    this.leave_message = null;
    this.join_message = 'You have joined the room ' + this.room?.value;
    this._chatService.joinRoom({
      user: this.chatForm.get('user')!.value,
      room: this.chatForm.get('room')!.value,
    });
  }

  leave() {
    this.joined = false;
    this.join_message = null;
    this.leave_message = 'You have  left the room ' + this.room?.value;
    this._chatService.leaveRoom({
      user: this.chatForm.get('user')!.value,
      room: this.chatForm.get('room')!.value,
    });
  }

  sendMessage() {
    this._chatService.sendMessage({
      user: this.chatForm.get('user')!.value,
      room: this.chatForm.get('room')!.value,
      message: this.chatForm.get('messageText')!.value,
    });
  }

  ngOnInit() {
    this.userData = this.globalService.getGlobalStore();
    this.route.queryParams.subscribe((params: any) => {
      console.log(params); // { category: "fiction" }
      console.log(params['meetId']);

      this.chatForm.setValue({
        user: this.userData.name,
        room: params['meetId'],
        messageText: '',
      });
      console.log(this.chatForm.value);
      this._chatService
        .newUserJoined()
        .subscribe((data: any) => this.messageArray.push(data));
      this._chatService
        .userLeftRoom()
        .subscribe((data: any) => this.messageArray.push(data));
      this._chatService
        .newMessageReceived()
        .subscribe((data: any) => this.messageArray.push(data));
      this._chatService.totalUsers().subscribe((data: any) => {
        this.count = data.count;
      });
      this.userInfo = history.state;
      this.u = this.userInfo.email;
      this.join();
    });
  }
  // Choose room using select dropdown
  changeRoom(e: any) {
    console.log(e.value);
    this.room!.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  get room() {
    return this.chatForm.get('room');
  }
  get user() {
    return this.chatForm.get('user');
  }
  //to get list of online users
  getOnlineUsers() {}

  ngOnDestroy(): void {
    this.leave();
  }
  // constructor() {}
  // ngOnInit(): void {}
}
