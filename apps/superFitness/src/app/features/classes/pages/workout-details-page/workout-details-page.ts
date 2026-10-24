import {Component,DestroyRef,computed,effect,inject,signal,} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '@org/i18n';
import { SectionTitle } from '@org/ui';
import { WorkoutHighlights } from '../../components/workout-highlights/workout-highlights';
import { WorkoutPlayer } from '../../components/workout-player/workout-player';
import { InfoCardComponent } from '../../../../shared/components/info-card/info-card.component';
import { OwlCarouselComponent } from '../../../../shared/components/owl-carousel/owl-carousel.component';
import { TabItem,TabsBarComponent,} from '../../../../shared/components/tabs-bar/tabs-bar.component';
import { MealCategoryModel } from '../../../home/models/meal-categories.model';
import { MealsService } from '../../../home/services/meals.service';
import { DifficultyLevelModel } from '../../models/difficulty-level.model';
import { ExerciseModel } from '../../models/exercise.model';
import { MuscleGroupModel } from '../../models/muscles.model';
import { DifficultyLevelsService } from '../../services/difficulty-levels.service';
import { ExercisesService } from '../../services/exercises.service';
import { MusclesService } from '../../services/muscles.service';

@Component({
  selector: 'app-workout-details-page',
  standalone: true,
  imports: [InfoCardComponent,OwlCarouselComponent,SectionTitle,TabsBarComponent,
    TranslatePipe,WorkoutPlayer,WorkoutHighlights,],
  templateUrl: './workout-details-page.html',
  styleUrl: './workout-details-page.scss',
})
export class WorkoutDetailsPage  {
  private readonly _musclesService = inject(MusclesService);
  private readonly _exercisesService = inject(ExercisesService);
  private readonly _difficultyLevelsService = inject(DifficultyLevelsService);
  private readonly _mealsService = inject(MealsService);
  private readonly _route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly _languageService = inject(LanguageService);

  readonly muscleGroups = signal<MuscleGroupModel[]>([]);
  readonly difficultyLevels = signal<DifficultyLevelModel[]>([]);
  readonly exercises = signal<ExerciseModel[]>([]);
  readonly mealCategories = signal<MealCategoryModel[]>([]);
  readonly selectedGroupId = signal<string | null>(null);
  readonly selectedDifficultyLevelId = signal<string | null>(null);
  readonly selectedExercise = signal<ExerciseModel | null>(null);
  readonly isLoadingGroups = signal(true);
  readonly isLoadingDifficultyLevels = signal(true);
  readonly isLoadingExercises = signal(true);
  readonly isLoadingRecommendations = signal(true);
  readonly errorMessage = signal<string | null>(null);
  readonly difficultyLevelsErrorMessage = signal<string | null>(null);
  readonly exercisesErrorMessage = signal<string | null>(null);
  readonly recommendationsErrorMessage = signal<string | null>(null);

  readonly muscleGroupTabs = computed<TabItem[]>(() =>
    this.muscleGroups().map((group) => ({ id: group._id, label: group.name })),
  );
  readonly difficultyLevelTabs = computed<TabItem[]>(() =>
    this.difficultyLevels().map((level) => ({ id: level.id, label: level.name })),
  );
  readonly getMealCategoryId = (category: MealCategoryModel): string =>
    category.idCategory;
  
  // Loads difficulty levels and meals, and refreshes muscle groups when the language changes.
   constructor() {
   this.getDifficultyLevels();

   effect(() => {
     this._languageService.currentLang();
 
     this.getAllMuscleGroups();
   });
   this.getRecommendedMeals();
  }
  readonly recommendationCarouselOptions = computed<OwlOptions>(() => ({
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: this.mealCategories().length > 1,
    nav: false,
    margin: 16,
    autoWidth: false,
    autoHeight: false,
    rtl: this._languageService.isRtl(),
    responsive: {
      0: { items: 1, margin: 12 },
      640: { items: 2, margin: 16 },
      1024: { items: 3, margin: 16 },
    },
  }));

  

  // Loads difficulty levels for the muscle ID in the current route.
  private getDifficultyLevels(): void {
    const muscleId = this._route.snapshot.paramMap.get('id');

    if (!muscleId) {
      this.difficultyLevelsErrorMessage.set('workouts.error');
      this.isLoadingDifficultyLevels.set(false);
      this.exercisesErrorMessage.set('workouts.error');
      this.isLoadingExercises.set(false);
      return;
    }

    this._difficultyLevelsService
      .getAllDifficultyLevels(muscleId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ difficulty_levels }) => {
          this.difficultyLevels.set(difficulty_levels);
          this.isLoadingDifficultyLevels.set(false);
          const initialLevelId = difficulty_levels[0]?.id;
          if (initialLevelId) {
            this.selectDifficultyLevel(initialLevelId);
          } else {
            this.isLoadingExercises.set(false);
          }
        },
        error: () => {
          this.difficultyLevelsErrorMessage.set('workouts.error');
          this.isLoadingDifficultyLevels.set(false);
          this.isLoadingExercises.set(false);
        },
      });
  }

  // Fetches exercises for the selected difficulty level and selects the first result.
  selectDifficultyLevel(id: string): void {
    const muscleId = this._route.snapshot.paramMap.get('id');
    if (!muscleId) {
      this.exercisesErrorMessage.set('workouts.error');
      this.isLoadingExercises.set(false);
      return;
    }

    this.selectedDifficultyLevelId.set(id);
    this.isLoadingExercises.set(true);
    this.exercisesErrorMessage.set(null);

    this._exercisesService
      .getExercisesByMuscleAndDifficulty(muscleId, id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ exercises }) => {
          this.exercises.set(exercises);
          this.selectedExercise.set(exercises[0] ?? null);
          this.isLoadingExercises.set(false);
        },
        error: () => {
          this.exercisesErrorMessage.set('workouts.error');
          this.isLoadingExercises.set(false);
        },
      });
  }

  // Loads the available muscle groups and selects the first group by default.
  private getAllMuscleGroups(): void {
    this._musclesService
      .getAllMuscleGroups()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ musclesGroup }) => {
          this.muscleGroups.set(musclesGroup);
          this.selectedGroupId.set(musclesGroup[0]?._id ?? null);
          this.isLoadingGroups.set(false);
        },
        error: () => {
          this.errorMessage.set('workouts.error');
          this.isLoadingGroups.set(false);
        },
      });
  }

  // Loads meal categories for the recommendations carousel.
  private getRecommendedMeals(): void {
    this._mealsService
      .getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ categories }) => {
          this.mealCategories.set(categories);
          this.isLoadingRecommendations.set(false);
        },
        error: () => {
          this.recommendationsErrorMessage.set('healthy.error');
          this.isLoadingRecommendations.set(false);
        },
      });
  }

  // Updates the currently selected muscle group.
  selectGroup(id: string): void {
    this.selectedGroupId.set(id);
  }

  // Updates the exercise displayed in the workout player.
  selectExercise(exercise: ExerciseModel): void {
  this.selectedExercise.set(exercise);
}
}
