import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
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

  readonly mealCategories = signal<MealCategoryModel[]>([]);
  readonly isLoading = signal(true);
  readonly errorMessage = signal<string | null>(null);

  readonly getCategoryId = (category: MealCategoryModel): string =>category.idCategory;
  get customOptions () {
    const itemCount = this.mealCategories().length;
    return {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: itemCount > 3,
    nav: false,
    navSpeed: 700,
    margin: 16,
    autoWidth: false,
   autoHeight: false,

  responsive: {
    0: {
      items: 1,
      margin: 12,
    },
    640: {
      items: 2,
      margin: 16,
    },
    1024: {
      items: 3,
      margin: 16,
    },
  },
  }
  };
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
