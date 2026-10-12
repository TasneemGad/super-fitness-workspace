import { Component } from '@angular/core';
import { HealthySectionComponent } from '../components/healthy-section/healthy-section.component';
import { WorkoutsSectionComponent } from '../components/workouts-section/workouts-section.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [WorkoutsSectionComponent, HealthySectionComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
}
