import { Route } from '@angular/router';
import { MainLayout } from '../shared/components/main-layout/main-layout.component';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'about',
        loadChildren: () =>
          import('../features/about/about.routes').then(
            (module) => module.aboutRoutes,
          ),
      },
      {
        path: 'classes',
        loadChildren: () =>
          import('../features/classes/classes.routes').then(
            (module) => module.classesRoutes,
          ),
      },
      {
        path: '',
        loadChildren: () =>
          import('../features/home/home.routes').then(
            (module) => module.homeRoutes,
          ),
      },
    ],
  },
];
