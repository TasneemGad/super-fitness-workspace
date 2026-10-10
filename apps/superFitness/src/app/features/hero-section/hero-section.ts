import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SiteButton } from '@org/ui';

@Component({
  imports: [TranslatePipe, SiteButton],
  selector: 'app-hero-section',
  styleUrl: './hero-section.css',
  templateUrl: './hero-section.html',
})
export class HeroSection {}
