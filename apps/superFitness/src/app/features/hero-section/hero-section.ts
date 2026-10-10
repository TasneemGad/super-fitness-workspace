import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [TranslatePipe],
  selector: 'app-hero-section',
  styleUrl: './hero-section.css',
  templateUrl: './hero-section.html',
})
export class HeroSection {}
