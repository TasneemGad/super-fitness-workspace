import { Route } from '@angular/router';
import { RemoteEntry } from './entry';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntry,
    children: [
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
