import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
interface Message {
  sender: 'bot' | 'user';
  text: string;
  avatar?: string;
}
@Component({
  imports: [CommonModule, TranslatePipe],
  selector: 'app-smart-coach',
  templateUrl: './smart-coach.html',
})
export class SmartCoach {
  isOpen = signal<boolean>(false);
  isMenuOpen = signal<boolean>(false); 

  messages = signal<Message[]>([
    { sender: 'bot', text: 'Hello How Can I Assist You Today ?' },
    { sender: 'user', text: 'Lorem Ipsum Dolor Sit Amet Consectetur.' },
    { sender: 'bot', text: 'Hello How Can I Assist You Today ?' }
  ]);

  previousChats = signal<string[]>([
    'Lorem ipsum dolor sit amet',
    'Lorem ipsum dolor sit amet',
    'Lorem ipsum dolor sit amet',
    'Lorem ipsum dolor sit amet',
    'Lorem ipsum dolor sit amet'
  ]);

  toggleChat() {
    this.isOpen.update(value => !value);
    if (!this.isOpen()) {
      this.isMenuOpen.set(false); 
    }
  }
  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }
}
