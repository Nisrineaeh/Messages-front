import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }


  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }
    return headers;
  }

  sendMessage(content: string,  receiverId: number) {
    const headers= this.getHeaders();
    const body = { content, receiverId };
    return this.http.post<Message>(`${this.BASE_URL}/messages`, body, {headers});
  }

  getMessagesBetweenUsers(user1Id: number, user2Id: number) {
    return this.http.get<Message[]>(`${this.BASE_URL}/messages/between/${user1Id}/${user2Id}`);
  }
}