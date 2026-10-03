import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthHeader, DynamicForm } from '@org/ui';
import { FORGOT_PASSWORD_FIELDS } from '../../data/auth.fields';
import { AuthFeedback } from '../../ui/auth-feedback/auth-feedback';
import { PasswordResetFacade } from '../password-reset.facade';
import { PasswordResetState } from '../password-reset.state';

/** Step 1: ask for the account email and send it a reset code. */
@Component({
  selector: 'app-forgot-password-page',
  imports: [AuthHeader, AuthFeedback, DynamicForm, RouterLink],
  providers: [PasswordResetFacade],
  templateUrl: './forgot-password-page.html',
  styleUrls: ['../../ui/auth-form.css', '../../ui/auth-page.css', './forgot-password-page.css'],
})
export class ForgotPasswordPage {
  private readonly facade = inject(PasswordResetFacade);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly fields = FORGOT_PASSWORD_FIELDS;
  protected readonly submitting = this.facade.submitting;
  protected readonly errors = this.facade.errors;
  /** Pre-fills the email when the user comes back from the code step. */
  protected readonly initialData = { email: inject(PasswordResetState).email() ?? '' };

  protected onSubmit(model: Record<string, unknown>): void {
    const email = String(model['email'] ?? '').trim();

    this.facade.sendCode(email, () =>
      this.router.navigate(['otp'], { relativeTo: this.route })
    );
  }
}
