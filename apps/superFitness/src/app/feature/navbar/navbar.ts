import { Component, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FieldIcon } from '@org/ui';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, FieldIcon],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  links = [
    { label: 'Home', fragment: 'home' },
    { label: 'About', fragment: 'about' },
    { label: 'Classes', fragment: 'classes' },
    { label: 'Healthy', fragment: 'healthy' },
  ];

  menuOpen = signal(false);
  scrolled = signal(false);

  toggleMenu() {
    this.menuOpen.set(!this.menuOpen());
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 10);
  }
}
