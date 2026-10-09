import { Component, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FieldIcon } from '@org/ui';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, FieldIcon, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  links = signal([
    { label: 'navbar.home', fragment: 'home' },
    { label: 'navbar.about', fragment: 'about' },
    { label: 'navbar.classes', fragment: 'classes' },
    { label: 'navbar.healthy', fragment: 'healthy' },
  ]);

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
