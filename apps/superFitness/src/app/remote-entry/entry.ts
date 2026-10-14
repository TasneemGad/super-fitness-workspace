import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from '../features/navbar/navbar';
import { HeroSection } from '../features/hero-section/hero-section';
import { Footer } from '../features/footer/footer';

@Component({
  imports: [RouterModule, Navbar, HeroSection, Footer],
  selector: 'app-super-fitness-entry',
  template: `
    <app-navbar />
    <app-hero-section />
    <router-outlet />
    <app-footer />
  `,
})
export class RemoteEntry { }
