import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from '../feature/navbar/navbar';

@Component({
  imports: [RouterModule, Navbar],
  selector: 'app-super-fitness-entry',
  template: `
    <app-navbar />
    <router-outlet />
  `,
})
export class RemoteEntry {}
