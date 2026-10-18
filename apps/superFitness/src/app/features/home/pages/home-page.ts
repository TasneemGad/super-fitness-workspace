import { Component } from '@angular/core';
import { HealthySectionComponent } from '../components/healthy-section/healthy-section.component';
import { WorkoutsSectionComponent } from '../components/workouts-section/workouts-section.component';
import { FitnessMarquee } from '../../landing/ui/fitness-marquee/fitness-marquee';
import { AboutUs } from '../../landing/ui/about-us/about-us';
import { WhyUs } from '../../landing/ui/why-us/why-us';
import { HeroSection } from '../../hero-section/hero-section';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FitnessMarquee, AboutUs, WorkoutsSectionComponent,
     WhyUs, HealthySectionComponent ,HeroSection],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
}
