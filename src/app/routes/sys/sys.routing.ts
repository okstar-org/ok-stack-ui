import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'personal', pathMatch: 'full' },
  {
    path: 'personal',
    loadChildren: () => import('./personal/personal.module').then(m => m.BasicModule),
  },
  {
    path: 'integration',
    loadChildren: () => import('./integration/integration.module').then(m => m.IntegrationModule),
  },
  { path: 'open', loadChildren: () => import('./open/open.module').then(m => m.OpenModule) },
];

export const sysRoutes = RouterModule.forChild(routes);
