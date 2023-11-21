import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },

  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.CustomerModule),
  },
];

export const chatRoutes = RouterModule.forChild(routes);
