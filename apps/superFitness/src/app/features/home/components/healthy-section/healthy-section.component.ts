import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe } from '@ngx-translate/core';
import { SectionTitle } from '@org/ui';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { InfoCardComponent } from '../../../../shared/components/info-card/info-card.component';
import { MealCategoryModel } from '../../models/meal-categories.model';
import { MealsService } from '../../services/meals.service';

@Component({
  selector: 'app-healthy-section',
  standalone: true,
  imports: [SectionTitle, InfoCardComponent, CarouselModule, TranslatePipe],
  templateUrl: './healthy-section.component.html',
  styleUrl: './healthy-section.component.scss',
})
export class HealthySectionComponent implements OnInit {
  private readonly mealsService = inject(MealsService);
  private readonly destroyRef = inject(DestroyRef);

  readonly mealCategories = signal<MealCategoryModel[]>([]);
  readonly isLoading = signal(true);
  readonly errorMessage = signal<string | null>(null);

  readonly customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    nav: false,
    navSpeed: 700,
    margin: 16,
    autoWidth: true,
  };

  ngOnInit(): void {
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
