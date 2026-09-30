import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthSessionService } from './auth-session.service';
import { AUTH_ROUTES } from './auth.tokens';

export const guestGuard: CanActivateFn = () => {
  const session = inject(AuthSessionService);
  const router = inject(Router);
  const routes = inject(AUTH_ROUTES);

  return session.isAuthenticated()
    ? router.parseUrl(routes.authenticated)
    : true;
};
