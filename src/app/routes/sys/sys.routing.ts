import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'org', pathMatch: 'full' },
  { path: 'conn', loadChildren: () => import('./conn/conn.module').then(m => m.ConnModule) },
];

export const sysRoutes = RouterModule.forChild(routes);
