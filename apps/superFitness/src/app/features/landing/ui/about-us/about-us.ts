import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ParagraphDescription,
  ParagraphTitle,
  ParagraphTitleSegment,
  SectionTitle,
  SiteButton,
} from '@org/ui';

@Component({
  selector: 'app-about-us',
  standalone: true,
  host: { class: 'block' },
  imports: [SiteButton, SectionTitle, ParagraphTitle, ParagraphDescription],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about-us.html',
})
export class AboutUs {
  protected readonly titleSegments: readonly ParagraphTitleSegment[] = [
    { text: 'Empowering you to achieve ' },
    { text: 'your fitness', highlight: true },
    { text: ' goals' },
  ];

  protected readonly description =
    "We believe fitness is more than just a workout—it's a lifestyle. With top-of-the-line facilities, certified trainers, and a supportive community, we're here to inspire and guide you every step of the way.";

  protected readonly benefits = [
    { title: 'Personal Trainer', body: 'Achieve your fitness goals with the guidance of our certified trainers.' },
    { title: 'Cardio Programs', body: 'From steady-state runs to interval sprints, our treadmill programs keep you moving.' },
    { title: 'Quality Equipment', body: 'Train confidently with the latest cardio and strength machines.' },
    { title: 'Healthy Nutrition', body: 'Fuel your fitness journey with practical, personalized nutrition guidance.' },
  ];
}
