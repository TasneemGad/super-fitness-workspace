import { Component, EventEmitter, input, output } from '@angular/core';

@Component({
  selector: 'app-info-card',
  standalone: true,
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss',
})
export class InfoCardComponent {
  image = input.required<string>();
  title = input.required<string>();
  buttonText = input<string>('Explore');

  buttonClick = output<void>();

  handleButtonClick(){
    this.buttonClick.emit();
  }
}
