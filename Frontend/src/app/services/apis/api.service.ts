import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserI } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = 'http://localhost:3000';

  // currentDocument = this.socket.fromEvent<Document>('document');
  // documents = this.socket.fromEvent<string[]>('documents');

  constructor(private http: HttpClient) {}

  onLogin(loginData: any) {
    console.log(loginData);
    return this.http.post(`${this.url}/login`, loginData);
  }
  onRegister(registerData: any) {
    return this.http.post(`${this.url}/register`, registerData);
  }
  findByUsername(username: string): Observable<any> {
    return this.http.get<any>(
      `${this.url}/find-by-username?username=${username}`
    );
  }

  // getAllRooms(roomsId: string[] | undefined) {
  //   return this.http.post<any[]>(`${this.url}/get-all-meets-data`, roomsId);
  // }
  getAllRooms(userId: string | null) {
    console.log(userId);

    return this.http.post<any[]>(`${this.url}/get-all-meets-data`, { userId });
  }
  createMeet(meetData: any) {
    return this.http.post<any[]>(`${this.url}/create-meet`, meetData);
  }
}
