import { Component } from '@angular/core';
import { WorkoutsSectionComponent } from '../components/workouts-section/workouts-section.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [WorkoutsSectionComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
}
