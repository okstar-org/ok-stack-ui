import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'basic', pathMatch: 'full' },
  { path: 'basic', loadChildren: () => import('./basic/basic.module').then(m => m.BasicModule) },
  { path: 'open', loadChildren: () => import('./open/open.module').then(m => m.OpenModule) },
];

export const sysRoutes = RouterModule.forChild(routes);
