import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AboutUs } from './ui/about-us/about-us';
import { FitnessMarquee } from './ui/fitness-marquee/fitness-marquee';
import { WhyUs } from './ui/why-us/why-us';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  host: { class: 'block' },
  imports: [FitnessMarquee, AboutUs, WhyUs],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="overflow-hidden bg-[#f7f8f8] text-[#242424]">
      <app-fitness-marquee />
      <app-about-us />
      <app-why-us />
    </main>
  `,
})
export class LandingPage {}
