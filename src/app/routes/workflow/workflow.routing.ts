import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'approve', pathMatch: 'full' },
  {
    path: 'approve',
    loadChildren: () => import('./approve/approve.module').then(m => m.ApproveModule),
  },
  { path: 'model', loadChildren: () => import('./model/model.module').then(m => m.ModelModule) },
];

export const workflowRoutes = RouterModule.forChild(routes);
