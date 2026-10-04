import { Route } from '@angular/router';
import { AUTH_ROUTES } from '../features/auth/auth.routes';

/**
 * Exposed to the shell as `authApp/Routes` and reused by this app's own
 * standalone bootstrap, so the paths stay relative to wherever it is mounted
 * (`/auth/login` in the shell, `/login` on its own dev server).
 *
 * Every auth screen is a child of `AuthLayoutComponent`, so it renders inside
 * the layout's `<router-outlet>`.
 */
export const remoteRoutes: Route[] = [
  ...AUTH_ROUTES,
  {
    path: 'todos',
    title: 'Todos | Super Fitness',
    loadComponent: () =>
      import('../features/todos/ui/pages/todos-page.component').then(
        (m) => m.TodosPageComponent
      ),
  },
];
