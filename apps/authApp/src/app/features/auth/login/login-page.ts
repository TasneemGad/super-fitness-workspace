import { Component, effect, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthHeader, DynamicForm } from '@org/ui';
import { AuthFacade } from '../auth.facade';
import { LOGIN_FIELDS } from '../data/auth.fields';
import { AuthFeedback } from '../ui/auth-feedback/auth-feedback';
import { SocialSignIn } from '../ui/social-sign-in/social-sign-in';

const HOME_URL = '/superFitness';

@Component({
  selector: 'app-login-page',
  imports: [
    AuthHeader,
    AuthFeedback,
    DynamicForm,
    SocialSignIn,
    RouterLink,
  ],
  providers: [AuthFacade],
  templateUrl: './login-page.html',
  styleUrls: ['../ui/auth-form.css', '../ui/auth-page.css'],
})
export class LoginPage {
  private readonly facade = inject(AuthFacade);
  private readonly router = inject(Router);

  protected readonly fields = signal(LOGIN_FIELDS);
  protected readonly submitting = this.facade.submitting;
  protected readonly errors = this.facade.errors;
  protected readonly user = this.facade.user;

  protected readonly notice = signal<string | null>(null);

  constructor() {
    effect(() => {
      if (!this.facade.user()) return;

      this.router.navigateByUrl(HOME_URL).then(
        (ok) => {
          if (!ok) this.signedInWithoutHome();
        },
        () => this.signedInWithoutHome()
      );
    });
  }

  protected onSubmit(model: Record<string, unknown>): void {
    this.notice.set(null);
    this.facade.signin(model);
  }

  protected onUnavailable(feature: string): void {
    this.notice.set(`${feature} is not connected yet.`);
  }

  private signedInWithoutHome(): void {
    this.notice.set(`Signed in. ${HOME_URL} is not available here.`);
  }
}
