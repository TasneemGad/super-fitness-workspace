import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { StepProgress } from '@org/ui';
import type { Gender } from '../../../domain/models/user.model';
import { GENDER_ONBOARDING_STEP } from '../../config/registration-onboarding-steps';
import { RegistrationFlowService } from '../../services/registration-flow.service';

const STEP = GENDER_ONBOARDING_STEP;

@Component({
  selector: 'app-register-gender-page',
  imports: [StepProgress, TranslatePipe],
  templateUrl: './register-gender.page.html',
  styleUrl: './register-gender.page.css',
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
