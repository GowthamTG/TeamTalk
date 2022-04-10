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

  findByUsername(username: string): Observable<UserI[]> {
    return this.http.get<UserI[]>(`find-by-username?username=${username}`);
  }
}
