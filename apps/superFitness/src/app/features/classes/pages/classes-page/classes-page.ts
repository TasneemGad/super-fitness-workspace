import {Component, DestroyRef, computed, inject, signal,} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { catchError, from, map, mergeMap, of, Subscription, switchMap, tap, toArray } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '@org/i18n';
import { ParagraphTitle, SectionTitle } from '@org/ui';
import { InfoCardComponent } from '../../../../shared/components/info-card/info-card.component';
import { OwlCarouselComponent } from '../../../../shared/components/owl-carousel/owl-carousel.component';
import { TabItem, TabsBarComponent,} from '../../../../shared/components/tabs-bar/tabs-bar.component';
import { MuscleGroupModel, MuscleModel,} from '../../models/muscles.model';
import { MusclesService } from '../../services/muscles.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-classes-page',
  standalone: true,
  imports: [
    InfoCardComponent,
    OwlCarouselComponent,
    ParagraphTitle,
    SectionTitle,
    TabsBarComponent,
    TranslatePipe,
  ],
  templateUrl: './classes-page.html',
  styleUrl: './classes-page.scss',
})
export class ClassesPage {
  private readonly _musclesService = inject(MusclesService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);
  private readonly _languageService = inject(LanguageService);

  private readonly groupDetails = new Map<string, MuscleModel[]>();
  private selectionRequest?: Subscription;

  readonly groupLoadError = signal(false);
  readonly muscleGroups = signal<MuscleGroupModel[]>([]);
  readonly muscles = signal<MuscleModel[]>([]);
  readonly selectedGroupId = signal<string | null>(null);
  readonly isLoadingGroups = signal(true);
  readonly isLoadingMuscles = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly muscleGroupTabs = computed<TabItem[]>(() =>
    this.muscleGroups().map((group) => ({ id: group._id, label: group.name })),
  );
  readonly getMuscleId = (muscle: MuscleModel): string => muscle._id;
  readonly useCarousel = computed(() => this.muscles().length > 4);

  navigateToWorkoutDetails(muscleId: string): void {
     this._router.navigate(['workout-details', muscleId], {
      relativeTo: this._route,
    });
  }

  readonly carouselOptions = computed<OwlOptions>(() => {
    const itemCount = this.muscles().length;
    return {
      loop: false,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: true,
      nav: true,
      navSpeed: 700,
      margin: 16,
      autoWidth: false,
      autoHeight: false,
      rtl: this._languageService.isRtl(),
      responsive: {
        0: { items: 1, margin: 12, dots: itemCount > 2 },
        640: { items: 2, margin: 16, dots: itemCount > 4 },
        1024: { items: 3, margin: 16, dots: itemCount > 6 },
      },
    };
  });



  constructor() {
    toObservable(this._languageService.currentLang)
      .pipe(
        switchMap((language) => {
          this.selectionRequest?.unsubscribe();
          this.isLoadingGroups.set(true);
          this.isLoadingMuscles.set(false);
          this.errorMessage.set(null);
          this.groupLoadError.set(false);
          return this._musclesService.getAllMuscleGroups().pipe(
            switchMap((response) => from(response.musclesGroup).pipe(
              mergeMap((group) => {
                const key = language + ':' + group._id;
                const cached = this.groupDetails.get(key);
                const details = cached !== undefined
                  ? of(cached)
                  : this._musclesService.getGroupById(group._id).pipe(
                      map((result) => result.muscles),
                      tap((muscles) => this.groupDetails.set(key, muscles)),
                    );
                return details.pipe(
                  map((muscles) => ({ group, muscles })),
                  catchError(() => of({ group, muscles: null })),
                );
              }, 3),
              toArray(),
              map((results) => ({
                groups: response.musclesGroup.filter((group) => {
                  const result = results.find((item) => item.group._id === group._id);
                  return result?.muscles === null || !!result?.muscles.length;
                }),
                failed: results.some((result) => result.muscles === null),
              })),
            )),
            catchError(() => {
              this.errorMessage.set('workouts.error');
              return of({ groups: [], failed: false });
            }),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(({ groups, failed }) => {
        this.muscleGroups.set(groups);
        this.groupLoadError.set(failed);
        this.isLoadingGroups.set(false);
        const selected = groups.find((group) => group._id === this.selectedGroupId());
        const firstLoaded = groups.find((group) =>
          this.groupDetails.has(this._languageService.currentLang() + ':' + group._id),
        );
        const next = selected ?? firstLoaded ?? groups[0];
        if (next && this.groupDetails.has(this._languageService.currentLang() + ':' + next._id)) {
          this.selectGroup(next._id, true);
        } else {
          this.selectedGroupId.set(null);
          this.muscles.set([]);
          if (next) this.errorMessage.set('workouts.error');
        }
      });
  }

  selectGroup(id: string, force = false): void {
    if (this.isLoadingGroups() || (!force && this.selectedGroupId() === id &&
        (!this.errorMessage() || this.isLoadingMuscles()))) return;
    if (!this.muscleGroups().some((group) => group._id === id)) return;

    this.selectionRequest?.unsubscribe();
    this.selectedGroupId.set(id);
    this.errorMessage.set(null);
    const key = this._languageService.currentLang() + ':' + id;
    const cached = this.groupDetails.get(key);
    if (cached !== undefined) {
      this.muscles.set(cached);
      this.isLoadingMuscles.set(false);
      return;
    }

    this.isLoadingMuscles.set(true);
    this.muscles.set([]);
    this.selectionRequest = this._musclesService.getGroupById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.groupDetails.set(key, response.muscles);
          this.isLoadingMuscles.set(false);
          if (response.muscles.length === 0) {
            this.muscleGroups.update((groups) => groups.filter((group) => group._id !== id));
            this.selectedGroupId.set(null);
            const next = this.muscleGroups()[0];
            if (next) this.selectGroup(next._id);
          } else {
            this.muscles.set(response.muscles);
          }
          this.groupLoadError.set(this.muscleGroups().some((group) =>
            !this.groupDetails.has(this._languageService.currentLang() + ':' + group._id),
          ));
        },
        error: () => {
          this.errorMessage.set('workouts.error');
          this.isLoadingMuscles.set(false);
        },
      });
  }
}
