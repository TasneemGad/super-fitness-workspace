import { Component, computed, forwardRef, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthFacade } from '../../../auth.facade';
import { REGISTER_GOAL_FIELDS } from '../../../data/auth.fields';
import {
  REGISTER_STEPPER,
  RegisterStepper,
  RegistrationDraft,
} from '../../register-stepper';
import { RegistrationFlowService } from '../../services/registration-flow.service';
// import { RegisterDetailsStep } from '../../steps/details-step/register-details-step';

@Component({
  selector: 'app-register-goal-page',
  imports: [ RouterLink],
  templateUrl: './register-goal.page.html',
  styleUrls: [
    './register-goal.page.css',
    '../../../ui/auth-form.css',
    '../../../ui/auth-page.css',
  ],
  providers: [
    AuthFacade,
    {
      provide: REGISTER_STEPPER,
      useExisting: forwardRef(() => RegisterGoalPage),
    },
  ],
})
export class RegisterGoalPage implements RegisterStepper {
  private readonly flowService = inject(RegistrationFlowService);
  private readonly facade = inject(AuthFacade);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly fields = REGISTER_GOAL_FIELDS;
  readonly draft = this.flowService.draft;
  readonly index = signal(5);
  readonly count = signal(6);
  readonly isFirst = computed(() => false);
  readonly isLast = computed(() => true);
  readonly submitting = this.facade.submitting;
  readonly errors = this.facade.errors;
  readonly user = this.facade.user;

  next(values: RegistrationDraft): void {
    this.flowService.patch(values);
    this.facade.signup(this.flowService.draft());
  }

  back(): void {
    this.facade.clearErrors();
    void this.router.navigate(['../height'], { relativeTo: this.route });
  }
}
