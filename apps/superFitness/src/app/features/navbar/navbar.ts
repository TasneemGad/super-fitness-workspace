import { Component, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcher } from '@org/i18n';
import { FieldIcon, ThemeToggle } from '@org/ui';

type NavbarLink = {
  label: string;
  route: string;
  fragment?: string;
};

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, FieldIcon, TranslatePipe, ThemeToggle, LanguageSwitcher],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  links = signal<NavbarLink[]>([
    { label: 'navbar.home', route: '/superFitness' },
    { label: 'navbar.about', route: 'about' },
    { label: 'navbar.classes', route: 'classes' },
    { label: 'navbar.healthy', route: 'healthy' },
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
