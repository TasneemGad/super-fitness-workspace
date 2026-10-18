import { Route } from '@angular/router';

export const classesRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/classes-page').then((module) => module.ClassesPage),
  },
];
