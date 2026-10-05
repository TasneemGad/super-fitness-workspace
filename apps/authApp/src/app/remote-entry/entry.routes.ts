import { Route } from '@angular/router';
import { provideAuth } from '../features/auth/auth.providers';
import {
  codeSentGuard,
  codeVerifiedGuard,
} from '../features/auth/forgot-password/password-reset.guards';

/**
 * Exposed to the shell as `authApp/Routes` and reused by this app's own
 * standalone bootstrap, so the paths stay relative to wherever it is mounted
 * (`/auth/login` in the shell, `/login` on its own dev server).
 *
 * Every auth screen is a child of `AuthLayoutComponent`, so it renders inside
 * the layout's `<router-outlet>`.
 */
export const remoteRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import(
        '../features/auth/ui/components/auth-layout/auth-layout.component'
      ).then((m) => m.AuthLayoutComponent),
    providers: [provideAuth()],
    children: [
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
            title: 'Forgot Password | Super Fitness',
            loadComponent: () =>
              import(
                '../features/auth/forgot-password/forgot-password-page/forgot-password-page'
              ).then((m) => m.ForgotPasswordPage),
          },
          {
            path: 'otp',
            title: 'Verify Code | Super Fitness',
            canActivate: [codeSentGuard],
            loadComponent: () =>
              import(
                '../features/auth/forgot-password/verify-code-page/verify-code-page'
              ).then((m) => m.VerifyCodePage),
          },
          {
            path: 'reset-password',
            title: 'Reset Password | Super Fitness',
            canActivate: [codeVerifiedGuard],
            loadComponent: () =>
              import(
                '../features/auth/forgot-password/reset-password-page/reset-password-page'
              ).then((m) => m.ResetPasswordPage),
          },
        ],
      },
      {
        path: 'verify-reset-code',
        title: 'Verify Code | Super Fitness',
        loadComponent: () =>
          import(
            '../features/auth/ui/pages/verify-reset-code/verify-reset-code.page.component'
          ).then((m) => m.VerifyResetCodePageComponent),
      },
      {
        path: 'reset-password',
        title: 'Reset Password | Super Fitness',
        loadComponent: () =>
          import(
            '../features/auth/ui/pages/reset-password/reset-password.page.component'
          ).then((m) => m.ResetPasswordPageComponent),
      },
      {
        path: 'change-password',
        title: 'Change Password | Super Fitness',
        loadComponent: () =>
          import(
            '../features/auth/ui/pages/change-password/change-password.page.component'
          ).then((m) => m.ChangePasswordPageComponent),
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