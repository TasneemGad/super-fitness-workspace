import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRepository, AuthRequestError } from '@super-fitness/data-access-user';
import { PasswordResetState } from './password-reset.state';

const GENERIC_ERROR = 'Something went wrong. Please try again.';

/**
 * Wording for the statuses each reset call is known to answer with. Anything
 * not listed (network, 5xx, validation) keeps the repository's message.
 */
const NO_ACCOUNT = 'There is no account with this email address.';
const BAD_CODE = 'This code is invalid or has expired. Check your email or resend the code.';

/** Owns the request state for one page of the reset flow. Provided per component. */
@Injectable()
export class PasswordResetFacade {
  private readonly repository = inject(AuthRepository);
  private readonly state = inject(PasswordResetState);

  private readonly _submitting = signal(false);
  private readonly _errors = signal<string[]>([]);

  readonly submitting = this._submitting.asReadonly();
  readonly errors = this._errors.asReadonly();
  readonly email = this.state.email;

  /** Sends (or resends) the code. @returns whether the request was started. */
  sendCode(email: string, onSent: () => void): boolean {
    return this.run(
      () => this.repository.forgotPassword({ email }),
      { 404: NO_ACCOUNT },
      () => {
        this.state.codeSentTo(email);
        onSent();
      }
    );
  }

  verifyCode(resetCode: string, onVerified: () => void): boolean {
    return this.run(
      () => this.repository.verifyResetCode({ resetCode }),
      { 400: BAD_CODE, 404: BAD_CODE },
      () => {
        this.state.markVerified();
        onVerified();
      }
    );
  }

  resetPassword(newPassword: string, onReset: () => void): boolean {
    const email = this.state.email();
    if (!email || !this.state.canReset()) {
      this._errors.set(['Your reset session has expired. Please request a new code.']);
      return false;
    }

    return this.run(
      () => this.repository.resetPassword({ email, newPassword }),
      { 404: NO_ACCOUNT },
      () => {
        this.state.clear();
        onReset();
      }
    );
  }

  clearErrors(): void {
    this._errors.set([]);
  }

  /**
   * Takes a factory rather than an observable so nothing is built for a
   * submit that the in-flight guard turns away.
   */
  private run(
    request: () => Observable<unknown>,
    wording: Partial<Record<number, string>>,
    onSuccess: () => void
  ): boolean {
    if (this._submitting()) return false;

    this._submitting.set(true);
    this._errors.set([]);

    request().subscribe({
      next: () => {
        this._submitting.set(false);
        onSuccess();
      },
      error: (error: unknown) => {
        this._errors.set(this.toMessages(error, wording));
        this._submitting.set(false);
      },
    });

    return true;
  }

  private toMessages(error: unknown, wording: Partial<Record<number, string>>): string[] {
    if (!(error instanceof AuthRequestError)) return [GENERIC_ERROR];

    const known = wording[error.status];
    return known ? [known] : error.messages;
  }
}
