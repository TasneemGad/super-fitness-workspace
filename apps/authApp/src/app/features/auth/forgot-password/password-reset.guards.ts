import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, UrlTree } from '@angular/router';
import { PasswordResetState } from './password-reset.state';

/**
 * A step's sibling, resolved from the flow's own route so the redirect works
 * wherever the remote is mounted (`/auth/...` in the shell, `/` on its own).
 */
function stepUrl(route: ActivatedRouteSnapshot, step: string): UrlTree {
  const flowPath = (route.parent?.pathFromRoot ?? []).flatMap((r) =>
    r.url.map((segment) => segment.path)
  );
  return inject(Router).createUrlTree(['/', ...flowPath, ...(step ? [step] : [])]);
}

/** The code page needs an email the code was sent to. */
export const codeSentGuard: CanActivateFn = (route) =>
  inject(PasswordResetState).codeSent() || stepUrl(route, '');

/** The new-password page needs a verified code; it cannot be opened directly. */
export const codeVerifiedGuard: CanActivateFn = (route) => {
  const state = inject(PasswordResetState);
  if (state.canReset()) return true;
  return stepUrl(route, state.codeSent() ? 'otp' : '');
};
