import { isDevMode } from '@angular/core';
import { Route } from '@angular/router';
import {
  codeSentGuard,
  codeVerifiedGuard,
} from '../features/auth/forgot-password/password-reset.guards';

/**
 * Exposed to the shell as `authApp/Routes` and reused by this app's own
 * standalone bootstrap, so the paths stay relative to wherever it is mounted
 * (`/auth/login` in the shell, `/login` on its own dev server).
 */
export const remoteRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    title: 'Login | Super Fitness',
    loadComponent: () =>
      import('../features/auth/login/login-page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    title: 'Register | Super Fitness',
    loadComponent: () =>
      import('../features/auth/register/register-page').then(
        (m) => m.RegisterPage
      ),
  },
  {
    // The steps share in-memory state; each guard keeps a later step closed
    // until the earlier one has succeeded.
    path: 'forgot-password',
    children: [
      {
        path: '',
        title: 'Forget Password | Super Fitness',
        loadComponent: () =>
          import('../features/auth/forgot-password/forgot-password-page/forgot-password-page').then(
            (m) => m.ForgotPasswordPage
          ),
      },
      {
        path: 'otp',
        title: 'OTP Code | Super Fitness',
        // canActivate: [codeSentGuard],
        loadComponent: () =>
          import('../features/auth/forgot-password/verify-code-page/verify-code-page').then(
            (m) => m.VerifyCodePage
          ),
      },
      {
        path: 'reset-password',
        title: 'Create New Password | Super Fitness',
        canActivate: [codeVerifiedGuard],
        loadComponent: () =>
          import('../features/auth/forgot-password/reset-password-page/reset-password-page').then(
            (m) => m.ResetPasswordPage
          ),
      },
    ],
  },
  {
    path: 'todos',
    title: 'Todos | Super Fitness',
    loadComponent: () =>
      import('../features/todos/ui/pages/todos-page.component').then(
        (m) => m.TodosPageComponent
      ),
  },
];
if (isDevMode()) {
  remoteRoutes.push({
    path: 'layout-preview',
    loadComponent: () =>
      import('../features/auth/ui/components/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent,
      ),
  });
}