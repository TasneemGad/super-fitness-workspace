import { Route } from '@angular/router';
import { RemoteEntry } from './entry';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntry,
    children: [
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
