import { Routes, RouterModule } from '@angular/router';
import { LeadComponent } from './lead.component';

const routes: Routes = [
  { path: '', component: LeadComponent },
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then(m => m.DetailModule),
  },
];

export const salesleadRoutes = RouterModule.forChild(routes);
