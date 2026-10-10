import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from '../feature/navbar/navbar';
import { HeroSection } from '../features/hero-section/hero-section';

@Component({
  imports: [RouterModule, Navbar, HeroSection],
  selector: 'app-super-fitness-entry',
  template: `
    <app-navbar />
    <app-hero-section />
    <router-outlet />
  `,
})
export class RemoteEntry {}
