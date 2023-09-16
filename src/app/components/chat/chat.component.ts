import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'src/app/models/message';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages: Message[] = [];
  messageForm: FormGroup;
  currentUser = { id: this.authService.getUserId()! }; // À remplacer par le système d'authentification
  otherUserId = 2; // À remplacer par le bon ID

  constructor(private fb: FormBuilder, private messageService: MessageService, private authService: AuthService, private chatService: ChatService) {
    this.messageForm = this.fb.group({
      newMessage: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    // Récupérez les messages existants entre les deux utilisateurs lors de l'initialisation.
    const currentUserId = this.currentUser.id;
    const otherUserId = this.otherUserId;

    this.messageService.getMessagesBetweenUsers(currentUserId, otherUserId).subscribe({
      next: existingMessages => {
        this.messages = existingMessages;
      },
      error: error => {
        console.error('Erreur lors de la récupération des messages existants:', error);
      }
    });

    // Commencez à rechercher de nouveaux messages toutes les 5 secondes
    this.chatService.startPolling().subscribe({
      next: newMessages => {
        if (newMessages && Array.isArray(newMessages)) {
          this.messages = [...this.messages, ...newMessages];
        } else {
          console.warn('Received unexpected data format for new messages.');
        }
      },
      error: error => {
        console.error('Erreur lors de la récupération des nouveaux messages:', error);
      }
    });
  }

  sendMessage(content: string, receiverId: number): void {
   

    if (this.messageForm.valid) {
      const newMessage = this.messageForm.get('newMessage')?.value.trim();
      if (newMessage) {
        this.messageService.sendMessage(newMessage, receiverId).subscribe(data => {
          this.messageForm.reset();
        });
      }
    }
  }
}
