import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

/** The URL segment every step of the flow lives under. */
export const PASSWORD_RESET_SEGMENT = 'forgot-password';

/**
 * Where the user is in the forgot-password flow, kept in memory only: a reload
 * or leaving the flow starts it over, and nothing touches storage.
 *
 * The backend tracks the verified code on the account, so the only thing
 * carried between steps is the email and whether its code was accepted.
 */
@Injectable({ providedIn: 'root' })
export class PasswordResetState {
  private readonly _email = signal<string | null>(null);
  private readonly _verified = signal(false);

  readonly email = this._email.asReadonly();
  readonly verified = this._verified.asReadonly();
  readonly codeSent = computed(() => this._email() !== null);
  readonly canReset = computed(() => this.codeSent() && this._verified());

  constructor() {
    // Leaving the flow (back to login, or anywhere else) cancels it.
    inject(Router)
      .events.pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        filter((event) => !event.urlAfterRedirects.includes(`/${PASSWORD_RESET_SEGMENT}`)),
        takeUntilDestroyed()
      )
      .subscribe(() => this.clear());
  }

  codeSentTo(email: string): void {
    this._email.set(email);
    this._verified.set(false);
  }

  markVerified(): void {
    this._verified.set(true);
  }

  clear(): void {
    this._email.set(null);
    this._verified.set(false);
  }
}
