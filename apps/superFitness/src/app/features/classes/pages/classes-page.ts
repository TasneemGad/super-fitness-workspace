import {Component, DestroyRef, computed, effect, inject, signal,} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '@org/i18n';
import { ParagraphTitle, SectionTitle } from '@org/ui';
import { InfoCardComponent } from '../../../shared/components/info-card/info-card.component';
import { OwlCarouselComponent } from '../../../shared/components/owl-carousel/owl-carousel.component';
import { TabItem, TabsBarComponent,} from '../../../shared/components/tabs-bar/tabs-bar.component';
import { MuscleGroupModel, MuscleModel,} from '../models/muscles.model';
import { MusclesService } from '../services/muscles.service';

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
  private readonly languageService = inject(LanguageService);

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
      rtl: this.languageService.isRtl(),
      responsive: {
        0: { items: 1, margin: 12, dots: itemCount > 2 },
        640: { items: 2, margin: 16, dots: itemCount > 4 },
        1024: { items: 3, margin: 16, dots: itemCount > 6 },
      },
    };
  });



  constructor() {
  effect(() => {
    this.languageService.currentLang();

    this.getAllMuscleGroups();
  });
 }

   getAllMuscleGroups(): void {
    this.isLoadingGroups.set(true);
    this._musclesService
      .getAllMuscleGroups()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
           const groups = response.musclesGroup;

           this.muscleGroups.set(groups);
          this.isLoadingGroups.set(false);
          this.errorMessage.set(null);
          this.isLoadingMuscles.set(false);
          if (groups.length === 0) {
              this.selectedGroupId.set(null);
              this.muscles.set([]);
              this.isLoadingMuscles.set(false);
              return;
           }

           const currentId = this.selectedGroupId();
          const selectedGroup = groups.find(
            (group) => group._id === currentId
           );

           const groupId = selectedGroup
              ? selectedGroup._id
              : groups[0]._id;

            this.selectGroup(groupId, true);

        },
        error: () => {
          this.isLoadingGroups.set(false);
          this.errorMessage.set('workouts.error');
          this.isLoadingMuscles.set(false);
        },
      });
   }


   selectGroup(id: string , force=false): void {
    if (this.selectedGroupId() === id && !force) {
    return;
   }
    this.selectedGroupId.set(id);
    this.isLoadingMuscles.set(true);
    this.errorMessage.set(null);

    this._musclesService.getGroupById(id).pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (response) => {
        this.muscles.set(response.muscles);
        this.errorMessage.set(null);
        this.isLoadingMuscles.set(false);
      },
      error: () => {
        this.errorMessage.set('workouts.error');
        this.isLoadingMuscles.set(false);
      },
    });
  }

}
