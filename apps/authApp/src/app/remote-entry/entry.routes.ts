import { Route } from '@angular/router';
import { AUTH_ROUTES } from '../features/auth/auth.routes';

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