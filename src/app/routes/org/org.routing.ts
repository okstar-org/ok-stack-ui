import { Routes, RouterModule } from '@angular/router';
import { DeptComponent } from './dept/dept.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dept',
  },
  { path: 'dept', component: DeptComponent },
  { path: 'staff', loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule) },
  { path: 'perm', loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'integration',
    loadChildren: () => import('./integration/integration.module').then(m => m.IntegrationModule),
  },
];

export const orgRoutes = RouterModule.forChild(routes);
