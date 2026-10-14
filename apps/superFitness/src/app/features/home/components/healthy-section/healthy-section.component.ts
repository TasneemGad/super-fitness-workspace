import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { ParagraphTitle, SectionTitle } from '@org/ui';
import { InfoCardComponent } from '../../../../shared/components/info-card/info-card.component';
import { OwlCarouselComponent } from '../../../../shared/components/owl-carousel/owl-carousel.component';
import { FitnessMarquee } from '../../../landing/ui/fitness-marquee/fitness-marquee';
import { MealCategoryModel } from '../../models/meal-categories.model';
import { MealsService } from '../../services/meals.service';
import { SmartCoach } from '../../../smart-coach/smart-coach';
import { LanguageService } from '@org/i18n';

@Component({
  selector: 'app-healthy-section',
  standalone: true,
  imports: [
    SectionTitle,
    InfoCardComponent,
    TranslatePipe,
    ParagraphTitle,
    FitnessMarquee,
    OwlCarouselComponent,
    RouterLink,
    SmartCoach
  ],
  templateUrl: './healthy-section.component.html',
  styleUrl: './healthy-section.component.scss',
})
export class HealthySectionComponent implements OnInit {
  private readonly mealsService = inject(MealsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly languageService = inject(LanguageService);

  readonly mealCategories = signal<MealCategoryModel[]>([]);
  readonly isLoading = signal(true);
  readonly errorMessage = signal<string | null>(null);

  readonly getCategoryId = (category: MealCategoryModel): string =>category.idCategory;
  // computed (not a getter) so owl-carousel gets a stable options object and doesn't re-init every change detection
  readonly customOptions = computed<OwlOptions>(() => {
    const hasMoreThanOnePage = this.mealCategories().length > 3;
    return {
      loop: hasMoreThanOnePage,
      autoplay: hasMoreThanOnePage,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      smartSpeed: 700,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: hasMoreThanOnePage,
      nav: false,
      rtl: this.languageService.isRtl(),
      margin: 16,
      responsive: {
        0: { items: 1, margin: 12 },
        640: { items: 2, margin: 16 },
        1024: { items: 3, margin: 16 },
      },
    };
  });
ngOnInit(): void {
  this.loadCategories();
}
  loadCategories(): void {

    this.mealsService
      .getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.mealCategories.set(response.categories);
          this.isLoading.set(false);
        },
        error: () => {
          this.errorMessage.set('home.healthy.error');
          this.isLoading.set(false);
        },
      });
  }
}
