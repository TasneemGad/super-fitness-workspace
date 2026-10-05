import { isDevMode } from '@angular/core';
import { Route } from '@angular/router';
import {
  codeSentGuard,
  codeVerifiedGuard,
} from '../features/auth/forgot-password/password-reset.guards';

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
