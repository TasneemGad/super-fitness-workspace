import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-fitness-marquee',
  standalone: true,
  host: { class: 'block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './fitness-marquee.html',
})
export class FitnessMarquee {
  protected readonly items = [
    'Fitness Classes', 'Outdoor & Online Trainers', 'Personal Training', 'Live Classes', 'Personal Trainers',
  ];
}
