import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from '../features/navbar/navbar';
import { Footer } from '../features/footer/footer';

@Component({
  imports: [RouterModule, Navbar, Footer],
  selector: 'app-super-fitness-entry',
  template: `
    <app-navbar />
    <router-outlet />
    <app-footer />
  `,
})
export class RemoteEntry {}
