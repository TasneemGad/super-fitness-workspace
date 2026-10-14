import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ParagraphDescription,
  ParagraphTitle,
  ParagraphTitleSegment,
  SectionTitle,
} from '@org/ui';

@Component({
  selector: 'app-why-us',
  standalone: true,
  host: { class: 'block bg-[#f1f3f4]' },
  imports: [SectionTitle, ParagraphTitle, ParagraphDescription],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './why-us.html',
})
export class WhyUs {
  protected readonly titleSegments: readonly ParagraphTitleSegment[] = [
    { text: 'Elevate fitness with the ' },
    { text: 'best way', highlight: true },
    { text: ' possible' },
  ];

  protected readonly description =
    "We offer a fitness journey that's tailored to your goals, supported by professional trainers and a welcoming community. Whether it's weight loss, strength building, or overall wellness, our proven methods help you thrive.";

  protected readonly reasons = [
    { number: '01', title: 'Personalized Fitness Plans', body: 'We tailor every workout to fit your unique goals and fitness level, so you keep making progress.' },
    { number: '02', title: 'Results-Driven Focus', body: "Everything we do is designed to help you achieve measurable results, whether you're aiming for strength or endurance." },
    { number: '03', title: 'State-of-the-Art Equipment', body: 'Train with the latest gym equipment, from cardio machines to free weights, designed to support every type of workout.' },
  ];
}
