import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingPage } from '../features/landing/landing-page';

@Component({
  imports: [RouterModule, LandingPage],
  selector: 'app-super-fitness-entry',
  template: `<app-landing-page />`,
})
export class RemoteEntry {}
