import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SiteButton } from '@org/ui';

@Component({
  selector: 'app-about-us',
  standalone: true,
  host: { class: 'block' },
  imports: [SiteButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about-us.html',
})
export class AboutUs {
  protected readonly benefits = [
    { title: 'Personal Trainer', body: 'Achieve your fitness goals with the guidance of our certified trainers.' },
    { title: 'Cardio Programs', body: 'From steady-state runs to interval sprints, our treadmill programs keep you moving.' },
    { title: 'Quality Equipment', body: 'Train confidently with the latest cardio and strength machines.' },
    { title: 'Healthy Nutrition', body: 'Fuel your fitness journey with practical, personalized nutrition guidance.' },
  ];
}
