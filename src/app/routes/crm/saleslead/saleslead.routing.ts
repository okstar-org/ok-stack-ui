import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { SalesleadComponent } from './saleslead.component';

const routes: Routes = [
  { path: '', component: SalesleadComponent },
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then(m => m.DetailModule),
  },
];

export const salesleadRoutes = RouterModule.forChild(routes);
