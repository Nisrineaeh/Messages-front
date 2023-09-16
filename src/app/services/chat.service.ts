import { Injectable } from '@angular/core';
import { Observable, switchMap, tap, timer } from 'rxjs';
import { Message } from '../models/message';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  private lastMessageId = 0;
  private pollingInterval = 5000; // 5 seconds

  startPolling(): Observable<Message[]> {
    return timer(0, this.pollingInterval).pipe(
      switchMap(() => this.getNewMessages()),
      tap((messages) => {
        if (messages.length) {
          this.lastMessageId = messages[messages.length - 1].id;
        }
      })
    );
  }

  getNewMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`http://localhost:3000/messages/new/${this.lastMessageId}`);
  }

  
}
