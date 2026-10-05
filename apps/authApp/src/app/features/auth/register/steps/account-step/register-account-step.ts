import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DynamicForm } from '@org/ui';
import { REGISTER_ACCOUNT_FIELDS } from '../../../data/auth.fields';
import { AuthFeedback } from '../../../ui/auth-feedback/auth-feedback';
import { SocialSignIn } from '../../../ui/social-sign-in/social-sign-in';
import { REGISTER_STEPPER, RegistrationDraft } from '../../register-stepper';

@Component({
  selector: 'app-register-account-step',
  imports: [DynamicForm, AuthFeedback, SocialSignIn, RouterLink],
  templateUrl: './register-account-step.html',
  styleUrls: ['../../../ui/auth-form.css', '../../../ui/auth-page.css'],
})
export class RegisterAccountStep {
  protected readonly stepper = inject(REGISTER_STEPPER);
  protected readonly fields = signal(REGISTER_ACCOUNT_FIELDS);

  protected readonly notice = signal<string | null>(null);

  protected onSubmit(values: RegistrationDraft): void {
    this.notice.set(null);
    this.stepper.next({ ...values, rePassword: values['password'] });
  }
}
