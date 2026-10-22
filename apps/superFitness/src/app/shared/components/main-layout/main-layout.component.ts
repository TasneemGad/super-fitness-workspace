import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../../../features/footer/footer';
import { FitnessMarquee } from '../../../features/landing/ui/fitness-marquee/fitness-marquee';
import { Navbar } from '../../../features/navbar/navbar';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [Navbar, RouterOutlet, FitnessMarquee, Footer],
  templateUrl: './main-layout.component.html',
  host: {
    class: 'block [--page-width:1490px] [--page-gutter:1rem] sm:[--page-gutter:1.5rem] lg:[--page-gutter:clamp(1rem,5.56vw,5rem)]',
  },
})
export class MainLayout {}
