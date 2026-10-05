import { Routes } from '@angular/router';

import { AuthLayoutComponent } from './ui/components/auth-layout/auth-layout.component';
import { ChangePasswordPageComponent } from './ui/pages/change-password/change-password.page.component';
import { ForgotPasswordPageComponent } from './ui/pages/forgot-password/forgot-password.page.component';
import { ResetPasswordPageComponent } from './ui/pages/reset-password/reset-password.page.component';
import { VerifyResetCodePageComponent } from './ui/pages/verify-reset-code/verify-reset-code.page.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./login/login-page').then((m) => m.LoginPage),
      },
      {
        /**
         * /auth/register  →  child router-outlet renders the step pages.
         * Navigating to /auth/register alone redirects to /auth/register/account.
         */
        path: 'register',
        children: [
          { path: '', redirectTo: 'account', pathMatch: 'full' },
          {
            path: 'account',
            loadComponent: () =>
              import(
                './register/pages/account/register-account.page'
              ).then((m) => m.RegisterAccountPage),
          },
          {
            path: 'gender',
            loadComponent: () =>
              import(
                './register/pages/gender/register-gender.page'
              ).then((m) => m.RegisterGenderPage),
          },
          {
            path: 'age',
            loadComponent: () =>
              import(
                './register/pages/age/register-age.page'
              ).then((m) => m.RegisterAgePage),
          },
          {
            path: 'weight',
            loadComponent: () =>
              import(
                './register/pages/weight/register-weight.page'
              ).then((m) => m.RegisterWeightPage),
          },
          {
            path: 'height',
            loadComponent: () =>
              import(
                './register/pages/height/register-height.page'
              ).then((m) => m.RegisterHeightPage),
          },

          {
            path: 'goal',
            loadComponent: () =>
              import(
                './register/pages/goal/register-goal.page'
              ).then((m) => m.RegisterGoalPage),
          },
        ],
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordPageComponent,
      },
      {
        path: 'verify-reset-code',
        component: VerifyResetCodePageComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordPageComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordPageComponent,
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];

export const authRoutes = AUTH_ROUTES;
