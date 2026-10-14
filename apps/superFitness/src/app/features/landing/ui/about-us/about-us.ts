import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import {
  ParagraphDescription,
  ParagraphTitle,
  SectionTitle,
  SiteButton,
} from '@org/ui';

@Component({
  selector: 'app-about-us',
  standalone: true,
  host: { class: 'block' },
  imports: [SiteButton, SectionTitle, ParagraphTitle, ParagraphDescription, TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about-us.html',
})
export class AboutUs {
  // Translation keys; rendered through the translate pipe in the template
  protected readonly benefits = [
    { title: 'landing.aboutUs.benefits.personalTrainer.title', body: 'landing.aboutUs.benefits.personalTrainer.body' },
    { title: 'landing.aboutUs.benefits.cardioPrograms.title', body: 'landing.aboutUs.benefits.cardioPrograms.body' },
    { title: 'landing.aboutUs.benefits.qualityEquipment.title', body: 'landing.aboutUs.benefits.qualityEquipment.body' },
    { title: 'landing.aboutUs.benefits.healthyNutrition.title', body: 'landing.aboutUs.benefits.healthyNutrition.body' },
  ];
}
