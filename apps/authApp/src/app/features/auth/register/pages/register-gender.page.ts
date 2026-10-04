import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { StepProgress } from '@org/ui';
import type { Gender } from '../../domain/models/user.model';
import { GENDER_ONBOARDING_STEP } from '../config/registration-onboarding-steps';
import { RegistrationFlowService } from '../services/registration-flow.service';

const STEP = GENDER_ONBOARDING_STEP;

@Component({
  selector: 'app-register-gender-page',
  imports: [StepProgress, TranslatePipe],
  styleUrl: './register-gender.page.css',
  template: `
    <div class="gender-page">
      <div class="gender-content">
        <lib-step-progress
          class="gender-progress"
          [current]="STEP.currentStep"
          [total]="STEP.totalSteps"
        />
        <h2 class="gender-title">{{ STEP.titleKey | translate }}</h2>
        <p class="gender-description">{{ STEP.descriptionKey | translate }}</p>

        <div
          class="gender-options"
          role="group"
          [attr.aria-label]="STEP.titleKey | translate"
        >
          @for (option of STEP.options; track option.value) {
            <button
              type="button"
              class="gender-option"
              [class.gender-option--selected]="gender() === option.value"
              [attr.aria-pressed]="gender() === option.value"
              (click)="gender.set(option.value)"
            >
              {{ option.labelKey | translate }}
            </button>
          }
        </div>

        <button
          id="gender-step-next-btn"
          type="button"
          class="gender-next"
          [attr.aria-label]="STEP.nextLabelKey | translate"
          (click)="onNext(gender())"
        >
          {{ STEP.nextLabelKey | translate }}
        </button>
      </div>
    </div>
  `,
})
export class RegisterGenderPage {
  protected readonly STEP = STEP;

  private readonly flowService = inject(RegistrationFlowService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly gender = signal(this.savedGender());

  protected onNext(value: Gender): void {
    this.flowService.patch({ [STEP.field]: value });
    void this.router.navigate([STEP.nextRoute], { relativeTo: this.route });
  }

  private savedGender(): Gender {
    const value = this.flowService.draft()[STEP.field];
    return value === 'male' || value === 'female' ? value : STEP.defaultValue;
  }
}
