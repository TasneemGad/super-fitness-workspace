import { Component, OnInit, inject, signal } from '@angular/core';
import { DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InfoCardComponent } from '../../../../shared/components/info-card/info-card.component';
import { MuscleGroupModel, MuscleModel } from '../../models/muscles.model';
import { MusclesService } from '../../services/muscles.service';
import { CarouselModule ,OwlOptions} from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-workouts-section',
  standalone: true,
  imports: [InfoCardComponent, CarouselModule],
  templateUrl: './workouts-section.component.html',
  styleUrl: './workouts-section.component.scss',
})
export class WorkoutsSectionComponent implements OnInit {
  private readonly _musclesService = inject(MusclesService);
  private readonly destroyRef = inject(DestroyRef);

  readonly muscles = signal<MuscleModel[]>([]);
  readonly muscleGroups = signal<MuscleGroupModel[]>([]);
  selectedGroupId = signal<string | null>(null);
  readonly isLoading = signal(true);
  
  customOptions: OwlOptions = {
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
    this.getAllMuscleGroups();
  }

   getAllMuscleGroups(): void {
    this._musclesService
      .getAllMuscleGroups()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
           this.muscleGroups.set(response.musclesGroup);
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
   }


   selectGroup(id: string): void {
    this.selectedGroupId.set(id);
    this.muscles.set([]);
    this.isLoading.set(true);
    

    this._musclesService.getGroupById(id).subscribe({
      next: (response) => {
        this.muscles.set(response.muscles);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}
