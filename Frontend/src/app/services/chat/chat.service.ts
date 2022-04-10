// import { Injectable } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Socket } from 'ngx-socket-io';
// import { Observable } from 'rxjs';
// import {
//   MessageI,
//   MessagePaginateI,
// } from 'src/app/interfaces/message.interface';
// import { RoomI, RoomPaginateI } from 'src/app/interfaces/room.interface';

// @Injectable({
//   providedIn: 'root',
// })
// export class ChatService {
//   constructor(private socket: Socket, private snackbar: MatSnackBar) {}

//   getAddedMessage(): Observable<MessageI> {
//     return this.socket.fromEvent<MessageI>('messageAdded');
//   }

//   sendMessage(message: MessageI) {
//     this.socket.emit('addMessage', message);
//   }

//   joinRoom(room: RoomI) {
//     this.socket.emit('joinRoom', room);
//   }

//   leaveRoom(room: RoomI) {
//     this.socket.emit('leaveRoom', room);
//   }

//   getMessages(): Observable<MessagePaginateI> {
//     return this.socket.fromEvent<MessagePaginateI>('messages');
//   }

//   getMyRooms(): Observable<RoomPaginateI> {
//     return this.socket.fromEvent<RoomPaginateI>('rooms');
//   }

//   emitPaginateRooms(limit: number, page: number) {
//     this.socket.emit('paginateRooms', { limit, page });
//   }

//   createRoom(room: RoomI) {
//     this.socket.emit('createRoom', room);
//     this.snackbar.open(`Room ${room.name} created successfully`, 'Close', {
//       duration: 2000,
//       horizontalPosition: 'right',
//       verticalPosition: 'top',
//     });
//   }
// }

import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket = io.connect('http://localhost:3000');

  joinRoom(data: any) {
    this.socket.emit('join', data);
  }
  leaveRoom(data: any) {
    this.socket.emit('leave', data);
  }
  newUserJoined() {
    let observable = new Observable<{
      user: String;
      message: String;
      count: String;
    }>((observer) => {
      this.socket.on('new user joined', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    return observable;
  }

  userLeftRoom() {
    let observable = new Observable<{ user: String; message: String }>(
      (observer) => {
        this.socket.on('left room', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );

    return observable;
  }

  sendMessage(data: { user: any; room: any; message: any }) {
    this.socket.emit('message', data);
  }
  newMessageReceived() {
    let observable = new Observable<{ user: String; message: String }>(
      (observer) => {
        this.socket.on('new message', (data) => {
          observer.next(data);
        });
        return () => {
          this.socket.disconnect();
        };
      }
    );

    return observable;
  }

  //getting total number of users
  totalUsers() {
    let observable = new Observable<{ count: string }>((observer) => {
      this.socket.on('usercount', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
