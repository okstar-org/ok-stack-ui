import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'task', pathMatch: 'full' },
  {
    path: 'task',
    loadChildren: () => import('./task/task.module').then(m => m.TaskModule),
  },
  {
    path: 'approve',
    loadChildren: () => import('./approve/approve.module').then(m => m.ApproveModule),
  },
  {
    path: 'model',
    loadChildren: () => import('./model/model.module').then(m => m.ModelModule),
  },
  {
    path: 'initiate',
    loadChildren: () => import('./initiate/initiate.module').then(m => m.InitiateModule),
  },
];

export const bpmRoutes = RouterModule.forChild(routes);
