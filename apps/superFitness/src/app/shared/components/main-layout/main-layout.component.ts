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
})
export class MainLayout {}
