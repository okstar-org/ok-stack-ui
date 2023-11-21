import { UserComponent } from './user.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: UserComponent },
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then(m => m.DetailModule),
  },
];

export const customerRoutes = RouterModule.forChild(routes);
